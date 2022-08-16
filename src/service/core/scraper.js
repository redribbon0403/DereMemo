import {writeFileAt, decodeUrl, replaceTextByDict, convertJumpUrl} from '../utils/utils'
import {getUrlFromSwf, replaceSwfByDict} from '../utils/swf-manage'
import EpisodeParser from '../parser/episode-parser'

const { promisify } = require('util')
const axios = require('axios')
const mime = require('mime')
const cheerio = require('cheerio')
const fs = require('fs')
const FormData = require('form-data')
const validUrl = require('valid-url')
const log = require('electron-log')

const readFileAsync = promisify(fs.readFile)

const AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Safari/537.36"
const URL_REGEX = /(?:(?:\"(?:http|https):.+?\")|(?:\'(?:http|https):.+?\')|(?:\((?:http|https):.+?)\))/g

export default class Scraper {
  constructor(staticPath = "") {
    this.files = []
    this.archivedGallary = []
    this.$axios = axios.create({
      timeout: 10000
    })
    this.staticPath = staticPath
    this.folderPath = ""
  }

  setFolderPath(path){
    this.folderPath = path+"/mobamas_pages"
  }

  getFolderPath(){
    return this.folderPath
  }

  updateHeader(cookies) {
    this.$axios.defaults.headers.common['User-Agent'] = AGENT

    let cookie_string = ""

    for(let i of cookies) {
      cookie_string+=`${i.name}=${i.value}; `
    }

    this.$axios.defaults.headers.common['Cookie'] = cookie_string
  }

  async archivePage({url, method = "get", data = null, name = "index", assetParser = null, onlyPage = false, notSave = false}) {
    log.info(`Start archiving page : ${url}`)

    let page = null

    try {
      let res = null
      if (method == "get") {
        res = await this.$axios.get(url)
      } else if (method == "post") {
        res = await this.$axios.post(url, data)
      }
      page = res.data
    } catch(err) {
      log.error("Error >>", err)
      return false
    }

    let path = this.mobamasPath(url)+`/${name}.html`

    if(!onlyPage){
      page = await this.parseText({text:page, textType : "html", assetParser : assetParser})
    }

    if(!notSave){
      await writeFileAt(this.folderPath, path, 'w', page)
    }

    return [page, path]
  }

  async archiveFile(url, assetParser = null) {
    if (!url || url.startsWith("data:")) {
      return false
    }

    try {
      const res = await this.$axios.get(url.replaceAll("\\/", "/"), { responseType: 'arraybuffer'})
      const ext = mime.getExtension(res.headers['content-type'])
      
      let content = null
      let result = {}

      if(ext == "html") {
        return false
      } else if (["js", "css"].includes(ext)) {
        let fullText = Buffer.from(res.data, 'base64').toString("utf8")

        if (assetParser){
          for (let i of assetParser.assetInclude) {
            if(url.includes(i)){
              content = await this.parseText({text: fullText, assetParser: assetParser})
              break
            }
          }
        }

        if(content == null){
          content = await this.parseText({text: fullText})
          // content = res.data
        }
      } else if (ext == "swf"){
        content = Buffer.from(res.data)

        let extraUrl = getUrlFromSwf(content)

        let voiceUrl = []
        let jumpUrl = ""

        for (let i of extraUrl){
          if (i.startsWith("http://resource.mobamas.net")) {
            voiceUrl.push(i)
          } else {
            jumpUrl = i
          }
        }

        let voicePromise = []

        for(let i of voiceUrl){
          voicePromise.push(this.archiveFile(i))
        }
        let replaceData = await Promise.all(voicePromise)
        replaceData.push({
          "from": jumpUrl,
          "to": convertJumpUrl(jumpUrl),
        })

        content = replaceSwfByDict({data: content, replaceData: replaceData})

        result.child = voiceUrl
      } else {
        content = Buffer.from(res.data, 'base64')
      }
      

      let targetPath = this.mobamasPath(url)
      
      let path = ""
      if (ext != "html"){
        if (["js", "css"].includes(ext)){
          path = await writeFileAt(this.folderPath, targetPath, 'w', content)
        } else {
          if (ext == "swf"){
            targetPath += "/flash.swf"
          }
          path = await writeFileAt(this.folderPath, targetPath, 'wb', content)
        }
      }

      result.from = url
      result.to = path
      result.ext = ext

      log.info(`download complete: ${url.replaceAll("\\/", "/")}`)
      return result

    } catch(err) {
      log.error(`[Error] fail to download: ${url.replaceAll("\\/", "/")}`)
      log.error(err)
      return false
    }
  }

  async archiveMypage() {
    const url = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http://mobamas.net/idolmaster/mypage?"

    let [page, path] = await this.archivePage({url: url, notSave:true})

    const gallaryContainerHtml = `
    <div class="area_banner_triplicate_wrap area-frame_common">
        <div class="area-frame_wrap">
            <div style="
                text-align: center;
                text-shadow: -1px -1px 0px #0090ff, 1px -1px 0px #0090ff, 1px 1px 0px #0090ff, -1px 1px 0px #0090ff, 1px 2px 3px rgb(0 144 255 / 60%);
                font-size: 16px;
                padding: 8px 0 13px 0;
                border-bottom: 1px solid #aac4d9;
            ">Gallary</div>
            <div id="link_section" style="
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 15px;
                padding: 20px;
                "></div>
            <div class="area-frame_bg_image"></div>
        </div>
    </div>
    `

    let $ = cheerio.load(page, { decodeEntities: false })

    $(".t-Cnt, .user_status_add, .area_management_information_wrap").each(function (){
      $(this).remove()
    }) 

    $(gallaryContainerHtml).insertBefore("#top > footer")

    for (let gallary of this.archivedGallary){
      let aElem = $("<a></a>")
      aElem.attr("href", gallary.url)

      let imgElem = $("<img></img>")
      imgElem.attr("style", "width: 100%; border-radius: 10px;")
      imgElem.attr("src", gallary.gallaryImg)

      aElem.append(imgElem)
      $("#link_section").append(aElem)
    }
 
    await writeFileAt(this.folderPath, path, 'w', $.html())

    try {
      const index = await readFileAsync(this.staticPath+"/assets/text/index.html")
      await writeFileAt(this.folderPath, "/index.html", 'w', index)
    } catch (error) {
      log.error("[Error] : index.html not found")
    }

    log.info("done")
  }

  async archiveGallary(gallaryId) {
    const gallaryUrl = "http://sp.pf.mbga.jp/12008305/?guid=ON&amp;url=http://mobamas.net/idolmaster/idol_gallery/idol_detail/"+gallaryId

    let [page, path] = await this.archivePage({url: gallaryUrl, notSave:true})

    let imageObjectMatch = page.match(/(?<=idol.images = )(.*)(?=\;)/)[0]

    if (imageObjectMatch) {
      let imageObject = JSON.parse(imageObjectMatch)

      if ("l" in imageObject && Array.isArray(imageObject.l)) {
        for (let image of imageObject.l.reverse()){
          if(image){
            this.archivedGallary.push({
              "gallaryImg": image,
              "url" : path
            })
            break
          }
        }
      }
    }

    let storyListMatch = page.match(/(?<=idol.idol_story_list = )(.*)(?=\;)/)[0]

    if (storyListMatch) {
      let storyList = JSON.parse(storyListMatch)

      for(let story of storyList){
        if ("flash_path" in story){
          for(let i in story.flash_path) {
            if(story.open_flag[i] == "1") {
              let url = story.flash_path[i].replaceAll("__hash_card_id__", gallaryId)

              let voiceEnable = story.voice_enable[i]

              let form = new FormData()
              if(voiceEnable == '1'){
                form.append("voice", 1)
              }
              

              let [episodePage, episodePath] = await this.archiveEpisode({url: url, voiceData: form})

              page = page.replaceAll(story.flash_path[i].replaceAll("/", "\\/"), episodePath)
            }
          }
        }
      }
    }

    let $ = cheerio.load(page, { decodeEntities: false })

    let backLink = $("div.backLink").eq(0)
    $(backLink).parent().attr("href", "/")
    $(backLink).text("TOP")

    try {
      const template = await readFileAsync(this.staticPath+"/assets/text/story_template.txt")
      $("script#story-template").text(template)
    } catch (error) {
      log.error("[Error] : Story template not found")
    }

    page = $.html()
    await writeFileAt(this.folderPath, path, 'w', page)
  }

  async archiveEpisode({url, voiceData}) {
    let [page, path] =  await this.archivePage({url:url, method:'post', data:voiceData, onlyPage: true, notSave:true})

    try {
      let fileName = page.match(/window.file_name = "(.+?)"/)[1]

      if (fileName[0] == "_"){
        fileName = fileName.slice(1)
      }

      let episodeParser = new EpisodeParser(/{src:"(.+?)", id:"(.+?)"}/g, "http://sp.pf-img-a.mbga.jp/12008305/?url=http://mobamas.net/idolmaster/", [fileName+".js"])
      episodeParser.setPayload(page)

      // [page, path] = await this.archivePage({url:url, method:'post', data:voiceData, assetParser:episodeParser})
      page = await this.parseText({text:page, textType : "html", assetParser : episodeParser})

      page = page.replaceAll("window.image_server + '?url=' + encodeURIComponent(window.base_url + _img_path)",
                          "'/idolmaster/' + _img_path")

      page = page.replaceAll("window.image_server + '?url=' + encodeURIComponent(window.base_url + window.dir_name + lib.properties.manifest[i].src)",
                          "'/idolmaster/' + window.dir_name + lib.properties.manifest[i].src")

      try {
        const jumpUrl = page.match(/window.im_cjs.jump_url *= *'(.+?)'/)[1]
        const newJumpUrl = convertJumpUrl(jumpUrl)

        page = page.replaceAll(jumpUrl, newJumpUrl)
      } catch (err) {}
    } catch(err) {
      page = await this.parseText({text:page, textType : "html"})
    }

    await writeFileAt(this.folderPath, path, 'w', page)

    return [page, path]
  }

  async parseText({text, textType="", assetParser = null}, onlyParsedData = false) {
    if (textType == "html") {
      let $ = cheerio.load(text, { decodeEntities: false })

      $("a").each(function() {
        $(this).attr("href", "#")
      })
      text = $.html()
    }

    let allPromise = []

    let urls = new Set([...text.matchAll(URL_REGEX)].map(x => x[0].slice(1, -1)))

    for(let url of urls) {
      if (validUrl.isUri(url.replaceAll("\\/", "/"))) {
        allPromise.push(this.archiveFile(url, assetParser=assetParser))
      }
    }

    if (assetParser) {
      let extras = new Set(assetParser.parseData(text))

      for(let extra of extras) {
        if (typeof(extra) == "string" && validUrl.isUri(extra.replaceAll("\\/", "/"))){
          allPromise.push(this.archiveFile(extra, assetParser = assetParser))
        }
      }
    }

    let resultData = await Promise.all(allPromise)
    
    let files = []
    for(let result of resultData){
      if (result != false) {
        files.push(result)
      }
    }

    this.files.push(...files)

    return replaceTextByDict({page:text, data:files})
  }

  mobamasPath(url) {
    let parsedUrl = null

    try {
      parsedUrl = new URL(decodeUrl(url.replaceAll("\\/", "/"))).searchParams.get("url")
      parsedUrl = new URL(parsedUrl).pathname
    } catch (err) {
      parsedUrl = new URL(decodeUrl(url.replaceAll("\\/", "/"))).pathname
    }

    return parsedUrl
  }
}
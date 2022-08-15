import BaseParser from "./base-parser";

export default class EpisodeParser extends BaseParser{
  constructor(regex="", prefix="", assetInclude=[]) {
    super(regex, prefix, assetInclude)
  }

  setPayload() {
    const data = arguments[0]

    const dirName = data.match(/window.dir_name *= *"(.+?)"/)[1]
    const fileName = data.match(/window.file_name = "(.+?)"/)[1] 

    let bgReplaceImages = {}
    for(let i of [...data.matchAll(/window.bg_replace_images\['(.+?)'\] *= *'(.+?)';/g)]){
      bgReplaceImages[i[1]] = i[2]
    }

    let opBgReplaceImages = {}
    for(let i of [...data.matchAll(/window.op_bg_replace_images\['(.+?)'\] *= *'(.+?)';/g)]){
      opBgReplaceImages[i[1]] = i[2]
    }

    let charaReplaceImages = {}
    for (let i = 1; i <= 20; i++) {
      for (let n = 1; n <= 13; n++) {
          charaReplaceImages[('c' + i + '_face' + n)] = 'image_sp/cjs/chara/no_face.png';
      }
    }
    for(let i of [...data.matchAll(/window.chara_replace_images\['(.+?)'\] *= *'(.+?)';/g)]){
      charaReplaceImages[i[1]] = i[2]
    }

    this.payload = {
      'dirName': dirName,
      'fileName': fileName,
      'bgReplaceImages' : bgReplaceImages,
      'opBgReplaceImages': opBgReplaceImages,
      'charaReplaceImages': charaReplaceImages
    }
  }

  convert() {
    const src = arguments[0][1]
    const id = arguments[0][2]

    const dirName = this.payload.dirName
    const fileName = this.payload.fileName
    const bgReplaceImages = this.payload.bgReplaceImages
    const opBgReplaceImages = this.payload.opBgReplaceImages
    const charaReplaceImages = this.payload.charaReplaceImages

    let _imgPath = dirName + src
    const _prefix = id.replace(fileName+'_', '')

    if (_prefix in bgReplaceImages){
      _imgPath = 'image_sp/event_flash/story/bg/bg' + bgReplaceImages[_prefix] + '_wide.jpg';
    }
    if (_prefix in opBgReplaceImages){
      _imgPath = 'image_sp/event_flash/story/bg/bg' + opBgReplaceImages[_prefix] + '.jpg';
    }
    if (_prefix in charaReplaceImages){
      _imgPath = charaReplaceImages[_prefix]
    }

    return this.prefix+_imgPath
  }
}

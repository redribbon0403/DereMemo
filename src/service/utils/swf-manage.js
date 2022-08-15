const fs = require('fs');
const he = require('he');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

function getUrlFromSwf(data) {
  let result = []
  let pos = 0

  while(true){
    let start = data.indexOf(Buffer.from("http://"), pos)
    let end = data.indexOf(Buffer.from(["0x00"]), start)

    if (start == -1 || end == -1){
      break
    }

    let str = data.subarray(start, end).toString("utf8")

    if(str.startsWith("http://sp.pf.mbga.jp") || str.startsWith("http://resource.mobamas.net")){
      result.push(str)
    }

    pos = end
  }

  return result
}

function replaceSwfByDict({data, replaceData, fromKey="from", toKey="to"}) {
  let entireDiff = 0

  // let hexString = data.toString("hex")

  for(let i of replaceData){
    let diff = i[toKey].length - i[fromKey].length

    let start = data.indexOf(Buffer.from(i[fromKey]))

    if(start != -1){
      let end = start+i[fromKey].length

      data = Buffer.concat([data.subarray(0, start), Buffer.from(i[toKey]), data.subarray(end, data.length)]) 
      let lenPos = data.slice(0, start).lastIndexOf(Buffer.from(["0x96"]))+1
      data[lenPos] = data[lenPos]+diff

      entireDiff+=diff
    }
  }

  let actionTagPos = data.indexOf(Buffer.from(["0x3f", "0x03"]))
  let actionTagByteLen = data.subarray(actionTagPos+2, actionTagPos+6).reverse().toString("hex")
  let actionTagLen = parseInt(actionTagByteLen, 16) + entireDiff
  let newActionTagByteLen = Buffer.from((actionTagLen).toString(16).padStart(8, '0'), "hex").reverse()

  data = Buffer.concat([data.subarray(0, actionTagPos+2), newActionTagByteLen, data.subarray(actionTagPos+6, data.length)])
  
  return data
}

export {
  getUrlFromSwf,
  replaceSwfByDict
}
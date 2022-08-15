export default class BaseParser {
  constructor(regex="", prefix="", assetInclude=[]) {
    this.regex = regex
    this.prefix = prefix
    this.assetInclude = assetInclude
    this.payload = {}
  }

  setPayload(data){}

  parseData(text) {
    return [...text.matchAll(this.regex)].map(x => this.convert(x))
  }

  convert(){
    if(typeof(arguments[0]) == "string"){
      return this.prefix+arguments[0]
    } else {
      return args
    }
  }
}
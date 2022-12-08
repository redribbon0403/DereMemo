const fs = require('fs');
const he = require('he');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

async function writeFileAt(prefix, path, mode, data) {
  let dir = prefix+path.split("/").slice(0, -1).join("/")

  createDir(dir)

  await writeFileAsync(prefix+path, data, 'utf8')

  return path
}

function createDir(dir){
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    });
  }
}

function decodeUrl(url) {
  return he.decode(decodeURIComponent(url));
}

function replaceTextByDict({page, data, fromKey="from", toKey="to"}){
  for(let i of data){
    page = page.replaceAll(i[fromKey], i[toKey])
  }

  return page
}

function convertJumpUrl(jump_url) {
  let newJumpUrl = decodeURIComponent(jump_url)
  newJumpUrl = newJumpUrl.replaceAll("http://sp.pf.mbga.jp/12008305/?guid=ON&amp;url=http://mobamas.net", "")
  newJumpUrl = newJumpUrl.replaceAll("https://sp.pf.mbga.jp/12008305/?guid=ON&amp;url=http://mobamas.net", "")
  newJumpUrl = newJumpUrl.split("/").slice(0, -1).join("/")

  return newJumpUrl
}

// function streamToString (stream) {
//   const chunks = [];
//   return new Promise((resolve, reject) => {
//     stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
//     stream.on('error', (err) => reject(err));
//     stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
//   })
// }

export {
  writeFileAt,
  decodeUrl,
  replaceTextByDict,
  convertJumpUrl
}
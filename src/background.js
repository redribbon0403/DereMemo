'use strict'

import path from "path";
import { app, protocol, BrowserWindow, ipcMain, session, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const log = require('electron-log')
const fs = require('fs')
const isDevelopment = process.env.NODE_ENV !== 'production'

import Scraper from './service/core/scraper.js'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
 
async function createWindow() { 
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {   
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,  
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    }
  }) 

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode 
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app') 
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  } 
}  

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  } 
})  

app.on('activate', () => { 
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})  

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    }) 
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
// import {getUrlFromSwf, replaceSwfByDict} from './service/utils/swf-manage'
// let file = readFileSync("./dist_page/idolmaster/idol_story/flash/2/1/1/idol_gallery--idol_detail--206c39965b1415db5738487ad83ffbbb--2/1/0/0/flash.swf")
// let result = getUrlFromSwf(file)
// let data = replaceSwfByDict({data: file, replaceData: result})
// writeFileSync("./dist_page/idolmaster/idol_story/flash/2/1/1/idol_gallery--idol_detail--206c39965b1415db5738487ad83ffbbb--2/1/0/0/flash-2.swf", data)
// console.log(result)

let scraper = new Scraper(__static)

ipcMain.on('login-done', (event, arg) => {
  session.fromPartition("login").cookies.get({}).then((cookies) => { 
    scraper.updateHeader(cookies)
    event.reply('apply-login-info', true)
  }).catch((error) => {
    log.error(error)
    event.reply('apply-login-info', false)
  })
})

async function archiveGallery(event, url){
  try {
    await scraper.archiveGallery(url)
    event.reply('archive-gallery-done', {
      'result': true,
      'url' : url
    })
  } catch(err){
    event.reply('archive-gallery-done', {
      'result': false,
      'url' : url
    })
  }
}

async function archiveMypage(event){
  try {
    await scraper.archiveMypage()
    event.reply('archive-mypage-done', {
      'result': true
    })
  } catch(err){
    event.reply('archive-mypage-done', {
      'result': false
    })
  }
}

ipcMain.on('request-archive', async (event, urlList) => {
  try {
    if (fs.existsSync(scraper.getFolderPath())) {
      fs.rmdirSync(scraper.getFolderPath(), {recursive: true})
    }
    let galleryPromise = []
    for(let url of urlList){
      galleryPromise.push(archiveGallery(event, url))
    }
    await Promise.all(galleryPromise)
    await archiveMypage(event)
  } catch (error) {log.error(error)}

  event.reply('archive-done', true)
})

ipcMain.on('open-folder-dialog', async (event) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((dirPath)=>{
    if(dirPath.canceled == false && dirPath.filePaths[0]){
      scraper.setFolderPath(dirPath.filePaths[0])
      event.reply('folder-path', dirPath.filePaths[0])
    }
  })
})

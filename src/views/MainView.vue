<template>
  <div class="w-full h-screen bg-slate-200">
    <div id="container" class="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] bg-white w-1/2 max-w-4xl rounded-md">
      <div id="header" class="p-10 border-b-2 border-b-gray-100">
        <p class="text-xl font-bold mb-1">DereMemo</p>
        <p class="text-sm text-gray-500">This program is for storing memories of the Idolmaster Cinderella Girls.</p>
      </div>
      <div id="gallary-form" class="p-10 border-b-2 border-b-gray-100">
        <p class="mb-1 font-bold text-sm text-gray-500">GALLARY LIST</p>
        <p class="mb-6 text-sm text-gray-500">Please enter the gallery id you want to archive.</p>
        <div v-for="(url, idx) in gallary" v-bind:key="idx" class="mb-3.5">
          <div class="relative w-full">
            <input :disabled="work" v-model="gallary[idx].url" type="text" class="block p-2 w-full z-20 text-sm bg-gray-50 rounded-md border border-gray-300 focus:bg-pink-50 focus:border-pink-600 focus:outline-none disabled:opacity-50" placeholder="Gallary Id" required>
            <button :disabled="work" @click="removeGallaryUrl(idx)" class="absolute top-0 right-0 p-2 px-3.5 text-sm font-medium text-white bg-pink-500 rounded-r-md border border-pink-500 hover:bg-pink-600 focus:outline-none disabled:opacity-50">
              <font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon>
            </button>
          </div>
          <div class="mt-2 pl-2 text-xs">
            <div v-if="gallary[idx].state=='work'"><font-awesome-icon class="mr-2" icon="fa-solid fa-circle-arrow-down" />Working</div>
            <div v-if="gallary[idx].state=='error'" class="text-red-600"><font-awesome-icon class="mr-2" icon="fa-solid fa-circle-exclamation" />Error</div>
            <div v-if="gallary[idx].state=='done'" class="text-green-600"><font-awesome-icon class="mr-2" icon="fa-solid fa-circle-check" />Done</div>
          </div>
        </div>
        <button :disabled="work" @click="addGallaryUrl" class="w-full p-2 px-3.5 text-sm font-medium text-pink-500 bg-white border border-pink-500 rounded-md hover:bg-pink-500 hover:text-white focus:outline-none disabled:opacity-50">
          <font-awesome-icon class="mr-2" icon="fa-solid fa-plus"/> ADD GALLARY ID
        </button>
      </div>
      <div id="gallary-form" class="p-10 border-b-2 border-b-gray-100">
        <p class="mb-1 font-bold text-sm text-gray-500">FOLDER TO SAVE</p>
        <p class="mb-6 text-sm text-gray-500">Please choose a folder to save the file.</p>
        <div>
          <div class="relative w-full">
            <input disabled type="value" v-model="folderPath" class="block p-2 w-full z-20 text-sm bg-gray-50 rounded-md border border-gray-300 focus:bg-pink-50 focus:border-pink-600 focus:outline-none disabled:opacity-50" placeholder="Choose Folder">
            <button :disabled="work" @click="showOpenDialog" class="absolute top-0 right-0 p-2 px-3.5 text-sm font-medium text-white bg-pink-500 rounded-r-md border border-pink-500 hover:bg-pink-600 focus:outline-none disabled:opacity-50">
              Choose Folder
            </button>
          </div>
        </div>
      </div>
      <div id="submit" class="p-10">
        <button :disabled="disableRequestButton" @click="requestArchive" type="remove" class="w-full p-2 px-3.5 text-sm font-medium text-white bg-pink-500 border border-pink-300 rounded-md hover:bg-pink-600 focus:outline-none disabled:opacity-50">
          <font-awesome-icon class="mr-2" icon="fa-solid fa-rocket" /> START ARCHIVING
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  components: {
  },
  data() {
    return {
      gallary: [],
      gallaryTemplate: {url: "", state: ""},
      work: false,
      folderPath: ""
    }
  },
  methods: {
    addGallaryUrl(){
      this.gallary.push(Object.assign({}, this.gallaryTemplate))
    },
    removeGallaryUrl(idx){
      if(this.gallary.length > 1) {
        this.gallary.splice(idx, 1)
      }
    },
    requestArchive () {
      this.work = true

      for(let i of this.gallary) {
        i.state = "work"
      }

      const urlList = this.gallary.map(x => x.url)

      window.ipcRenderer.send('request-archive', urlList)

      window.ipcRenderer.on('archive-gallary-done', ({result, url}) => {
        if(url){
          let gallary = this.gallary.find(x => x.url == url)
          if(result == true){
            gallary.state = "done"
          } else {
            gallary.state = "error"
          }
        }
      })

      window.ipcRenderer.on('archive-mypage-done', ({result, url}) => {
      })

      window.ipcRenderer.on('archive-done', (result) => {
        this.work = false
      })
    },
    showOpenDialog(){
      window.ipcRenderer.send('open-folder-dialog', true)

      window.ipcRenderer.on('folder-path', (path) => {
        this.folderPath = path
      })
    }
  },
  computed:{
    disableRequestButton(){
      let emptyGallary = this.gallary.find(x => x.url == "")

      return this.work || emptyGallary || this.folderPath == ""
    }
  },
  mounted(){
    this.addGallaryUrl()
  }
}
</script>

<style>
</style>

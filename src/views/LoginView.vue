<template>
  <div>
    <webview 
      id="webview" 
      src="https://connect.mobage.jp/login"
      useragent="Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Safari/537.36"
      partition="login"
      class="w-full h-screen">
    </webview>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted(){
    const webview = document.querySelector('webview')
    webview.addEventListener('did-finish-load', () => {
      let url = webview.getURL()

      const mypage = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http://mobamas.net/idolmaster/mypage?"

      if(!url.startsWith("https://connect.mobage.jp/login")){
        if(url.indexOf("sp.pf.mbga.jp/12008305") < 0 && url.indexOf("mobamas.net/idolmaster/mypage") < 0){
          webview.loadURL(mypage)
        } else {
          window.ipcRenderer.send('login-done', true)

          window.ipcRenderer.on('apply-login-info', (result) => {
            console.log(result)
            if(result == true){
              this.$store.commit("auth/login")
              this.$router.push("/")
            }
          })
        }
      }
    })
  }
}
</script>

<style>
</style>

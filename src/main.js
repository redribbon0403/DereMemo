import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from "./store"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faXmark, faRocket, faPlus, faCircleArrowDown, faCircleExclamation, faCircleCheck)

const app = createApp(App)

app.use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

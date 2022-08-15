import { createStore } from 'vuex';
import { auth } from './modules/Auth';

export default createStore({
    modules: {auth},
})
import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import {VueEasyJwt} from 'vue-easy-jwt'
import VueEasyJWT from 'vue-easy-jwt'

const jwt = new VueEasyJwt()
Vue.use(VueEasyJWT)

declare module 'vue/types/vue'{
  interface Vue {
    $jwt:VueEasyJwt
  }
}

declare module '@nuxt/types'{
  interface NuxtAppOptions{
    $jwt:VueEasyJwt
  }
  interface Context{
    $jwt:VueEasyJwt
  }
}

declare module 'vuex/types/index'{
  interface Store<S>{
    $jwt:VueEasyJwt
  }
}

  const jwtPlugin:Plugin = (context,inject) =>{
    inject('jwt',jwt)
  } 

  export default jwtPlugin

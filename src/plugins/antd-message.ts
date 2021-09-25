import Vue from 'vue'
import { message } from "ant-design-vue"
declare module 'vue/types/vue' {
  interface Vue {
    $message:typeof message
  }
}
Vue.prototype.$message = message
import { Vue, Component,Emit } from 'nuxt-property-decorator'

@Component({})
export default class WindowListener extends Vue {
  windowWidth = 0

  onResize(){
    this.windowWidth = window.innerWidth
  }

  mounted() {
   this.$nextTick(()=>{
     window.addEventListener('resize',this.onResize)
   })
  }

  beforeDestroy() {
  window.removeEventListener('resize',this.onResize) 
  }

}
import { Vue, Component,Emit } from 'nuxt-property-decorator'

@Component({})
export default class Modal extends Vue {
  detailVisible = false
  @Emit('shown')
  showDetail(){
    this.detailVisible=true
    
  }
  @Emit('hidden')
  hideDetail(){
    this.detailVisible = false
  }

}
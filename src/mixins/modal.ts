import { Vue, Component,Emit } from 'nuxt-property-decorator'

@Component({})
export default class Modal extends Vue {
  visible = false
  @Emit('open')
  showModal(){
    this.visible=true
    
  }
  @Emit('closed')
  handleCancel(){
    this.visible = false
  }

}
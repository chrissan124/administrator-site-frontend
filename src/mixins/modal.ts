import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class Crud<T> extends Vue {
  visible = false

  showModal(){
    this.visible=true
  }

  handleCancel(){
    this.visible = false
  }

}
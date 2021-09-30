import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class Crud<T> extends Vue {

  formState={}

  $refs!:{
    formRef:HTMLFormElement
  }
  rules =[]
  loadingSubmit = false 

  async handleSubmit(callback:Function){
    this.$refs.formRef.validate((valid:boolean)=>{
      if(valid){
        callback(this.formState)
      }
    })
  }


}
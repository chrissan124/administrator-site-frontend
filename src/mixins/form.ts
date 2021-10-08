import { Vue, Component,Prop,Watch } from 'nuxt-property-decorator'

@Component({})
export default class Form extends Vue {
  @Prop({required:true})
  callback!:Function
  @Prop({default:null})
  initialState!:Object|null
  @Prop({default:null})
  visible!:boolean|null
  formState={}
  $refs!:{
    formRef:HTMLFormElement
  }
  rules ={}
  loadingSubmit = false 

  created(){
    if(this.initialState){
      this.formState = this.initialState
    }
  }

  reset(){
    this.$refs.formRef.resetFields()
    this.formState = this.initialState ||{}
  }

  async handleSubmit(){
    this.$refs.formRef.validate((valid:boolean)=>{
      if(valid){
        this.callback(this.formState)
      }
    })
  }

  handleCancel(){
    this.$emit('cancel')
  }


}
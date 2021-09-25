import { Vue, Component } from 'nuxt-property-decorator'
/*function map(items:Array<Object>){
  return items
}*/
type Mapper<T> = {
  (items:Array<T>):Array<Object>
}

function map<T>(items:Array<T>){
  return items
}
@Component({

})
export default class Crud<T> extends Vue {
  path = ''
  loading = false
  items: Array<Object> = []
  async fetch(){
    await this.get()
  }
  async get(args:string='',path?:string,mapper:Mapper<T>=map){
    this.loading = true 
    const items:Array<T>  = await this.$axios.$get(path||this.path+args)
    this.loading = false
    this.items = mapper(items)
  }
}

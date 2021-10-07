import { Vue, Component } from 'nuxt-property-decorator'
import { parseError } from '../utils/error-parser'

type Mapper = {
  (items:Array<Object>):Array<Object>
}

type Pagination = {
  current:number,
  pageSize:number,
  total:number
}

type Sorter= {
  field:string,
  order:string
}

type GetParams = {
  query?: Object,
  path?:string,
  mapper?:Mapper
}

type Base = { [x: string]: any; statusFk: any; }

function map<T>(items:Array<T>){
  return items
}
@Component({

})
export default class Crud<T extends Base> extends Vue {
  path = ''
  getPath:null|string=null
  loading = false
  items: Array<Object> = []
  selected:null|Object = null
  pagination:Pagination = {
    current:0,
    pageSize:10,
    total:0
  }
  sort = ''
  selectedRowKeys : Array<String> = []
  rowKey:string = ''
  getParams = {}
  async fetch(){
    await this.get({query:{size:this.pagination.pageSize}})
  }
  
  rowSelection (){
    const {selectedRowKeys} = this
    return{
      selectedRowKeys,
      onSelect:this.onSelection,
      columnWidth:'10',
      hideDefaultSelections:true,
      type:'checkbox'
    }
  }

  onSelection(record:T,selected:boolean,selectedRows:Array<Object>){
    if(selected){
      let row = ''
      for(let [key,value] of Object.entries(record)){
        if(key===this.rowKey){
          row= value 
        }
      }
      this.selected = record
      this.selectedRowKeys = [row]
    }else {
      this.selectedRowKeys = []
      this.selected = null
    }
  }

  async get(params:GetParams={}){
    this.loading = true 
    this.items = []
    try {
      const response = await this.$axios.get(this.getPath||this.path,{params:{sort: this.sort, ...this.getParams, ...params.query}})
      const items:Array<T> = response.data
      const pagination = {...this.pagination}
      this.items = params.mapper? params.mapper(items):map(items)
      const count = response.headers['x-total-count']
      pagination.total = count ? parseInt(count): 0
      this.pagination = pagination
    } catch (error) {
      this.$message.error(this.items.length>0?`Couldn't update data`:`Couldn't load data`)
    }finally{
      this.loading = false

    }

  }

  async create(item:T,url?:string){
    const key = 'x'
    this.$message.loading({content:'Submitting...',key:key})
    try {

      const response = await this.$axios.post(url|| this.path,item)
      if (response.status===200){
        this.$message.success({content:'Item created',key:key})
        this.get()
      }else{
        const msg = response.data.error || `Couldn't submit item`
        this.$message.error({content:msg,key:key})
      }
    } catch (error) {
      this.$message.error({content:parseError(error),key:key,duration:3})
    }
  }

  async update(item:Object, url?:string){
    const key = 'x'
    this.$message.loading({content:'Updating...',key:key})
    try {
      await this.$axios.$put(url||`${this.path}/${this.selectedRowKeys[0]}`,item)
      await this.get()
      this.$message.success({content:'Item updated',key:key})
    } catch (error) {
      this.$message.error({content:parseError(error),key:key,duration:3})
    }
  }

  async updateStatus(statusName:string){
      if (this.selected) {
      const statuses = this.$store.getters['statusStore/status']
      await this.update({
        [this.rowKey]:this.selectedRowKeys[0],
        statusFk: statuses[statusName.toUpperCase()]
      })
    }
  }

  handleDelete(description?:string,hardDelete:boolean=false){
    this.$confirm(
      {
        title:'Delete Item?',
        onOk:()=>{ this.delete(hardDelete)},
        okType:'danger',
        centered:true,
        content:description||'Most items can be restored if desired, by going to the recycling bin.'
      }
    )
  }

  async delete(hardDelete=false){
    const key = 'x'
    this.$message.loading({content:'Deleting...',key:key})
    try {
      await this.$axios.delete(`${this.path}/${this.selectedRowKeys[0]}`)
      await this.get()
      this.$message.success({content:hardDelete?'Fully deleted':'Moved to deleted',key:key})
  
    } catch (error) {
      console.log(error)
      this.$message.error({content:parseError(error),key:key,duration:3})
    }
  }
  
  async revive(){
    const key = 'x'
    this.$message.loading({content:'Restoring...',key:key})
    try {
      await this.$axios.patch(`${this.path}/${this.selectedRowKeys[0]}`)
      await this.get()
      this.$emit('revive')
      this.$message.success({content:'Restored',key:key})
  
    } catch (error) {
      console.log(error)
      this.$message.error({content:parseError(error),key:key,duration:3})
    }
  }

  handleTableChange(pagination:Pagination,filters:Object,sorter:Sorter){
    const pager = {...this.pagination}
    pager.current = pagination.current
    this.pagination = pager
    this.get(
      {query:
        {
          size:this.pagination.pageSize,
          page:this.pagination.current-1,
          sort:this.handleSorter(sorter),
          ...filters
        }
      })
  }

  private handleSorter(sort:Sorter){
   if(sort.field){
       this.sort = `${sort.field.split('_short')[0]}:${sort.order ? sort.order.substr(0,1):'a'}`
       return this.sort
   }
  }

}

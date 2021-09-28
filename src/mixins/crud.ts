import { Vue, Component } from 'nuxt-property-decorator'
/*function map(items:Array<Object>){
  return items
}*/
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

function map<T>(items:Array<T>){
  return items
}
@Component({

})
export default class Crud<T> extends Vue {
  path = ''
  loading = false
  items: Array<Object> = []

  pagination:Pagination = {
    current:0,
    pageSize:10,
    total:0
  }

  async fetch(){
    await this.get({query:{size:this.pagination.pageSize}})
  }

  async get(params:GetParams={}){
    this.loading = true 
    try {
      const response = await this.$axios.get(params.path||this.path,{params:params.query})
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

  handleTableChange(pagination:Pagination,filters:Object,sorter:Sorter){
    console.log(sorter)
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
       return `${sort.field.split('_short')[0]}:${sort.order.substr(0,1)}`
   }
  }

}

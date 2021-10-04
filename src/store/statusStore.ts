import { Module,VuexModule,Action, Mutation } from "vuex-module-decorators"
import { $axios } from '../utils/api'

export interface StatusState {
  statuses:Object
}

@Module({namespaced:true, stateFactory:true})
export default class StatusStore extends VuexModule{
  statuses = {}

  @Mutation
  setStatus(status:Object){
    this.statuses = status
  }

  @Action({commit:'setStatus',rawError:true})
  async loadStatus(){
     try {
      const statusResponse:Array<Object> = await $axios.$get('/statuses')
      let statuses = {}
      statusResponse.forEach(status=>{
        for(let [key,value] of Object.entries(status)){
          statuses = {...statuses,[key]:value}
        }
      })
      return statuses
    } catch (error) {
      console.error('ACTION ERROR',error)
    }
  }

  get status(){
    return this.statuses
  }
}


import { Module,VuexModule,Action, Mutation } from "vuex-module-decorators"
import { $axios } from '../utils/api'

export interface PermissionState {
  name:string,
  action:string,
  permissionId:string
}

@Module({namespaced:true, stateFactory:true})
export default class StatusStore extends VuexModule{
  permissions:Array<PermissionState> = []
  names:Set<String> = new Set()
  @Mutation
  setPermission(state:{permissions:Array<PermissionState>,permNames:Set<String>}){
    this.permissions = state.permissions
    this.names= state.permNames
  }

  @Action({commit:'setPermission',rawError:true})
  async loadPermission(){
     try {
      const permissions:Array<PermissionState> = await $axios.$get('/perms',{params:{sort:'name'}})
      const permNames = new Set(
      permissions.map((perm) => {
        return perm.name
      })
  
    )
    
      return {permissions,permNames}
    } catch (error) {
      console.error('ACTION ERROR',error)
    }
  }

  get permission(){
    return this.permissions
  }
  get name(){
    return this.names
  }
}


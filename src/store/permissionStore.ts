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

  @Mutation
  setPermission(permissions:Array<PermissionState>){
    this.permissions = permissions
  }

  @Action({commit:'setPermission',rawError:true})
  async loadPermission(){
     try {
      const permissions:Array<PermissionState> = await $axios.$get('/perms')
      return permissions
    } catch (error) {
      console.error('ACTION ERROR',error)
    }
  }

  get permission(){
    return this.permissions
  }
}


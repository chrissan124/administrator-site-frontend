import {Store} from 'vuex'
import { Context } from '@nuxt/types'
import {StatusState} from './statusStore';
export * from "../utils/store-accessor";

export interface StoreState{
  statusStore:StatusState
}

export const state = () =>({

})

export const actions = {
  async nuxtServerInit(store:Store<any>,context:Context){
    await store.dispatch('statusStore/loadStatus')
    await store.dispatch('permissionStore/loadPermission')
  }
}
/*
const initializer = (store:Store<StoreState>) => initialiseStores(store)
//export const store = new Vuex.Store<StoreState>({})

export const plugins = [initializer]

*/
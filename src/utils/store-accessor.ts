import {Store} from 'vuex'
import { getModule } from 'vuex-module-decorators'
import StatusStore from '../store/statusStore'

let statusStore:StatusStore

function initialiseStores(store:Store<any>){
    statusStore = getModule(StatusStore,store)
}

export {initialiseStores,statusStore}
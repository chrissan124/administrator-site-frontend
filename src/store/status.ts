import {MutationTree} from 'vuex'
export const state = ()=>({
  statuses:{}
})

export type statusState = ReturnType<typeof state>

export const mutations:MutationTree<statusState> = {
  SET_STATUSES:(state,newStatuses:Object) =>(state.statuses=newStatuses)
}
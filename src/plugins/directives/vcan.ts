import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Permission } from '~/src/types/user'
export default function({app}:Context){
  Vue.directive('can',{
    bind(el,binding){
     const userPermissions:Permission[]|undefined = app.$auth.user?.permissions as Permission[]
    
     const privileges: string[] = binding.value
     const type = binding.arg ? binding.arg[0].toUpperCase():'R'
     let permissionGranted = privileges[0].toLowerCase()=='free'
     if(userPermissions&&!permissionGranted){
      userPermissions.forEach(userPermission=>{
        privileges.forEach(privilege=>{
          if(userPermission.name.toUpperCase() ==privilege.toUpperCase()&&
          userPermission.type.toUpperCase() == type){
            permissionGranted = true
          }else if(userPermission.name.toUpperCase()==privilege.toUpperCase()&&type=='R'){
            permissionGranted=true
          }
        });
      });
    }
    if(!permissionGranted){
      el.style.display='none'
    }
    }
  })
}

import { Middleware } from "@nuxt/types";
import { Permission } from "../types/user";

const protectedRoutes = {
  users:['user'],
  roles:['role'],
  clients:['client'],
  contracts:['contract','invoice'],
  templates:['fileTemplate'],
  hirings:['employee','hiring']
}

const roleMiddleware:Middleware = ({$auth,route,redirect})=>{
  const userPermissions:Array<Permission>|undefined = $auth.user?.permissions as Array<Permission>|undefined
  if(userPermissions){
    let access=true
    for(let [name,privileges] of Object.entries(protectedRoutes)){
      if(name==route.name){
        console.log('guarded route')
        access = false
        privileges.forEach(privilege=>{
        const granted =  userPermissions.find(userPermission=>{
           return userPermission.name.toUpperCase() == privilege.toUpperCase()
          } );
          if(granted){
            access = true 
          }
        });

      }
    }
    if(!access){
      redirect('/denied')
    }
  }
}

export default roleMiddleware
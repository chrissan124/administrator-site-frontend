export interface User{
  firstName:string,
  lastName:string,
  email:string,
  roleFk:string,
  statusFk:string,
  userId:string,
  Role:{
    name:string
  }
}

interface Permission{
  type:string,
  name:string,
  permissionId:string
}

export interface Role {
  name:string,
  deletable:boolean,
  description?:string,
  permissionFk:string,
  Permission:Array<Permission>
}
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

export interface Permission{
  type:'C'|'R'|'U'|'D',
  name:string,
  permissionId:string
}

export interface Role {
  name:string,
  roleId:string,
  deletable:boolean,
  description?:string,
  permissionFk:string,
  Permissions:Array<Permission>
}
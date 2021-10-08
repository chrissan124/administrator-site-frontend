import { Flatten } from ".";

export interface Address{
  addressId?:string,
  primaryLine:string,
  secondaryLine:string,
  city:string,
  state:string,
  country:string,
  zipCode:string
}

export interface Client{
  clientId?:string,
  name:string,
  legalIdentifier:string,
  email:string,
  phone:string,
  statusFk?:string,
  Address:Address
  Status?:{
    name:string
  },
  createdAt?:string,
  updatedAt?:string,

}

export type FlatClient = Flatten<Client>
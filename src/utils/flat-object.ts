import { Flatten, GenericObject } from "../types"

export const flattenObject = (obj:GenericObject):Flatten<GenericObject> => {
  const flattened:GenericObject = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })

  return flattened
}

export const deleteKeys = (obj:GenericObject,keys:string[])=>{
  keys.forEach(key=>{
    delete obj[key]
  })
  return obj
}
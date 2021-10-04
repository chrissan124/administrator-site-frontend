import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { DateTime } from "luxon";
export default function({$axios}:{$axios:NuxtAxiosInstance}){
  $axios.onResponse((response)=>{
    if(response.data){
      if(Array.isArray(response.data)){
        response.data = response.data.map(item=>{
          return humanizeDate(item)
        })
      }else if(typeof response.data==='object'){
        response.data = humanizeDate(response.data)
      }
    }
    return Promise.resolve(response)
  } )
}
/*provides humanized date in two formats, long (default) and short "key"+"_short"
*/
function humanizeDate(item:Object){
    try {
    for (let [key, value] of Object.entries(item)) {
      const date = DateTime.fromISO(value)
      if (date.isValid) {
       item = {...item,[key]:date.toLocaleString(DateTime.DATETIME_SHORT),[`${key}_short`]:date.toLocaleString()}
      }
    }
    return item
  } catch (error) {}
}
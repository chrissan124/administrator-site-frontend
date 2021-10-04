export function parseError(error:any):string{
 if(error.isAxiosError){
  switch(error.response.status){
    case 400:
      return error.response?.data.error||'Invalid data'
    case 401:
      return 'This resource is unauthorized'
    case 403:
      return 'Forbidden resource'
    case 500:
      return 'Unknown server error'
    default:
      return 'Unknown error'
  }
 }
 return 'Unknown error'
}
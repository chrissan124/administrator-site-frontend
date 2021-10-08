export function getStatusColor(status:string){
  status = status.toLocaleLowerCase()
  if(['active'].includes(status)){
    return 'green'
  }
  if(['sent','idle'].includes(status)){
    return 'blue'
  }

  return 'red'
}
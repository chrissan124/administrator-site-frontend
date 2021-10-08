import Vue from 'vue'

export default ()=>{
  Vue.filter('color',function(status:string){
    if (!status) return ''
    status = status.toString().toLocaleLowerCase()
    if(['active'].includes(status)){
      return 'green'
    }
    if(['sent','idle'].includes(status)){
      return 'blue'
    }

    return 'red'
  })
}
// 所有token的存取删封装  注意:token里只能存字符串
const TOKEN_KEY = 'heima'
// 存  值是一个对象,需要先转换为字符串 JSON.stringify()
export function setToken(value){
    // let strValue = JSON.stringify(value);
    window.localStorage.setItem(TOKEN_KEY,value)
}

// 取  取出来的是一个字符串,需要转成对象  JSON.parse()
export function getToken(){
  return window.localStorage.getItem(TOKEN_KEY)
}

// 删除
export function removeToken(){
   window.localStorage.removeItem(TOKEN_KEY)
}
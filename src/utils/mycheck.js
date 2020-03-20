// 自定义验证
// 手机号
export function checkphone (rule,value,callback){
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if(reg.test(value)==true){
    callback();
  }else{
    callback(new Error('手机格式不正确'));
  }
}
// 邮箱
export function checkemail(rule, value, callback) {
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确"));
    }
  }
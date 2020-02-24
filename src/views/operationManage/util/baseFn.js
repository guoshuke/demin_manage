// 数字验证
let checkNum = (val) => {
  return /^[0-9]*$/.test(val)
}
// 数字验证2
let checkNum2 = (val) => {
  return /^\d+(\.\d{0,2})?$/.test(val) // 只能输入数字或含两位小数
}
export {
  checkNum,
  checkNum2
}
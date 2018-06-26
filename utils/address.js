/**
 * 转换地址数据
 * */
function packAddress(arr) {
  var newAddr = []
  for (let i = 0; i < arr.length; i++) {
    // if (isreplace) {
    //   let phone = arr[i].phone
    //   arr[i].phone = phone.replace(phone.substring(3, 7), '****')
    // }
    newAddr[i] = arr[i].addressNameAndDoor
  }

  return newAddr
}
module.exports = {
  packAddress: packAddress,
}

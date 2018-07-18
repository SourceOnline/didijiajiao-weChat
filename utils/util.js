const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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

/**
 * 转换年级数据
 * */
function packGrades(grade) {
  var newGrade = []
  for (let i = 0; i < grade.length; i++) {
    newGrade[i] = grade[i].gradeName
  }
  console.log(newGrade)
  return newGrade
}

/**
 * 转换科目数据
 * */
function packSubject(sub) {
  var newSub = []
  for (let i = 0; i < sub.length; i++) {
    newSub[i] = sub[i].subName
  }
  console.log(newSub)
  return newSub
}

module.exports = {
  formatTime: formatTime,
  packAddress: packAddress,
  packGrades: packGrades,
  packSubject: packSubject
}
function findTeacher() {
  var data = 
    [{
      "userId": 142,
      "longitude": "114.38273",
      "latitude": "23.08383",
      "avatar": "/files/c4e1423e-21d8-4541-8d66-6c78a84572e0.jpg",
      "userName": "bb345",
      "price": "未定",
      "msg": "该用户很懒，没有留下什么信息"
    }, {
      "userId": 132,
      "longitude": "114.38696",
      "latitude": "23.07868",
      "avatar": "/files/6e42754d-1da6-403e-901b-ed4eba1cd690.jpg",
      "userName": "刘亦菲",
      "price": "未定",
      "msg": "该用户很懒，没有留下什么信息"
    }, {
      "userId": 138,
      "longitude": "114.3826522827",
      "latitude": "23.0782909393",
      "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg",
      "userName": "abc",
      "price": "未定",
      "msg": "该用户很懒，没有留下什么信息"
    }]
  return data;
}

function getUser(){
  var data = { "userId": 142, "name": "bb345", "phone": "15767976641", "sex": "女", "avatar": "/files/c4e1423e-21d8-4541-8d66-6c78a84572e0.jpg", "token": "2c8be223-7752-4f94-9671-86a4865c24a1", "teacher": true }
  return data;
}

function findStudent(){
  var data = [{ "orderId": 43, "subjectName": "语文", "price": "100元/小时，200元/天", "address": "惠州市惠城区政府 广东省惠州市惠城区新联路1", "grade": "1", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/c4e1423e-21d8-4541-8d66-6c78a84572e0.jpg" }, { "orderId": 41, "subjectName": "物理", "price": "100元/小时，200元/天", "address": "惠州市惠城区政府 广东省惠州市惠城区新联路1", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/c4e1423e-21d8-4541-8d66-6c78a84572e0.jpg" }, { "orderId": 40, "subjectName": "语文", "price": "100元/小时，200元/天", "address": "惠州市惠城区政府 广东省惠州市惠城区新联路1", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/c4e1423e-21d8-4541-8d66-6c78a84572e0.jpg" }, { "orderId": 39, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }, { "orderId": 38, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }, { "orderId": 37, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }, { "orderId": 36, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }, { "orderId": 35, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }, { "orderId": 34, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }, { "orderId": 33, "subjectName": "英语", "price": "100元/小时，200元/天", "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "grade": "2", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "distance": null, "avatar": "/files/53b0d6d9-d735-4ef3-a926-a495fde30527.jpg" }]
  return data;
}

function addressList(){
  var data = [{ "addressId": 8, "type": "工作地点", "longitude": "114.3826522827", "latitude": "23.0782909393", "addressNameAndDoor": "凤山别墅 24#4", "message": "广东省惠州市惠城区红花湖路29号", "nameAndhone": "abc 123****88", "ifDefault": true }, { "addressId": 6, "type": "工作地点", "longitude": "114.3827285767", "latitude": "23.0838298798", "addressNameAndDoor": "惠州市惠城区政府 E#35", "message": "广东省惠州市惠城区新联路1", "nameAndhone": "gg 123****98", "ifDefault": false }, { "addressId": 1, "type": "家庭地点", "longitude": "114.38099", "latitude": "23.0836", "addressNameAndDoor": "小新村 C#66", "message": "广东省惠州市惠城区龙丰街道小新村", "nameAndhone": "ge 157****6641", "ifDefault": false }]
return data;
}

function subjectList(){
  var data = [{ "subjectId": "41eb11a6-1d57-4b88-a2f0-6437fa19ec71", "subName": "语文", "code": "Language", "icon": "/templates/jxt/pc/images/subject/icon_yu.png" }, { "subjectId": "36bfd04a-83c9-46ed-9812-25bfb4055bf4", "subName": "数学", "code": "Math", "icon": "/templates/jxt/pc/images/subject/icon_shu.png" }, { "subjectId": "c7559d8d-234f-43ab-9e2a-83b6ee7a18af", "subName": "英语", "code": "English", "icon": "/templates/jxt/pc/images/subject/icon_ying.png" }, { "subjectId": "f5eb2a91-fef9-44af-bc74-fbf18dc40611", "subName": "物理", "code": "Physics", "icon": "/templates/jxt/pc/images/subject/icon_wu.png" }, { "subjectId": "a3ec1ee4-07b5-4c29-8d73-0b0ba21227d0", "subName": "化学", "code": "Chemistry", "icon": "/templates/jxt/pc/images/subject/icon_hua.png" }, { "subjectId": "25880ec7-6510-4f0e-9bdc-c9d0328a11a3", "subName": "历史", "code": "History", "icon": "/templates/jxt/pc/images/subject/icon_shi.png" }, { "subjectId": "6b3f42f2-0d64-4b03-85c6-8f4b45a307c3", "subName": "地理", "code": "Geography", "icon": "/templates/jxt/pc/images/subject/icon_di.png" }, { "subjectId": "61cdfddb-66b8-4ddf-91d9-48462198cccf", "subName": "生物", "code": "Biology", "icon": "/templates/jxt/pc/images/subject/icon_sheng.png" }, { "subjectId": "6865fa57-0f3a-4a28-8e41-7cf0af10e749", "subName": "政治", "code": "Politics", "icon": "/templates/jxt/pc/images/subject/icon_zheng.png" }]
return data;
}

function gradeList(){
  var data = [{ "gradeName": "一年级", "gradeNum": 1 }, { "gradeName": "二年级", "gradeNum": 2 }, { "gradeName": "三年级", "gradeNum": 3 }, { "gradeName": "四年级", "gradeNum": 4 }, { "gradeName": "五年级", "gradeNum": 5 }, { "gradeName": "六年级", "gradeNum": 6 }, { "gradeName": "初一", "gradeNum": 7 }, { "gradeName": "初二", "gradeNum": 8 }, { "gradeName": "初三", "gradeNum": 9 }, { "gradeName": "高一", "gradeNum": 10 }, { "gradeName": "高二", "gradeNum": 11 }, { "gradeName": "高三", "gradeNum": 12 }]
return data;
}

function stuSelect(){
   var data = {
     "order_list":[{"id":"1","name":"智能排序","code":"1","sort":1},{"id":"2","name":"口碑排序","code":"2","sort":2}],
     "grade_list":[{"id":"1","name":"一年级","code":"1","sort":1},{"id":"2","name":"二年级","code":"2","sort":2},{"id":"3","name":"三年级","code":"3","sort":3},{"id":"4","name":"四年级","code":"4","sort":4},{"id":"5","name":"五年级","code":"5","sort":5},{"id":"6","name":"六年级","code":"6","sort":6},{"id":"7","name":"初一","code":"7","sort":7},{"id":"8","name":"初二","code":"8","sort":8},{"id":"9","name":"初三","code":"9","sort":9},{"id":"10","name":"高一","code":"10","sort":10},{"id":"11","name":"高二","code":"11","sort":11},{"id":"12","name":"高三","code":"12","sort":12}],
     "subject_list":[{"id":"41eb11a6-1d57-4b88-a2f0-6437fa19ec71","name":"语文","code":"Language","sort":1},{"id":"36bfd04a-83c9-46ed-9812-25bfb4055bf4","name":"数学","code":"Math","sort":2},{"id":"c7559d8d-234f-43ab-9e2a-83b6ee7a18af","name":"英语","code":"English","sort":3},{"id":"f5eb2a91-fef9-44af-bc74-fbf18dc40611","name":"物理","code":"Physics","sort":4},{"id":"a3ec1ee4-07b5-4c29-8d73-0b0ba21227d0","name":"化学","code":"Chemistry","sort":5},{"id":"25880ec7-6510-4f0e-9bdc-c9d0328a11a3","name":"历史","code":"History","sort":6},{"id":"6b3f42f2-0d64-4b03-85c6-8f4b45a307c3","name":"地理","code":"Geography","sort":7},{"id":"61cdfddb-66b8-4ddf-91d9-48462198cccf","name":"生物","code":"Biology","sort":8},{"id":"6865fa57-0f3a-4a28-8e41-7cf0af10e749","name":"政治","code":"Politics","sort":9}]}
return data;
}

function myOrders(){
  var data = [{ "orderId": 39, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": 138, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "1", "status": 0, "addtime": "2018-07-09 16:08:19", "enable": 1 }, { "orderId": 38, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": 132, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "1", "status": 0, "addtime": "2018-07-09 16:08:14", "enable": 1 }, { "orderId": 37, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": null, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "0", "status": 0, "addtime": "2018-07-09 16:08:00", "enable": 1 }, { "orderId": 36, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": 132, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "1", "status": 0, "addtime": "2018-07-05 18:04:29", "enable": 1 }, { "orderId": 35, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": null, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "0", "status": 0, "addtime": "2018-07-04 16:05:21", "enable": 1 }, { "orderId": 34, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": 138, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "1", "status": 0, "addtime": "2018-07-04 16:05:02", "enable": 1 }, { "orderId": 33, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": 138, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "0", "status": 0, "addtime": "2018-07-04 15:53:16", "enable": 1 }, { "orderId": 26, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": null, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "0", "status": 0, "addtime": "2018-07-02 09:34:24", "enable": 1 }, { "orderId": 25, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": 138, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "0", "status": 0, "addtime": "2018-07-02 09:34:18", "enable": 1 }, { "orderId": 24, "subjectId": null, "subject": "英语", "learnUser": 138, "teacherUser": null, "grade": "2", "start": null, "end": null, "address": "凤山别墅 广东省惠州市惠城区红花湖路29号", "addressId": 8, "addressX": "114.3826522827", "addressY": "23.0782909393", "price": "100元/小时，200元/天", "learnTime": "每周六下午2点到4点，2周一次", "message": null, "evaluate": null, "type": "0", "status": 0, "addtime": "2018-06-26 15:14:06", "enable": 1 }]
return data;
}

function orderDetail(){
  var data = { "orderId": 43, "subjectName": "语文", "learnUser": 43, "learnUserName": "bb345", "learnUserPhone": "15767976641", "teacherUser": 142, "techerName": "bb345", "teacherPhone": "15767976641", "gradeName": "一年级", "datetime": "", "address": "惠州市惠城区政府 广东省惠州市惠城区新联路1", "addressX": "114.38273", "addressY": "23.08383", "price": "100元/小时，200元/天", "message": "", "evaluate": null, "learnTime": "每周六下午2点到4点，2周一次", "status": 0, "addtime": "2018-07-17 09:34:05" }
return data;
}

module.exports = {
  findTeacher: findTeacher,
  getUser: getUser,
  findStudent: findStudent,
  addressList: addressList,
  subjectList: subjectList,
  gradeList: gradeList,
  stuSelect: stuSelect,
  myOrders: myOrders,
  orderDetail: orderDetail,
}
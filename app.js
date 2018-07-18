//app.js
App({
  onLaunch: function() {
    var that = this
    var js_code = null;
    var user = wx.getStorageSync('user') || {}; //缓存用户信息，openid,expires_in
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("登陆")
        console.log(res)
        if (res.code && (!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))) {
          var d = that.globalData; //这里存储了appid、secret、token串  
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          // wx.request({
          //   url: ll,
          //   data: {},
          //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          //   // header: {}, // 设置请求的 header  
          //   success: function(res) {
          //     console.log("获取openid")
          //     console.log(res)
          //     var obj = {};
          //     obj.openid = res.data.openid;
          //     obj.expires_in = Date.now() + res.data.expires_in;

          //     that.globalData.openid = obj.openid;
          //     that.globalData.expires_in = obj.expires_in;
          //     // console.log(obj);
          //     //{"session_key":"Ar5t4MQykLiSlhoIeD8EnA==","openid":"o1UjW5Y6GSSmuA50_xdA8XnuqVLI"}
          //     wx.setStorageSync('user', obj); //存储openid  
          //   }
          // });
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("获取用户信息wechat")
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    //URL_PATH: 'http://localhost:8012',
    //token: 'fc6e0ed6-bb4d-41e4-9617-eb5c3fdbd4bf', //abc
    //585e130a-dd15-434b-b612-e85427160822   //cc
    appid: 'wx350739bf81dddd4a', //appid
    secret: '34a210bac956f633a132df829aca8185', //secret，应该怎么加密不泄露？？
    openid: 'o1UjW5Y6GSSmuA50_xdA8XnuqVLI',
    expires_in: null,
  },
  user: {
    token: null, //token
    userId: null, // 用户id
    name: null, // 用户真实姓名
    phone: null, // 手机号
    sex: null, //性别，男、女
    avatar: null, // 头像
    isTeacher: false // 是否是教师,boolean
  },
  //腾讯位置服务，微信小程序JavaScript SDK开发者密匙，链接：http://lbs.qq.com/qqmap_wx_jssdk/index.html
  QQMapWXKey: 'A75BZ-VXF6W-V7CRU-OP2CO-XZMZF-4GFEX',
  location: {
    longitude: 115.38273, //经度
    latitude: 24.08383, //维度
    name: '未知地点', //地点名称
    address: '未知位置' //详细地址
  },
  address_component: {
    city: null, //城市
    district: null, //地区
    nation: null, //国家
    province: null, //省份
    street: null, //街道
    street_number: null //街道和门号
  },
  static_data: true,//是否静态数据
  //api接口
  api: {
    BASE_PATH: 'http://192.168.1.110:8012', //服务器基本路径 192.168.1.110/localhost
    login: '/api/login', //登陆
    loginByOpenId: '/api/loginByOpenId', //根据openid登陆，返回用户信息user
    weRegister: '/api/weRegister', //微信注册信息，返回用户信息user
    user: { //用户相关
      getUser: '/api/user/getUser', //获取用户信息
      uploadImg: '/api/user/uploadImg', //上传图片
      updateUser:'/api/user/updateUser',//更新用户信息
    },
    order: { //订单相关
      findTeacher: '/api/order/findTeacher', //查询周边教员
      askForTeach: '/api/order/askForTeach', //发布家教任务
      orderDetail: '/api/order/orderDetail', //家教任务详情
      findStuSelect: '/api/order/findStuSelect', //查询附近家教资源选择器
      findStudent: '/api/order/findStudent', //查询附近家教资源
      acceptTask: '/api/order/acceptTask', //接取家教任务
      finishOrder: '/api/order/finishOrder', //完成订单
      cancleOrder: '/api/order/cancleOrder', //撤销订单
      myOrders: '/api/order/myOrders', //我的订单，家长
      myTasks: '/api/order/myTasks', //我的任务，教员
    },
    address: {
      a_delete: '/api/address/delete', //删除地址
      getList: '/api/address/getList', //获取地址列表
      setHome: '/api/address/setHome', //设置地址
      getDetail: '/api/address/getDetail', //获取地址详情
    },
    subject: {
      getSubects: '/api/subject/getSubects', //询科目列表
      getGrades: '/api/subject/getGrades', //查询年级列表
    },
    teacher: {
      teacherDetail: '/api/teacher/teacherDetail', //获取教师详情
      toTeacher: '/api/teacher/toTeacher', //成为教师
    },
  }
})
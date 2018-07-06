//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("登陆")
        console.log(res)
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
    URL_PATH: 'http://localhost:8012',
    token: 'fc6e0ed6-bb4d-41e4-9617-eb5c3fdbd4bf', //abc
    //585e130a-dd15-434b-b612-e85427160822   //cc
  },
  user: {
    userId:null,// 用户id
    name: null,// 用户真实姓名
    phone: null,// 手机号
    sex: null,//性别，男、女
    avatar: null,// 头像
    isTeacher: false// 是否是教师,boolean
  },
  //腾讯位置服务，微信小程序JavaScript SDK开发者密匙，链接：http://lbs.qq.com/qqmap_wx_jssdk/index.html
  QQMapWXKey: 'A75BZ-VXF6W-V7CRU-OP2CO-XZMZF-4GFEX',
  location: {
    longitude: 115.38273,//经度
    latitude: 24.08383,//维度
    name: '未知地点',//地点名称
    address: '未知位置'//详细地址
  },
  address_component: {
    city: null,//城市
    district: null,//地区
    nation: null,//国家
    province: null,//省份
    street: null,//街道
    street_number: null//街道和门号
  },
  //api接口
  api: {
    BASE_PATH: 'http://localhost:8012', //服务器基本路径
    login: '/api/login', //登陆
    user: { //用户相关
      getUser: '/api/user/getUser', //获取用户信息
      uploadImg: '/api/user/uploadImg', //上传图片
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
    }
  }
})
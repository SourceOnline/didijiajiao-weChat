//app.js
App({
  onLaunch: function () {
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
    user: null,
    URL_PATH: 'http://localhost:8012',
    token: 'fc6e0ed6-bb4d-41e4-9617-eb5c3fdbd4bf' //abc
    //585e130a-dd15-434b-b612-e85427160822   //cc
  },

  QQMapWXKey: 'A75BZ-VXF6W-V7CRU-OP2CO-XZMZF-4GFEX',
  location: {
    longitude: 115.38273,
    latitude: 24.08383,
    name: '未知地点',
    address: '未知位置'
  },
  address_component:{
    city: null,
    district: null,
    nation: null,
    province: null,
    street: null,
    street_number: null
  }
})
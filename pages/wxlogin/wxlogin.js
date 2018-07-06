// pages/wxlogin/wxlogin.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数-授权登陆
  bindViewTap: function () {
    this.getDiDiUserInfo()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // wx.navigateBack()
    this.getDiDiUserInfo()
  },
  //获取app用户信息并登陆转跳首页
  getDiDiUserInfo: function () {
    wx.request({
      url: app.api.BASE_PATH + app.api.user.getUser,
      data: {
        token: app.globalData.token
      },
      method: "GET",
      complete: function (res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function (res) {
        if (res.data.status == 1) {
          app.user = res.data.data.user
          console.log("获取用户信息app")
          console.log(app.user)

          wx.showToast({
            title: '欢迎您：' + res.data.data.user.name,
            icon: 'success',
            duration: 1000
          })

          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
        }
      }
    })
  }
})

// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: 'abc',
    pwd: '111111'
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.phone.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      var HOST = app.globalData.URL_PATH;
      var that = this;
      wx.request({
        url: HOST + '/api/login',
        data: {
          username: this.data.phone,
          password: this.data.pwd
        },
        method: "GET",
        complete: function (res) {
          console.log(res.data)
          if (res == null || res.data == null) {
            reject(new Error('网络请求失败'))
          }
        },
        success: function (res) {
          if (res.data.status == 1) {
            app.globalData.token = res.data.data.token
            that.getDiDiUserInfo();
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'error',
              duration: 2000
            })
          }
        }
      })
    }
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
          app.globalData.user = res.data.data.user
          console.log("获取用户信息app")
          console.log(app.globalData.user)

          wx.showToast({
            title: '欢迎您：' + res.data.data.user.name,
            icon: 'success',
            duration: 2000
          })

          setTimeout(function () {
            wx.navigateBack()
          }, 2000)
        }
      }
    })
  }
})
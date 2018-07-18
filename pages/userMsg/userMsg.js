// pages/userMsg/userMsg.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCreate: false, //是否是注册用户
    userName: null,
    phone: null,
    sex: "男",
    sexSelect: [{
      id: 1,
      name: '男',
      checked: 'true'
    }, {
      id: 2,
      name: '女',
    }],
  },

  // 获取输入用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  // 获取输入手机号码
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 性别选择切换器
  handleSexChange: function(e) {
    console.log(e)
    this.setData({
      sex: e.detail.value
    });
  },

  //保存
  bindSave: function(e) {
    if (this.data.isCreate) {
      console.log("创建用户")
      this.weRegister();
    } else {
      console.log("更新用户")
      this.updateUser()
    }
  },
  //注册用户
  weRegister: function() {
    //静态数据
    if (app.static_data) {
      app.user = fileData.getUser()
      wx.showToast({
        title: '欢迎您：' + app.user.name,
        icon: 'success',
        duration: 1000
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 3
        })
      }, 1000)
      return;
    }
    wx.request({
      url: app.api.BASE_PATH + app.api.weRegister,
      data: {
        openId: app.globalData.openid,
        username: this.data.userName,
        phone: this.data.phone,
        sex: this.data.sex,
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        if (res.data.status == 1) {
          app.user = res.data.data.user
          //app.globalData.token = res.data.data.user.tokenId
          console.log("注册获取用户信息app")
          console.log(app.user)

          wx.showToast({
            title: '欢迎您：' + res.data.data.user.name,
            icon: 'success',
            duration: 1000
          })

          setTimeout(function() {
            wx.navigateBack({
              delta: 3
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  //更新用户信息
  updateUser: function() {
    //静态数据
    if (app.static_data) {
      app.user = fileData.getUser()
      wx.showToast({
        title: '欢迎您：' + app.user.name,
        icon: 'success',
        duration: 1000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
      return;
    }
    var that = this;
    wx.request({
      url: app.api.BASE_PATH + app.api.user.updateUser,
      data: {
        token: app.user.token,
        username: that.data.userName,
        phone: that.data.phone,
        sex: that.data.sex,
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        if (res.data.status == 1) {
          console.log("更新用户信息")
          console.log(res)

          app.user.name = that.data.userName; // 用户真实姓名
          app.user.phone = that.data.phone; // 手机号
          app.user.sex = that.data.sex; //性别，男、女

          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1000
          })

          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userName: app.user.name,
      phone: app.user.phone,
      sex: app.user.sex,
    })
    //判断是否需要创建角色
    if (options.nouser && options.nouser == 1) {
      this.setData({
        isCreate: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

})
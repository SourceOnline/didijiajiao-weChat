// pages/book/book.js
//获取应用实例
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var addressUtil = require('../../utils/address.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    addressList: null,
    addrIndex: 0,
    userName: null,
    phone: null,
    subject: "英语",
    grade: "五年级",
    learnTime: "每周六下午2点到4点，2周一次",
    price: "100元/小时，200元/天"
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

  // 获取输入科目
  subjectInput: function(e) {
    this.setData({
      subject: e.detail.value
    })
  },

  // 获取输入年级
  gradeInput: function(e) {
    this.setData({
      grade: e.detail.value
    })
  },

  // 获取输入上课时间
  timeInput: function(e) {
    this.setData({
      learnTime: e.detail.value
    })
  },

  // 获取输入收费要求
  priceInput: function(e) {
    this.setData({
      price: e.detail.value
    })
  },

  // 地址选择
  bindAddrPickerChange: function(e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },

  //提交预约
  bindBook: function() {
    //发布家教任务
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/order/askForTeach',
      data: {
        teacherUser: that.data.userId,
        userName: that.data.userName,
        phone: that.data.phone,
        subject: that.data.subject,
        grade: that.data.grade,
        learnTime: that.data.learnTime,
        price: that.data.price,
        addressId: that.data.addressList[that.data.addrIndex].addressId,
        address: that.data.address[that.data.addrIndex],
        token: token
      },
      method: "GET",
      complete: function(res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: "预约成功",
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta : 3
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //处理数据-上传家位置
  setHome: function(location) {
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/address/setHome',
      data: {
        longitude: location.longitude,
        latitude: location.latitude,
        message: location.address,
        token: token
      },
      method: "GET",
      complete: function(res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
        that.onLoad()
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },

  //获取存储位置列表
  getAddressList: function() {
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/address/getList',
      data: {
        token: token
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        if (res.data.status == 1) {
          var addressData = res.data.data.address;
          var addressStr = addressUtil.packAddress(addressData);
          that.setData({
            addressList: addressData,
            address: addressStr
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    var that = this
    that.getAddressList()
    that.setData({
      userName: app.globalData.user.name,
      phone: app.globalData.user.mobile,
    })
    if (typeof (options.uid) != "undefined")  {
      that.setData({
        userId: options.uid
      })
    }
  },

})
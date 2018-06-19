// pages/address/address.js
//获取应用实例
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  bindAdd:function(){
    var that = this
    that.chooseLocation(null)
  },

  test:function(e){
    var id = e.currentTarget.dataset.aid;
    console.log(id)
  },

  //地图选择位置
  chooseLocation: function (e) {
    console.log("地图选择位置")
    console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res)
        // that.setData({
        //   hasLocation: true,
        //   location: {
        //     longitude: res.longitude,
        //     latitude: res.latitude,
        //     name: res.name,
        //     address: res.address
        //   }
        // })
        that.setHome(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //处理数据-上传家位置
  setHome: function (location){
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
      complete: function (res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function (res) {
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
  getList: function () {
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/address/getList',
      data: {
        token: token
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
          that.setData({
            addressList: res.data.data.address
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
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    var that = this
    that.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
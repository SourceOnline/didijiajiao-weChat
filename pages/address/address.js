// pages/address/address.js
//获取应用实例
var app = getApp()
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    addressid:0
  },
  //打开对话框
  handleOpen(e) {
    console.log(e)
    var that = this
    console.log(e.currentTarget.dataset.addressid)
    that.setData({
      visible: true,
      addressid: e.currentTarget.dataset.addressid
    });
  },
  //对话框取消
  handleClose(e) {
    console.log(e)
    var that = this
    console.log(e.currentTarget.dataset.addressid)
    that.setData({
      visible: false
    });
  },
  //对话框确定
  handleSure(e) {
    console.log(e)
    var that = this
    var addressid = e.currentTarget.dataset.addressid
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/address/delete',
      data: {
        token: token,
        addressId: addressid
      },
      method: "GET",
      complete: function (res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
        that.setData({
          visible: false
        });
      },
      success: function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            that.onShow()
          }, 2000)
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
  //添加地址
  bindAdd: function () {
    wx.navigateTo({
      url: '../addressAdd/addressAdd?addressid=0'
    })
  },

  //修改地址
  bindEdit: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../addressAdd/addressAdd?addressid=' + e.currentTarget.dataset.addressid
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
        console.log("位置列表")
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.getList()
  },

})
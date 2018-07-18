// pages/address/address.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    addressid: 0,
    startTime: 0,
    endTime: 0
  },
  bindTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function(e) {
    this.endTime = e.timeStamp;
  },
  //长按事件-删除-打开对话框
  bingLongTap: function(e) {
    console.log(e)
    var that = this
    console.log(e.currentTarget.dataset.addressid)
    that.setData({
      visible: true,
      addressid: e.currentTarget.dataset.addressid
    });

  },
  //点击事件，
  handleOpen(e) {
    if (this.endTime - this.startTime < 350) {
      console.log("点击" + e.currentTarget.dataset.addressid);
    }
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
    if(app.static_data){
      wx.showToast({
        title: "删除成功",
        icon: 'success',
        duration: 2000
      })
    }else{
      that.deleteAddress(addressid);
    }
  },
  //添加地址
  bindAdd: function() {
    wx.navigateTo({
      url: '../addressAdd/addressAdd?addressid=0'
    })
  },

  //修改地址
  bindEdit: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../addressAdd/addressAdd?addressid=' + e.currentTarget.dataset.addressid
    })
  },
  //删除地址
  deleteAddress: function(addressId) {
    var that = this;
    wx.request({
      url: app.api.BASE_PATH + app.api.address.a_delete,
      data: {
        token: app.user.token,
        addressId: addressId
      },
      method: "GET",
      complete: function(res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
        that.setData({
          visible: false
        });
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function() {
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

  //获取存储位置列表
  getList: function() {
    var that = this;
    if(app.static_data){
      that.setData({
        addressList: fileData.addressList()
      })
      return;
    }
    wx.request({
      url: app.api.BASE_PATH + app.api.address.getList,
      data: {
        token: app.user.token,
      },
      method: "GET",
      complete: function(res) {
        console.log("位置列表")
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
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
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.getList()
  },

})
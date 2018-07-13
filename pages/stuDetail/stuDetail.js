// pages/stuDetail/stuDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:null
  },

  //接单
  bindAccept:function(e){
    console.log(e)
    wx.request({
      url: app.api.BASE_PATH + app.api.order.acceptTask,
      data: {
        token: app.user.token,
        orderId: e.currentTarget.dataset.oid
      },
      method: "GET",
      complete: function (res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function () {
        console.log('error!!!!!!!!!!!!!!')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.api.BASE_PATH + app.api.order.orderDetail,
      data: {
        token: app.user.token,
        orderId:options.oid
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          order: res.data.data.order
        });
      },
      fail: function () {
        console.log('error!!!!!!!!!!!!!!')
      }
    })
  }

})
// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1: true
  },

  onChange(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })

  },

  bindAdd:function(){
    var that = this
    that.chooseLocation(null)
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
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
        app.location.longitude = res.longitude
        app.location.latitude = res.latitude
        that.getCity();
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
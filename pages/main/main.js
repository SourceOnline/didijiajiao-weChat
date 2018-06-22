//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //事件:转跳找老师
  bindFindTeacher: function () {
    wx.navigateTo({
      url: '../teachers/teachers'
    })
  },

  //事件:转跳找学生
  bindFindStudent: function () {
    wx.navigateTo({
      url: '../students/students'
    })
  },

  //事件:转跳发布家教任务
  bindAskForTeach: function () {
    wx.navigateTo({
      url: '../book/book'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../wxlogin/wxlogin'
      })
    }
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
// pages/teaDetail/teaDetail.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.teacherDetail(options.uid)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // book预约
  bookTap: function (e) {
    wx.navigateTo({
      url: '../book/book?uid=' + e.currentTarget.dataset.uid
    })
  },

  //获取周边教员
  teacherDetail: function (userId) {
    console.log("获取教师信息")
    var that = this;
    var HOST = app.globalData.URL_PATH;
    wx.request({
      url: HOST + '/api/teacher/teacherDetail',
      data: {
        userId: userId,
        token: app.globalData.token
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          teacherDeatil: res.data.data.teacher
        })
      }
    })

  }
})
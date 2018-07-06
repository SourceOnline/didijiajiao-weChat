// pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    tempFilePaths: []
  },

  upimg: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都
      success: function (res) {
        var data = {
          program_id: app.jtappid,
          token: app.globalData.token
        }
        var tempFilePaths = res.tempFilePaths  //图片
        wx.uploadFile({
          url: app.api.BASE_PATH + app.api.user.uploadImg, //
          header: {
            "Content-Type": "multipart/form-data"
          },  
          filePath: tempFilePaths[0],
          name: 'file', //文件对应的参数名字(key)
          formData: data,  //其它的表单信息
          success: function (res) {
            console.log(res)
            var data = res.data
            console.log(data)
            if (res.statusCode == 200 && res.errMsg == "uploadFile:ok"){
              wx.showToast({
                title: '上传成功！',
                icon: 'success',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '上传失败！',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },

  //事件转跳用户详情
  bindToUser:function(){
    wx.navigateTo({
      url: '../user/user',
    })
  },
  //事件转跳订单详情
  bindOrder: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  //事件转跳地址
  bindToAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //事件转跳任务
  bindTask: function () {
    wx.navigateTo({
      url: '../task/task',
    })
  },
  //事件test
  bindTest: function () {
    wx.navigateTo({
      url: '../atest/atest',
    })
  },
  //事件login
  bindLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  //事件login
  bindUserMsg: function () {
    wx.navigateTo({
      url: '../userMsg/userMsg',
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
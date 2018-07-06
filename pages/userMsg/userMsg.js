// pages/userMsg/userMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  // 获取输入用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  // 获取输入手机号码
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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

})
//index.js
//获取应用实例
var app = getApp()

Page({
  // 页面初始数据
  data: {
    teachers:null
  },

  onLoad: function () {
    var that = this
    that.setData({
      
    })
    that.findTeacher(null)

  },

  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?artype=' + e.currentTarget.dataset.artype
    })
  },
  
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curIndex

    if (this.data.navSectionItems[curid].length === 0) return

    var that = this
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
    })
  },
  // book预约
  bookTap: function (e) {
    wx.navigateTo({
      url: '../book/book?aid=' + e.currentTarget.dataset.aid
    })
  },

  //获取周边教员
  findTeacher: function(e){
    var that = this;
    var longitude = 123;//经度，浮点
    var latitude = 45;//维度，浮点
    if (longitude.length == 0 || latitude.length == 0) {
      wx.showToast({
        title: '未能定位到当前位置',
        icon: 'loading',
        duration: 2000
      })
    } else {
      var HOST = app.globalData.URL_PATH;
      console.log(HOST)
      wx.request({
        url: app.api.BASE_PATH + app.api.order.findTeacher,
        data: {
          token: app.user.token,
          longitude: longitude,
          latitude: latitude
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          that.setData({
            teachers:res.data.data.teachers
          })
        }
      })
    }
  }
})

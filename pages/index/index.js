//index.js
//获取应用实例
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    localCity: "定位中...",
    //默认未获取地址
    hasLocation: false,
    url_path: null
  },
  onLoad: function() {
    //检测用户登陆
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../wxlogin/wxlogin'
      })
    }
    this.setData({
      url_path: app.globalData.URL_PATH
    })
  },
  onShow: function() {
    var that = this
    if (that.data.localCity == "定位中...") {
      console.log("loca---------------")
      //获取当前经纬度
      that.getLocation()
    }

    //查询周边教师
    that.findTeacher();
  },
  //一键找老师
  bindJustFindTeacher: function() {
    wx.navigateTo({
      url: '../book/book'
    })
  },
  //根据当前经纬度设置当前位置信息
  getCity: function() {
    var that = this
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    // 调用接口，查询当前地理信息
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: app.location.latitude,
        longitude: app.location.longitude,
        get_poi: 0 //是否返回周边POI列表：1.返回；0不返回(默认)
      },
      success: function(res) {
        console.log("获取城市")
        console.log(res)
        var ac = res.result.address_component
        that.setData({
          localCity: ac.district + ac.street_number
        })
      }
    });
  },

  //获取经纬度
  getLocation: function(e) {
    var that = this
    wx.getLocation({
      //type：wgs84(是全球定位系统，获取的坐标，gcj02是国家测绘局给出的坐标)
      type: 'gcj02', // 默认wgs84
      success: function(res) {
        // success
        console.log("获取经纬度")
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
        // app.location.name = res.name
        // app.location.address = res.address
        that.getCity();
      }
    })
  },

  //地图选择位置
  chooseLocation: function(e) {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        console.log("地图选址")
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
        app.location.name = res.name
        app.location.address = res.address
        that.getCity();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 跳转至详情页
  navigateDetail: function(e) {
    wx.navigateTo({
      url: '../teaDetail/teaDetail?uid=' + e.currentTarget.dataset.uid
    })
  },

  // 加载更多
  loadMore: function(e) {
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
  bookTap: function(e) {
    wx.navigateTo({
      url: '../book/book?uid=' + e.currentTarget.dataset.uid
    })
  },

  //获取周边教员
  findTeacher: function() {
    var that = this;
    var lon = app.location.longitude; //经度，浮点
    var lat = app.location.latitude; //维度，浮点
    if (lon.length == 0 || lat.length == 0) {
      wx.showToast({
        title: '未能定位到当前位置',
        icon: 'loading',
        duration: 2000
      })
    } else {
      var HOST = app.globalData.URL_PATH;
      wx.request({
        url: app.api.BASE_PATH + app.api.order.findTeacher,
        data: {
          token: app.user.token,
          longitude: lon,
          latitude: lat
        },
        method: "GET",
        success: function(res) {
          if (null != res.data.data) {
            that.setData({
              teachers: res.data.data.teachers
            })
          }
        }
      })
    }
  }
})
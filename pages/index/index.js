//index.js
//获取应用实例
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    localCity:null,
    //默认未获取地址
    hasLocation: false,
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    //检测用户登陆
    // if (!app.globalData.userInfo) {
    //   wx.navigateTo({
    //     url: '../wxlogin/wxlogin'
    //   })
    // }
    var that = this;
    //获取当前经纬度
    that.getLocation()
    that.findTeacher(null)
  },
  onShow: function () {
    var that = this
    that.getCity();
  },
  //设置城市
  getCity:function(){
    var that = this
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    // 调用接口，查询当前地理信息
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: app.location.latitude,
        longitude: app.location.longitude
      },
      success: function (res) {
        console.log("获取城市")
        console.log(res)
        that.setData({
          localCity: res.result.address_component.city
        })
      },
      fail: function (res) {
        //console.log(res);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },

  //获取经纬度
  getLocation: function (e) {
    console.log(e)
    var that = this
    wx.getLocation({
      //type：wgs84(是全球定位系统，获取的坐标，gcj02是国家测绘局给出的坐标)
      type: 'wgs84',// 默认wgs84
      success: function (res) {
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
        that.getCity();
      }
    })
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
  findTeacher: function (e) {
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
        url: HOST + '/api/order/findTeacher',
        data: {
          longitude: longitude,
          latitude: latitude,
          token: app.globalData.token
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          that.setData({
            teachers: res.data.data.teachers
          })
        }
      })
    }
  }
})
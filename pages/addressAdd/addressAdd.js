// pages/addressAdd/addressAdd.js
//获取应用实例
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressid: 0,
    address_component:null,
    alocation:null,
    data_name:null,
    data_phone: null,
    data_addr_name: null,
    data_addr_detail: null,
    data_door:null
  },

  submitForm: function(e) {
    console.log('保存....')
    var that = this
    that.setData({
      data_name: e.detail.value.data_name,
      data_phone: e.detail.value.data_phone,
      data_door: e.detail.value.data_door
    })
    if (null == that.data.alocation){
      wx.showToast({
        title: "地址不为空",
        icon: 'none',
        duration: 2000
      })
    }else{
      that.setHome(that.data.address_component, that.data.alocation)
    }
  },
  //地图选择位置
  chooseLocation: function() {
    console.log("地图选择位置")
    var that = this
    wx.chooseLocation({
      success: function(res) {
        // success
        console.log(res)
        that.setData({
          alocation:res,
          data_addr_name: res.name,
          data_addr_detail: res.address,
        })
        that.getCity(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  //处理数据-上传家位置
  setHome: function(address_component, location) {
    console.log(address_component)
    console.log(location)
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/address/setHome',
      data: {
        addressId: that.data.addressid,
        userName: that.data.data_name,
        phone: that.data.data_phone,
        door: that.data.data_door,
        longitude: location.longitude,
        latitude: location.latitude,
        city: address_component.city,
        district: address_component.district,
        nation: address_component.nation,
        province: address_component.province,
        street: address_component.street,
        streetNumber: address_component.street_number,
        addressName: location.name,
        addressDetail: location.address,
        token: token
      },
      method: "GET",
      complete: function(res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
        wx.navigateBack({
          delta: 1
        })
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
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

  //根据坐标获取地址信息
  getCity: function(location) {
    var that = this
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    // 调用接口，查询当前地理信息
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        get_poi: 0 //是否返回周边POI列表：1.返回；0不返回(默认)
      },
      success: function(res) {
        console.log("获取城市")
        console.log(res)
        that.setData({
          address_component: res.result.address_component
        })
      }
    });
  },

  /**
   * 查询地址详情
   */
  getAddressDetail: function(addressid) {
    var HOST = app.globalData.URL_PATH;
    var token = app.globalData.token;
    var that = this;
    wx.request({
      url: HOST + '/api/address/getDetail',
      data: {
        addressId: addressid,
        token: token
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        if (res.data.status == 1) {
          console.log(res.data.data.address)
          that.setData({
            data_addressId: res.data.data.address.addressId,
            data_name: res.data.data.address.userName,
            data_phone: res.data.data.address.phone,
            data_addr_name: res.data.data.address.addressName,
            data_addr_detail: res.data.data.address.addressDetail,
            data_door: res.data.data.address.door
          })
          that.data.alocation.longitude = res.data.data.address.longitude
          that.data.alocation.latitude = res.data.data.address.latitude
          that.data.alocation.name = res.data.data.address.addressName
          that.data.alocation.address = res.data.data.address.addressDetail
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
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    var that = this

    that.setData({
      data_name: app.globalData.user.name,
      data_phone: app.globalData.user.mobile,
      data_addr_name: app.location.name,
      data_addr_detail: app.location.address,
      alocation:app.location
    })
    console.log(options.addressid)
    if (0 != options.addressid){
      console.log("查询地址详情")
      that.getAddressDetail(options.addressid)
      that.setData({
        addressid: options.addressid
      })
    }
    
  }
})
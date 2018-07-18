// pages/book/book.js
//获取应用实例
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var addressUtil = require('../../utils/address.js');
var util = require('../../utils/util.js');
var fileData = require('../../utils/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    addressList: null, //原地址列表
    address: [],
    addrIndex: 0, //地址列表选择
    subjectList: null, //原科目列表
    subject: [],
    subjectIndex: 0, //
    gradesList: null, //原年级列表
    grades: [],
    gradesIndex: 0, //
    userName: null,
    phone: null,
    subject: "英语",
    grade: "五年级",
    learnTime: "每周六下午2点到4点，2周一次",
    price: "100元/小时，200元/天"
  },

  // 获取输入用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  // 获取输入手机号码
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入科目
  subjectInput: function(e) {
    this.setData({
      subject: e.detail.value
    })
  },

  // 获取输入年级
  gradeInput: function(e) {
    this.setData({
      grade: e.detail.value
    })
  },

  // 获取输入上课时间
  timeInput: function(e) {
    this.setData({
      learnTime: e.detail.value
    })
  },

  // 获取输入收费要求
  priceInput: function(e) {
    this.setData({
      price: e.detail.value
    })
  },

  // 地址选择
  bindAddrPickerChange: function(e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },

  // 科目选择
  bindSubjectPickerChange: function(e) {
    console.log('sub picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subjectIndex: e.detail.value
    })
  },

  // 年级选择
  bindGradesPickerChange: function(e) {
    console.log('grades picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradesIndex: e.detail.value
    })
  },

  //提交预约
  bindBook: function() {
    //发布家教任务
    var that = this;
    if (app.static_data) {
      //静态数据
      wx.showToast({
        title: "预约成功",
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 3
        })
      }, 2000)
      return;
    }
    wx.request({
      url: app.api.BASE_PATH + app.api.order.askForTeach,
      data: {
        token: app.user.token,
        teacherUser: that.data.userId,
        userName: that.data.userName,
        phone: that.data.phone,
        subject: that.data.subjectList[that.data.subjectIndex].subName,
        subjectId: that.data.subjectList[that.data.subjectIndex].subjectId,
        grade: that.data.gradesList[that.data.gradesIndex].gradeNum,
        learnTime: that.data.learnTime,
        price: that.data.price,
        addressId: that.data.addressList[that.data.addrIndex].addressId,
        address: that.data.address[that.data.addrIndex]
      },
      method: "GET",
      complete: function(res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 3
            })
          }, 2000)

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //获取存储位置列表
  getAddressList: function() {
    var that = this;
    if(app.static_data){
      //静态数据
      var addressData = fileData.addressList()
      var addressStr = util.packAddress(addressData);
      that.setData({
        addressList: addressData,
        address: addressStr
      })
      return;
    }
    wx.request({
      url: app.api.BASE_PATH + app.api.address.getList,
      data: {
        token: app.user.token,
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        console.log("地址列表")
        console.log(res)
        if (res.data.status == 1) {
          var addressData = res.data.data.address;
          if (addressData.length == 0) {
            wx.showToast({
              title: '还没有设置地址，正在前往...',
              icon: 'loading',
              duration: 1000
            })
            setTimeout(function() {
              wx.redirectTo({
                url: '../address/address'
              })
            }, 1000)
          }
          var addressStr = util.packAddress(addressData);
          that.setData({
            addressList: addressData,
            address: addressStr
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

  //获取科目列表
  getSubjectsList: function() {
    var that = this;
    if (app.static_data) {
      //静态数据
      var subjectData = fileData.subjectList();
      var subjectStr = util.packSubject(subjectData);
      that.setData({
        subjectList: subjectData, //科目列表
        subject: subjectStr, //
      })
      return;
    }
    wx.request({
      url: app.api.BASE_PATH + app.api.subject.getSubects,
      data: {
        token: app.user.token,
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        console.log("科目列表")
        console.log(res)
        if (res.data.status == 1) {
          var subjectData = res.data.data.subjects;

          var subjectStr = util.packSubject(subjectData);
          that.setData({
            subjectList: subjectData, //科目列表
            subject: subjectStr, //
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

  //获取年级列表
  getGradesList: function() {
    var that = this;
    if (app.static_data) {
      //静态数据
      var gradesData = fileData.gradeList();
      var gradesStr = util.packGrades(gradesData);
      that.setData({
        gradesList: gradesData, //年级列表
        grades: gradesStr, //
      })
      return;
    }
    wx.request({
      url: app.api.BASE_PATH + app.api.subject.getGrades,
      data: {
        token: app.user.token,
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function(res) {
        console.log("年级列表")
        console.log(res)
        if (res.data.status == 1) {
          var gradesData = res.data.data.grades;

          var gradesStr = util.packGrades(gradesData);
          that.setData({
            gradesList: gradesData, //年级列表
            grades: gradesStr, //
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: app.QQMapWXKey // 必填
    });
    var that = this
    that.getAddressList() //地址列表
    that.getSubjectsList() //科目列表
    that.getGradesList() //年级列表
    that.setData({
      userName: app.user.name,
      phone: app.user.phone,
    })
    if (typeof(options.uid) != "undefined") {
      that.setData({
        userId: options.uid
      })
    }
  },
})
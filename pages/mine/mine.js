// pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {},
    user: {},
    tempFilePaths: [],
    url_path: null,
    startTime: 0,
    endTime: 0,
    imgvisible: false,
    imgactions: [{
      name: '从相册选择',
    },
    {
      name: '拍照'
    }
    ],
  },
  // //头像弹窗选择
  // imgHandleClickItem({
  //   detail
  // }) {
  //   console.log(detail)
  //   if (detail.index == 0) {
  //     that.upimg('album')
  //   } else if (detail.index == 1) {
  //     that.upimg('camera')
  //   }
  // },
  // //头像弹窗，取消
  // imgHandleCancel() {
  //   this.setData({
  //     imgvisible: false
  //   });
  // },
  //触摸开始
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  //触摸结束
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },

  //长按事件-更换头像
  bingLongTap: function (e) {
    console.log(e)
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      //itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.upimg('album')
          } else if (res.tapIndex == 1) {
            that.upimg('camera')
          }
        }
      }
    })
    // var that = this
    // this.setData({
    //   imgvisible: true
    // });
  },

  upimg: function (stype) {
    wx.chooseImage({
      count: 1, // 照片数量， 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [stype], // 可以指定来源是相册还是相机，默认二者都有：'album', 'camera'
      success: function (res) {
        console.log(res)
        var data = {
          program_id: app.jtappid,
          token: app.user.token
        }
        var tempFilePaths = res.tempFilePaths //图片
        wx.uploadFile({
          url: app.api.BASE_PATH + app.api.user.uploadImg, //
          header: {
            "Content-Type": "multipart/form-data"
          },
          filePath: tempFilePaths[0],
          name: 'file', //文件对应的参数名字(key)
          formData: data, //其它的表单信息
          success: function (res) {
            console.log(res)
            var data = res.data
            console.log(data)
            if (res.statusCode == 200 && res.errMsg == "uploadFile:ok") {
              wx.showToast({
                title: '上传成功！',
                icon: 'success',
                duration: 2000
              })
            } else {
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

  //头像点击事件，事件转跳用户详情
  bindToUser: function () {
    if (this.endTime - this.startTime < 350) {
      wx.navigateTo({
        url: '../user/user',
      })
    }
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

  //测试
  bindTest: function (e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.user) {
      this.setData({
        user: app.user,
        url_path: app.api.BASE_PATH,
      })
    }
  },

})
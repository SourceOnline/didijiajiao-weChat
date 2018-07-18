// pages/task/task.js
var app = getApp();
var selectValue = require('../../utils/myOrderSelect.js');
var fileData = require('../../utils/data.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: '5', //标签页默认值
    data: [], //数据
    page: 1, //当前页码
    visibleSelect: false, //弹窗菜单显示状态
    actionsSelect: [], //弹窗菜单选项数据
    oid: null, //长按选择的订单id
    startTime: 0, //触摸开始时间
    endTime: 0, //触摸结束时间
  },
  //触摸开始时间
  bindTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  //触摸结束时间
  bindTouchEnd: function(e) {
    this.endTime = e.timeStamp;
  },
  //列表长按事件
  bingLongTap: function(e) {
    console.log("列表长按" + e.currentTarget.dataset.oid)

    var selectData = selectValue.getSelectValue(this.data.current)
    if (selectData.length > 0) {
      // //打开弹窗菜单选择
      // this.setData({
      //   visibleSelect: true,
      //   actionsSelect: selectData,
      //   oid: e.currentTarget.dataset.oid
      // });
    }
  },
  //列表点击
  bingShortTap: function(e) {
    if (this.endTime - this.startTime < 350) {
      console.log("点击" + e.currentTarget.dataset.oid);
    }
  },
  //弹窗菜单点击事件
  handleClickSelect({
    detail
  }) {
    console.log("弹窗点击" + detail.index)
    var that = this;
    //8为删除
    if (detail.index != 8) {
      var url = "";
      //完成订单
      if (detail.index == 2) {
        url = app.api.order.finishOrder
      }
      //撤销订单
      if (detail.index == 3) {
        url = app.api.order.cancleOrder
      }

      wx.request({
        url: app.api.BASE_PATH + url,
        data: {
          token: app.user.token,
          orderId: that.data.oid
        },
        method: "GET",
        success: function(res) {
          console.log("弹窗事件结果")
          console.log(res)
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            setTimeout(function() {
              //初始化
              that.initData();
            }, 2000)
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function() {
          console.log('error!!!!!!!!!!!!!!')
        }
      })
    }
    //关闭弹窗菜单
    that.setData({
      visibleSelect: false
    });
  },
  //切换标签页
  handleChange({
    detail
  }) {
    console.log("切换标签")
    console.log(detail)
    this.setData({
      current: detail.key,
      page: 1,
      data: [], //数据
      disabled: false, //加载更多按钮状态
      page: 1, //当前页码
      hasMore: false, //加载更多按钮
      moreTxt: '点击加载更多',
      dataNull: true
    });
    this.getData(detail.key)
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    //初始化
    this.initData();
    setTimeout(function() {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }, 1500);
  },
  //初始化
  initData: function() {
    var that = this;
    //初始化
    that.setData({
      page: 1,
      data: [], //数据
      disabled: false, //加载更多按钮状态
      page: 1, //当前页码
      hasMore: false, //加载更多按钮
      moreTxt: '点击加载更多',
      dataNull: true
    });
    that.getData(that.data.current);
  },
  //展示静态数据
  staticData: function () {
    var that = this;
    that.setData({
      url_path: app.api.BASE_PATH,
      data: fileData.myOrders(),
      disabled: true,
      moreTxt: "已加载全部数据",
      hasMore: true,
      dataNull: true
    });
  },
  //加载数据
  getData: function(status) {
    if (app.static_data) {
      this.staticData();
      return;
    }
    var self = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: app.api.BASE_PATH + app.api.order.myTasks,
      data: {
        token: app.user.token,
        page: self.data.page,
        status: status
      },
      method: "GET",
      success: function(res) {
        console.log("加载数据")
        console.log(res)
        self.dataFormat(res);
      },
      fail: function() {
        console.log('error!!!!!!!!!!!!!!')
      }
    })
  },
  //数据处理
  dataFormat: function(d) {
    if (d.data.status == 1) {
      if (d.data.data.rows && d.data.data.rows.length > 0) {
        var datas = this.data.data.concat(d.data.data.rows),
          flag = d.data.data.rows.length < 10;
        if (datas.length == d.data.data.total) {
          flag = true
        }
        this.setData({
          url_path: app.api.BASE_PATH,
          data: datas,
          disabled: flag ? true : false,
          moreTxt: flag ? "已加载全部数据" : "点击加载更多",
          hasMore: true,
          dataNull: true
        });

      } else {
        this.setData({
          orders: null,
          hasMore: false,
          dataNull: false
        });
      }
    } else {
      console.log('接口异常！')
    }
    wx.hideToast();
  },
  //加载更多
  getMore: function() {
    var self = this;
    self.data.page++;
    self.getData(self.data.current);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //初始化
    this.initData();
  },
})
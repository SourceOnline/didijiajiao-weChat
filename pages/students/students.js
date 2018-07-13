// index/list.js  
var app = getApp();
Page({
  data: {
    data: [], //数据
    select_order: 0, //智能排序
    select_grade: 0, //年级
    select_subject: 0, //科目
    tabTxt: ['智能排序', '年级', '科目'], //tab文案
    tab: [true, true, true],
    disabled: false, //加载更多按钮状态
    page: 1, //当前页码
    hasMore: false, //加载更多按钮
    moreTxt: '点击加载更多',
    dataNull: true,

  },
  onReady: function() {

  },
  onShow:function(){
    //初始化数据
    var self = this;
    self.getFilter();
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    //初始化
    that.setData({
      page: 1,
      data: []
    });
    that.getData();
    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }, 1500);
  },
  //查看详情
  stuDetailTap: function(e) {
    wx.navigateTo({
      url: '../stuDetail/stuDetail?oid=' + e.currentTarget.dataset.oid
    })
  },
  //转跳详情
  navigateDetail: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.oid)
  },
  // 选项卡
  filterTab: function(e) {
    console.log("选项卡")
    console.log(e)
    var data = [true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
  // 获取筛选项
  getFilter: function() {
    var self = this;
    wx.request({
      url: app.api.BASE_PATH + app.api.order.findStuSelect,
      data: {
        token: app.user.token
      },
      method: "GET",
      success: function(res) {
        console.log(res)
        self.getData();
        self.setData({
          filterList: res.data.data.select
        });
      },
      fail: function() {
        console.log('error!!!!!!!!!!!!!!')
      }
    })
  },
  //筛选项点击操作
  filter: function(e) {
    var self = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt,
      tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          page: 1,
          data: [],
          tab: [true, true, true],
          tabTxt: tabTxt,
          select_order: id
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          page: 1,
          data: [],
          tab: [true, true, true],
          tabTxt: tabTxt,
          select_grade: id
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          page: 1,
          data: [],
          tab: [true, true, true],
          tabTxt: tabTxt,
          select_subject: id
        });
        break;
    }
    //数据筛选
    self.getData();
  },

  //加载数据
  getData: function(callback) {
    console.log("周边学生加载数据")
    //只有成为教师才能加载数据
    if (!app.user.teacher) {
        wx.navigateTo({
          url: '../toTeacher/toTeacher',
        })
      return;
    }
    var self = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: app.api.BASE_PATH + app.api.order.findStudent,
      data: {
        token: app.user.token,
        page: self.data.page,
        order: self.data.select_order,
        grade: self.data.select_grade,
        subjectId: self.data.select_subject,
        longitude: app.location.longitude,
        latitude: app.location.latitude
      },
      method: "GET",
      success: function(res) {
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
        console.log('has data')
        var datas = this.data.data.concat(d.data.data.rows),
          flag = d.data.data.rows.length < 10;
        if (datas.length == d.data.data.total){
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
    self.getData(function(d) {
      self.dataFormat(d)
    });
  },
});
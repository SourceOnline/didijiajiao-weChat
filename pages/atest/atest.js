var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hideHeader: false,
    hideBottom: false,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    data:[],
    allPages: '', // 总页数
    currentPage: 1, // 当前页数  默认是1
    loadMoreData: '加载更多……'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    })
    this.getData();
  },
  // 上拉加载更多
  loadMore: function () {
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已经到顶'
      })
      return;
    }
    setTimeout(function () {
      console.log('上拉加载更多');
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false
      })
      self.getData();
    }, 3000);
  },
  // 下拉刷新
  refresh: function (e) {
    var self = this;
    setTimeout(function () {
      console.log('下拉刷新');
      var date = new Date();
      self.setData({
        currentPage: 1,
        refreshTime: date.toLocaleTimeString(),
        hideHeader: false
      })
      self.getData();
    }, 3000);
  },
  // 获取数据  pageIndex：页码参数
  getData: function () {
    var self = this;
    var pageIndex = self.data.currentPage;
    wx.request({
      url: app.api.BASE_PATH + app.api.order.myOrders,
      data: {
        token: app.globalData.token,
        page: pageIndex,
        status: 0
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        var dataModel = res.data;
        //if (dataModel.data.status == 0) {
          console.log(dataModel.data.rows)
            if (pageIndex == 1) { // 下拉刷新
              self.setData({
                allPages: dataModel.data.total,
                contentlist: dataModel.data.rows,
                hideHeader: true
              })
            } else { // 加载更多
              console.log('加载更多');
              var tempArray = self.data.contentlist;
              tempArray = tempArray.concat(dataModel.data.rows);
              self.setData({
                allPages: dataModel.data.total,
                contentlist: tempArray,
                hideBottom: true
              })
            }

        //}
      },
      fail: function () {
      }
    })
  },

})
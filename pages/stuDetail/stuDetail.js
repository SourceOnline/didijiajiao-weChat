// pages/stuDetail/stuDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ["list0", "list1", "list2", "list3", "list4", "list5", "list11", "list12", "list13", "list14", "list15", "list25", "list26", "list27", "list28", "list29", "list30"],
    toView: ""
  },
  jumpTo: function (e) {

    // 获取标签元素上自定义的 data-opt 属性的值
    let target = e.currentTarget.dataset.opt;

    this.setData({
      toView: target
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
// pages/home/answer/answer.js
var util = require('../../../utils/util.js');
var ans_url = "https://lsq-dev.neoteched.com/v2/question_detail"
var ans_data;
var code = wx.getStorageSync("code");
console.log(code);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    answerTopBg: "../../../image/suzhi.jpg",
    returnHome: '返回首页',
    returnHomeImg: '../../../image/return_home.png',
    questionText: '司考史上，出题率最高的一道题快来试一试！',
    questionHearten: '一道题，一则知识，每天做一题每天进步多一点',
    pastIforNot: 0
  },
  /**
   * 事件处理函数
   */
  rHome: function () {
    wx.reLaunch({
      url: '../../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: ans_url,
      data: {
        // code: code
        day:'2017-12-04'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'X-Token': wx.getStorageSync("token")
      }, // 设置请求的 header
      success: res => {
        ans_data = res.data;
        console.log(ans_data);
      },
      fail: e => {
        console.log("err: " + e);
      }
    })





    var bDate = new Date();
    var year = bDate.getFullYear();
    var month = bDate.getMonth() + 1;
    var day = bDate.getDate();
    if (month < 10) {
      month = '0' + month;
    };
    if (day < 10) {
      day = '0' + day;
    };
    this.setData({
      year: year,
      month: month + ' ' + '月',
      day: day
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
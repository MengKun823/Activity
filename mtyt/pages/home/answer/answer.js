// pages/home/answer/answer.js
var util = require('../../../utils/util.js');
var ans_url = "https://lsq-dev.neoteched.com/v2/question_detail";
var ansData;
var arrDay;
var year,month,day
var code = wx.getStorageSync("code");
console.log(code);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ansData: {},
    returnHome: '返回首页',
    returnHomeImg: '../../../image/return_home.png',
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
    this.getdata();
  },

  //定义函数
  getdata: function(){
    var that = this;
    wx.request({
      url: ans_url,
      data: {
        // code: code
        day: '2017-12-04'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'X-Token': wx.getStorageSync("token")
      }, // 设置请求的 header
      success: res => {
        ansData = res.data.data;
        console.log(ansData);
        var days = ansData.show_day;
        arrDay = days.split("-");
        year = arrDay[0];
        month = arrDay[1];
        day = arrDay[2];

        that.setData({
          ansData: res.data.data,
          day: day,
          month: month,
          year: year,
          answerTopBg: ansData.picture_url,
          questionText: ansData.title,
          context: ansData.question_content.question.context,
          A: ansData.question_content.question.a,
          B: ansData.question_content.question.b,
          C: ansData.question_content.question.c,
          D: ansData.question_content.question.d,
          hasDone: ansData.has_done
        });
      },
      fail: e => {
        console.log("err: " + e);
      }
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
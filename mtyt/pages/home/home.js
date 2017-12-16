//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
var ans_url = "https://lsq-dev.neoteched.com/v2/question_detail"
Page({
  data: {
  },
  //事件处理函数
  bindAnswerTap: function() {
    wx.navigateTo({
      url: './answer/answer',
    }),
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
          console.log("success");
        },
        fail: e => {
          console.log("err: " + e);
        }
      })
  }, 
  bindMineTap: function () {
    wx.reLaunch({
      url: '../mine/mine',
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '../mine/mine',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad: function () {
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
      month: month+' '+'月',
      day: day,
      questionText: '司考史上，出题率最高的一道题快来试一试！',
      questionNum: 100+'人已答题',
      questionToAnswer: '去答题' + ' ' + '>',
      pastIforNot: 0,
      pastRecords: [{
        unique: 'unique_1',
        pastTopic: '想在考试中活的400分?先把这道题吃掉吧',
        pastDate: '2017年11月30日',
        pastImage: '../../image/suzhi.jpg',
        pastAnswerPeople: 198 + '人已答题',
        pastIforNot: 1
      },{
        unique: 'unique_2',
        pastTopic: '百分之百的真题，历年考试率百分之95',
        pastDate: '2017年11月29日',
        pastImage: '../../image/suzhi.jpg',
        pastAnswerPeople: 1112 + '人已答题',
        pastIforNot: 0
        },{
          unique: 'unique_3',
          pastTopic: '想在考试中活的400分?先把这道题吃掉吧',
          pastDate: '2017年11月30日',
          pastImage: '../../image/suzhi.jpg',
          pastAnswerPeople: 198 + '人已答题',
          pastIforNot: 1
      },{
        unique: 'unique_4',
        pastTopic: '想在考试中活的400分?先把这道题吃掉吧',
        pastDate: '2017年11月30日',
        pastImage: '../../image/suzhi.jpg',
        pastAnswerPeople: 198 + '人已答题',
        pastIforNot: 1
        },{
          unique: 'unique_5',
          pastTopic: '百分之百的真题，历年考试率百分之95',
          pastDate: '2017年11月29日',
          pastImage: '../../image/suzhi.jpg',
          pastAnswerPeople: 1112 + '人已答题',
          pastIforNot: 0
      },{
        unique: 'unique_6',
        pastTopic: '想在考试中活的400分?先把这道题吃掉吧',
        pastDate: '2017年11月30日',
        pastImage: '../../image/suzhi.jpg',
        pastAnswerPeople: 198 + '人已答题',
        pastIforNot: 1
      }]
    });
    // console.log(time);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

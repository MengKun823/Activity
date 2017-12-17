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
    optionsArr: [],
    optionState: {
      a: false,
      b: false,
      c: false,
      d: false
    },
    ansData: {},
    returnHome: '返回首页',
    returnHomeImg: '../../../image/return_home.png',
    questionHearten: '一道题，一则知识，每天做一题每天进步多一点',
    pastIforNot: 0,
    questionType:'1',
    questionTypeTit: '单选题',
    submiteBtnState: true
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
 
  //添加选项点击事件函数
  optionSelect: function (e) {
    let param = {}
    let questionType = this.data.questionType
    if (questionType == '1') {
      this.data.optionsArr = []
      param = {
        a: false,
        b: false,
        c: false,
        d: false
      }
      this.data.optionsArr.push(e.currentTarget.id)
      param[e.currentTarget.id] = true
      this.setData({
        submiteBtnState: false
      })
    } else if (questionType == '2') {
      param = this.data.optionState
      let flag = this.data.optionsArr.indexOf(e.currentTarget.id)
      if (flag == -1) {
        this.data.optionsArr.push(e.currentTarget.id)
        param[e.currentTarget.id] = true
      } else {
        this.data.optionsArr.splice(flag, 1)
        param[e.currentTarget.id] = false
      }
      if (this.data.optionsArr.length >= 2) {
        this.setData({
          submiteBtnState: false
        })
      } else {
        this.setData({
          submiteBtnState: true
        })
      }
    }
    this.setData({
      optionState: param
    })
    // 
    // console.log(this.data.optionsArr)
    // console.log(param)
    // console.log(this.data.optionState)
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
        ansData.question_content.type = 2
        let questionTypeTit = "单选题"
        if (ansData.question_content.type == 2) {
          questionTypeTit = '多选题'
        }

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
          hasDone: ansData.has_done,
          questionType: ansData.question_content.type,
          questionTypeTit: questionTypeTit
        });
        console.log(this.data)
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
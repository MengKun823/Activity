//app.js
var user
var code
var aldstat = require("./utils/ald-stat.js");
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    showMask:true,
    hostName:"https://tony-alpha.neoteched.com",
    tokenA: wx.getStorageSync("token")
  }
})
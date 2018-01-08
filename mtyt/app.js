//app.js
var user
var code
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
//app.js
var user
var code
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    showMask:true,
    tokenA: wx.getStorageSync("token")
  }
})



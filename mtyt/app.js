//app.js
var API_URL = "https://lsq-dev.neoteched.com/v2/check_login";
var user
var code
App({
  onLaunch: function () {
    // 登录
    // console.log("iv");
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        user = wx.getStorageSync("user");
        code = wx.getStorageSync("code");
        console.log(user);
        // console.log(code);
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              code = res.code;
              wx.setStorageSync("code", code);
              // console.log(wx.getStorageSync("token"));
              Login(code);
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})

function Login(code) {
  console.log('code=' + code);
  //创建一个dialog
  wx.showToast({
    title: '正在登录...',
    icon: 'loading',
    duration: 10000
  });
  //请求服务器
  wx.request({
    url: API_URL,
    data: {
      code: code
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      'X-Token': wx.getStorageSync("token")
    }, // 设置请求的 header
    success: res => {
      if (res.data.code == 0) {
        wx.setStorageSync("token", res.data.data.token);
        wx.getUserInfo({//getUserInfo流程
          success: res2 => {//获取userinfo成功
            // console.log(res2);
            var encryptedData = res2.encryptedData;
            var iv = res2.iv;
            //请求自己的服务器
            wx.request({
              url: API_URL,
              method: "POST",
              header: {
                'content-type': 'application/json',
                'X-Token': wx.getStorageSync("token")
              },
              data: {
                token: wx.getStorageSync("token"),
                iv: iv,
                encryptedData: encryptedData
              },
              success: res3 => {
                // userInfo = res3.data.data.user;
                // console.log(userInfo);
                // console.log(res3);
                wx.setStorageSync("user", res3.data.data);
              },
              fail: function () {
                // fail
                console.log(err)
              }
            })
          },
          fail: function () {
            // fail
            // wx.hideToast();
            // console.log(res2);
          },
        })
      }
      wx.hideToast();
      // console.log(res.data);

    },
    fail: function () {
      // fail
      // wx.hideToast();
    },
    complete: function () {
      // complete
    }
  })
}
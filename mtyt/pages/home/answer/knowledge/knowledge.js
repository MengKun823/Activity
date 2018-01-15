// pages/home/answer/knowledge/knowledge.js
const app = getApp();
var util = require('../../../../utils/util.js');
var Login = require('../../../../utils/login.js');
let knowledge_url = app.globalData.hostName + "/v2/knowledge_detail";
let imageArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  //定义图片动态宽高函数
  // imageLoad: function(e){
  //   //获取图片的原始宽度和高度
  //   let originalWidth = e.detail.width;
  //   let originalHeight = e.detail.height;
  //   let imageSize = util.imageZoomHeightUtil(originalWidth, originalHeight, 336);
  //   var image = this.data.images; 
  //   image[e.target.dataset.index] = {
  //     width: imageSize.imageWidth,
  //     height: imageSize.imageHeight
  //   }
  //   this.setData({
  //     images:image
  //   });  
  // },


  //点击预览图片
  btnPreview: function(e){
    let images = e.currentTarget.dataset.images;
    // console.log(e.currentTarget.dataset.images);
    wx.previewImage({
      current: images,
      urls:imageArr
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
    let that = this;
    Login.Login(knowledge_url,res => {
      let knowData = res.data.data;
      // console.log(knowData);
      imageArr.splice(0, imageArr.length);
      imageArr.push("https:" + knowData.system_image[0].url);
      let temp = knowData.documents;
      for (let i in temp){
        if (temp[i].type == "picture") {
          imageArr.push("https:" + temp[i].resource_info.url)
        }
        if (temp[i].context.indexOf("<br />")!=-1){
          //需要拆分
          let strs = new Array(); 
          strs = temp[i].context.split("<br />");
          temp[i].temp = strs;
        }else{
          //不需要拆分
          temp[i].temp = [temp[i].context];
          // if (temp[i].type == "picture"){
          //   imageArr.push("https:" + temp[i].resource_info.url)
          // }
        }
      }
      // console.log(that.data);
      that.setData({
        knowDataValue: temp,
        knowledge_name: knowData.knowledge_name,
        system_image: knowData.system_image[0].url,
        imageArr: imageArr
      })
    }, 'GET', {
        knowledge_id: 8243 //that.options.knowId
    },{
      'content-type': 'application/json',
      'X-Token': wx.getStorageSync("token")
    });
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
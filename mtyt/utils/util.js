const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//动态添加宽高

function imageZoomHeightUtil(originalWidth, originalHeight, imageWidth) {
  /*** 
   * 按照显示图片的宽等比例缩放得到显示图片的高 
   * @params originalWidth 原始图片的宽 
   * @params originalHeight 原始图片的高 
   * @params imageWidth   显示图片的宽，如果不传就使用屏幕的宽 
   * 返回图片的宽高对象 
  ***/
  let imageSize = {};
  if (imageWidth) {
    imageSize.imageWidth = imageWidth*2;
    imageSize.imageHeight = ((imageWidth * originalHeight) / originalWidth)*2;
  } else {//如果没有传imageWidth,使用屏幕的宽 
    wx.getSystemInfo({
      success: function (res) {
        imageWidth = res.windowWidth;
        imageSize.imageWidth = imageWidth * 2;
        imageSize.imageHeight = ((imageWidth * originalHeight) / originalWidth) * 2;
      }
    });
  }
  return imageSize;
}

function imageZoomWidthUtil(originalWidth, originalHeight, imageHeight) {
  /*** 
   * 按照显示图片的高等比例缩放得到显示图片的宽 
   * @params originalWidth 原始图片的宽 
   * @params originalHeight 原始图片的高 
   * @params imageHeight  显示图片的高，如果不传就使用屏幕的高 
   * 返回图片的宽高对象 
  ***/
  let imageSize = {};
  if (imageHeight) {
    imageSize.imageWidth = ((imageHeight * originalWidth) / originalHeight) * 2;
    imageSize.imageHeight = imageHeight * 2;
  } else {//如果没有传imageHeight,使用屏幕的高 
    wx.getSystemInfo({
      success: function (res) {
        imageHeight = res.windowHeight;
        imageSize.imageWidth = ((imageHeight * originalWidth) / originalHeight) * 2;
        imageSize.imageHeight = imageHeight * 2;
      }
    });
  }
  return imageSize;
}

module.exports = {
  formatTime: formatTime,
  imageZoomHeightUtil: imageZoomHeightUtil,
  imageZoomWidthUtil: imageZoomWidthUtil
}

const app = getApp();

Page({
  data: {
    files: []
  },
  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        that.setData({
          files: that.data.files.concat(result.tempFilePaths)
        })

        for (let i = 0; i < result.tempFilePaths.length; i++) {
          const filePath = result.tempFilePaths[i];
          let a = filePath.lastIndexOf('.');
          let b = filePath.lastIndexOf('.', filePath.length - 6);
          let c = filePath.substring(b + 1, a)
          const cloudPath = c + result.tempFilePaths[0].match(/\.[^.]+?$/);
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: result => {
              console.log('上传成功', result)
            }
          })
        }


      },
      fail: () => {},
      complete: () => {}
    })

  },
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.files
    })

  }
})
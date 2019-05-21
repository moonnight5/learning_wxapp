//app.js
import mock from "./utils/mock"
App({
  onLaunch: function () {
    Object.assign(this.globalData,mock)
  },
  globalData: {
    userInfo: null
  }
})
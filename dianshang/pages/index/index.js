const WXAPI = require('../../wxapi/main')

Page({
  data: {
    noticeList: [],               //通知列表
    goods: [],                    //商品列表
    categories: [],               //分类
    activeCategoryId: 0           //当前分类
  },
  onLoad() {
    this.getNotice();             //通知
    this.getBanners();            //请求Banner位
    this.loadGoods();             //商品
  },
  getNotice() {
    WXAPI.noticeList({
      pageSize: 5
    })
    .then(res => {
      console.log(res)
      this.setData({
        noticeList: res.data
      })
    })
  },
  getBanners() {
    WXAPI.banners({
      type: 'new'
    })
    .then(res => {
      console.log(res)
    })
  },
  loadGoods() {
    WXAPI.goods({
      recommendStatus: 1
    })
    .then(res => {
      console.log(res)
    })
  }
})
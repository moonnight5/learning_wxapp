//index.js
//获取应用实例
import util from '../../utils/index'
const app = getApp()
let page = 0

Page({
  data: {
    articleList: [], // 文章列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.requestArticle();
  },
  requestArticle(){
    page ++
    util.request({
      mock:true,
      url:'list',
      page,
      pageSize: 5
    }).then(res => {
      //正常的数据
      let articleList = res.data.data;
      articleList = this.formatArticle(articleList);
      // 本地缓存
      // 把标记过的属性按出来 拿到所有文章 判断一下
      // 加上 hasVisited 属性
      let oldArticleList = this.data.articleList
      let newArticleList = oldArticleList.concat(articleList)
      this.setData({
        articleList: newArticleList
      })
      console.log(articleList);
    }).catch(()=>{
      //错误
    })
  },
  formatArticle(articleList) {
    let visitedID = wx.getStorageSync('visitedID') || [];
    // 根据一份数据来返回一份数据 多用map
    articleList = articleList.map(group => {
      group.articles = group.articles.map(item => {
        if (visitedID.includes(item.contentId)) {
          item.hasVisited = true
        }
        return item
      })
      return group;
    })
    return articleList
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showDetail(e) {
    // 标记为已经阅读过
    // 取到详情页
    const id = e.currentTarget.dataset.id
    let visitedID = wx.getStorageSync('visitedID') || [];
    if(!visitedID.includes(id)) {
      visitedID.push(id)
    }
    console.log(visitedID)
    wx.setStorageSync('visitedID', visitedID);
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
      
      
  },
  getReachButton() {
    this.requestArticle()
  },
  onShow: function() {
    this.onLoad()
  }
})

// API封装模块，wx.request 也请封装一下，不要每次都去重复代码
// data:{}
// method get | post | put
// 通用的数据请求
// needSubDomain book.douban.com movie.douban.com
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://api.it120.cc'
const request = (url,needSubDomain,method,data) => {
  return new Promise((resolve,reject) => {
    const _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain:'') + url;
    console.log(_url)
    wx.request({
      url: _url,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        // success
        resolve(res.data);
      },
      fail: function(error) {
        // fail
        reject(error)
      },
      complete: function() {
        // complete
      }
    })
  })
}

module.exports = {
  noticeList: (data) => {
    return request('/notice/list',true,'post',data)
  },
  //商品列表
  // {page:1,category_id:1}
  goods: (data) => {
    // promise
    return request('/shop/goods/list',true,'post',data)
    // ----------------------------------------------------------------
    // return new Promise((resolve,reject) => {
    //   wx.request({
    //     url: 'https://URL',
    //     data: {},
    //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     // header: {}, // 设置请求的 header
    //     success: function(res){
    //       // success
    //       resolve(res.data)
    //     },
    //     fail: function() {
    //       // fail
    //     },
    //     complete: function() {
    //       // complete
    //     }
    //   })
    // })
  },
  // 后台添加的，一个页面，好长，应该是多个接口
  banners: (data) => {
    return request('/banner/list',true,'get',data)
  }
} 
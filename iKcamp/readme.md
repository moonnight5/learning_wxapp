## h5 vs 小程序
- 更好的体验
- 更强大的能力

## 设计一个项目
1. 配置
  1. 写死的常量
2. 多处公用的方法
  1. 防抖 util
3. 环境的区分
  1. 开发环境
    1. 错误提示 日志打印 更好的开发体验
  2. 测试环境
  3. 线上环境
4. css划分
  1. reset.css 重置
  2. base.css 公用的 css
5. 请求封装
  1. header:
  {
    content-type:
    x-abc
  }
  wx.request({content-type}) // a
  wx.request({content-type}) // b
  请求字段统一处理
  2. 请求结果统一处理

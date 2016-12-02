const Mock = require('mockjs')

Mock.mock('/power', {
    'exposureList|1-10': [{
        'id|+1': 1,
        'companyName': "锤子科技（北京）有限公司",
        'location': "北京市",
        "productName": "TD-LTE数字移动电话机",
        "brand": "锤子",
        "product_class1": "手机数码",
        "product_class2": "手机",
        "model": "YQ603 (电源适配器: CD601 输出：5.0VDC 1.5A)",
        "batch": "2016-02-26/U12605",
        "result": "不合格",
        "accreditationBody": "国家电话机质量监督检验中心"
    }],
    'newsList|10': [{
        'id|+1': 1,
        'title': "信用无价",
        "category": "食品",
        "platform": "信用轻工网",
        "publishTime": "2016-11-02 14:55:17",
        "createTime": "2016-11-02 14:55:17",
        "thumbnail": require('../assets/img/news_bannner.png'),
        "content": "<p>根据《国家发展改革委与信用服务机构合作开展行业信用体系建设暂行办法》（发改办财金[2016]852号），经公开函询、自愿报名、专家评审，拟确定中诚信征信有限公司为企业债券行业信用建设合作征信机构，现予公示。公示截止日期为6月2日。</p>\n\n<p>对合作征信机构名单有异议的，请书面提供相关材料。逾期不予受理。</p>\n\n<p>地址：北京市西城区月坛南街38号</p>\n\n<p>邮编：100824</p>\n\n<p>传真：68502318</p>\n\n<p style=\"text-align:right\">国家发展改革委财政金融司</p>\n\n<p style=\"text-align:right\">2016年5月27日</p>\n\n<p style=\"text-align:right\">(责任编辑：张印)</p>",
        "is": 0
    }]
})
const basePath = 'http://192.168.1.155:8080/regulator/'
export default {
  /******************* 质量热点 *********************/
  fetchNews(id){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/${id}`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻详情失败')
        })
    })
  },
  fetchNewsList(current, size){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/type`,
          data:{
            current: current,
            size: size,
            type: 0
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  fetchNewsListByKeyword(current, size, keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/key`,
          data:{
            current: current,
            size: size,
            keyword: keyword
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  fetchNewsListByType(current, size, type){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/type`,
          data:{
            current: current,
            size: size,
            type: type
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  fetchNewsListByCategory(current, size, category){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/category`,
          data:{
            current: current,
            size: size,
            category: category
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  searchNewsList(keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          url: '/power',
          dataType:'json'
        }).done(data => {
          resolve(data.newsList)
        }).fail(() => {
          reject('搜索质量热点失败')
        })
    })
  },
  /******************* 质量曝光 *********************/
  fetchExposure(id){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}exposure/get/${id}`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取质量曝光详情失败')
        })
    })
  },
  fetchExposureList(current, size){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}exposure/get/type`,
          data:{
            current: current,
            size: size,
            productClass1: 0,
            productClass2: 0
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取质量曝光列表失败')
        })
    })
  },
  fetchExposureListByKeyword(current, size, keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}exposure/get/key`,
          data:{
            current: current,
            size: size,
            keyword: keyword
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取质量曝光列表失败')
        })
    })
  },
  searchExposureList(keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          url: '/power',
          dataType:'json'
        }).done(data => {
          // resolve(data.exposureList)
          resolve([])
        }).fail(() => {
          reject('搜索异常')
        })
    })
  },
  /******************* 质量投诉 *********************/
  saveComplain(complain){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'POST',
          data: JSON.stringify(complain),
          headers : {'Content-Type': 'application/json;charset=utf-8'},
          url: `${basePath}complaints/save`,
        }).done(data => {
          if(data === '1'){
            resolve('提交成功')
          }else{
            resolve('提交失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
}

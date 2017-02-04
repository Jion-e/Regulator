import { HOST } from './config'

const basePath = `${HOST}`

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

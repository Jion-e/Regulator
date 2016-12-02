//质量热点类
export class newsInit{
  constructor(){
    this.id = 0                           //编号
    this.title = ""                       //标题
    this.type = ""                        //分类
    this.platform = ""                    //发布平台
    this.publishTime = ""                 //发布时间
    this.createTime = ""                  //生成时间
    this.thumbnail = ""                   //缩略图
    this.content = ""                     //内容
    this.category = ""                    //流行程度分类
    this.is = 0                           //是否删除
  }
}

//质量曝光类
export class exposureInit{
  constructor(){
    this.id = 0                           //编号
    this.companyName = ""                 //企业名称
    this.location = ""                    //企业名称
    this.productName = ""                 //产品名称
    this.brand = ""                       //商标
    this.product_class1 = ""              //所属行业编号
    this.product_class1_name = ""         //所属行业名
    this.product_class2 = ""              //细分行业编号
    this.product_class2_name = ""         //细分行业名
    this.model = ""                       //规格型号
    this.batch = ""                       //生产日期/批号
    this.result = ""                      //抽查结果
    this.reason = ""                      //不合格项目
    this.accreditationBody = ""           //承建机构
    this.createTIme = ""                  //生产时间
    this.is = 0                           //是否删除
  }
}

//质量投诉类
export class complainInit{
  constructor(){
    this.id = 0                           //编号
    this.title = ""                       //投诉标题
    this.category = ""                    //隶属栏目编号
    this.category_name = ""               //隶属栏目名
    this.name = ""                        //姓名
    this.sex = ""                         //性别
    this.phone = ""                       //联系电话
    this.idcard = ""                      //身份证
    this.email = ""                       //电子邮箱
    this.address = ""                     //地区
    this.type = ""                        //投诉类型
    this.evidenceImg = ""                 //相关证据
    this.productBrand = ""                //产品品牌
    this.productDetail = ""               //产品型号
    this.payPrice = ""                    //购买价格
    this.payTime = ""                     //购买时间
    this.company = ""                     //生产厂家
    this.companyPhone = ""                //厂家电话
    this.request = ""                     //投诉内容
    this.expect = ""                      //期望结果
    this.response = ""                    //投诉回复
    this.createTime = ""                  //生成时间
    this.is = 0                           //是否删除
  }
}
//分页类
export class PageInit{
  constructor(){
    this.current = 1,
    this.size = 10,
    this.total = 0
  }
}

//新闻发布平台
export const platforms = [
  {'id': 0, 'name': '全部' },
  {'id': 1, 'name': '信用轻工' },
  {'id': 2, 'name': '轻工追溯' },
  {'id': 3, 'name': '星数追溯' },
]

//新闻类型
export const newsType = [
  {'id': 0, "name": '全部'},
  {'id': 1, "name": '食品'},
  {'id': 2, "name": '文玩'},
  {'id': 3, "name": '服饰'},
  {'id': 4, "name": '日用品'},
  {'id': 5, "name": '小商品'}
]

//新闻tab标签切换内容
export const newsTabs = [
  {'id': 0, "name": '推荐'},
  {'id': 1, "name": '食品'},
  {'id': 2, "name": '文玩'},
  {'id': 3, "name": '服饰'},
  {'id': 4, "name": '日用品'},
  {'id': 5, "name": '小商品'}
]

//投诉类型
export const complainType = [
  {'id': 1, 'name': '产品质量问题'},
  {'id': 2, 'name': '产品价格问题'},
  {'id': 3, 'name': '售后维修费用'},
  {'id': 4, 'name': '其他投诉类型'}
]

//搜索新闻推荐
export const newsRecommend = [
  {"id": 0, "name": "三星note7爆炸门"},
  {"id": 1, "name": "苏丹红事件"},
  {"id": 2, "name": "苹果电池爆炸门"},
  {"id": 3, "name": "三聚氰胺再度来袭"},
  {"id": 4, "name": "江南皮革厂"},
]

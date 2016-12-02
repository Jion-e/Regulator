const ComplainAdd = resolve => require(['./pages/complain_add.vue'], resolve)
const ComplainSuccess = resolve => require(['./pages/complain_success.vue'], resolve)
const Exposure = resolve => require(['./pages/exposure_index.vue'], resolve)
const ExposureEmpty = resolve => require(['./pages/exposure_empty.vue'], resolve)
const ExposureResult = resolve => require(['./pages/exposure_result.vue'], resolve)
const ExposureView = resolve => require(['./pages/exposure_view.vue'], resolve)
const News = resolve => require(['./pages/news_index.vue'], resolve)
const NewsView = resolve => require(['./pages/news_view.vue'], resolve)

const routes = [
  {path: '/', name: '首页', component: ComplainAdd},
  {path: '/ComplainAdd', name: '质量投诉', component: ComplainAdd},
  {path: '/ComplainSuccess', name: '质量投诉成功', component: ComplainSuccess},
  {path: '/Exposure', name: '质量曝光首页', component: Exposure},
  {path: '/ExposureEmpty', name: '质量曝光搜索为空', component: ExposureEmpty},
  {path: '/ExposureResult/:keyword', name: '质量曝光搜索结果页面', component: ExposureResult},
  {path: '/ExposureView/:id', name: '质量曝光详情', component: ExposureView},
  {path: '/News', name: '质量热点', component: News},
  {path: '/NewsView/:id', name: '新闻详情', component: NewsView},
  {path: '*', component: ComplainAdd }
]

export default routes

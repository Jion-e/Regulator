<template lang="html">
  <div class="complain">
    <mt-header title="质量投诉">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <a href="javascript:;" slot="left" onClick="window.Quality.closeWebView()">
      <!-- <a href="javascript:;" slot="left" onClick="_finish"> -->
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>
    <main>
      <form class="add-form">
        <mt-field label="投诉标题" v-model="complain.title" placeholder="请输入投诉标题"></mt-field>
        <mt-field label="隶属栏目"  class="self-field" readonly>
          <select v-model="complain.category" @change="categoryChange($event)" placeholder="请选择隶属栏目">
            <option
              v-for="type of categories"
              :value="type.id"
              v-text="type.name"
              >
            </option>
          </select>
        </mt-field>
        <mt-field label="姓名" v-model="complain.name" placeholder="请输入姓名"></mt-field>
        <mt-field label="性别" class="self-field self-field-sex" readonly>
          <label><input type="radio" class="radio" name="sex" value="0" v-model.number="complain.sex">男</label>
          <label><input type="radio" class="radio" name="sex" value="1" v-model.number="complain.sex">女</label>
        </mt-field>
        <mt-field label="联系电话" type="tel" v-model="complain.phone" placeholder="请输入联系电话"></mt-field>
        <!-- <mt-field label="身份证" v-model="complain.idcard"></mt-field> -->
        <!-- <mt-field label="电子邮箱" type="email" v-model="complain.email"></mt-field> -->
        <!-- <mt-field label="地区" v-model="complain.address"></mt-field> -->
        <mt-field label="投诉类型" class="self-field" readonly>
          <select name="category"  v-model.number="complain.type">
            <option v-for="type of complainType" :value="type.id" v-text="type.name" ></option>
          </select>
        </mt-field>
        <!-- <mt-field label="产品品牌" v-model="complain.productBrand"></mt-field> -->
        <mt-field label="投诉品牌" v-model="complain.productDetail" placeholder="请输入投诉品牌"></mt-field>
        <!-- <mt-field label="购买时间" type="date" v-model="complain.payTime"></mt-field>
        <mt-field label="购买价格" type="number" v-model="complain.payPrice"></mt-field> -->
        <!-- <mt-field label="生产厂家" v-model="complain.company"></mt-field> -->
        <!-- <mt-field label="厂家电话" v-model="complain.companyPhone"></mt-field> -->
        <mt-field label="投诉内容" type="textarea" rows="4" v-model="complain.request" placeholder="请输入投诉内容"></mt-field>
        <mt-field label="取证图片" class="self-field upload-field">
          <div id="uploader">
            <div class="btns">
              <div id="filePicker" class="uploadInput">选择图片</div>
            </div>
            <div id="imgWrap"></div>
          </div>
        </mt-field>
        <mt-field label="期望结果" type="textarea" rows="3" v-model="complain.expect" placeholder="请输入期望结果"></mt-field>
        <!-- <mt-field label="投诉回复" type="textarea" rows="4" v-model="complain.response"></mt-field> -->
        <mt-button type="primary" size="large" @click.native.prevent="save" style="border-radius:0">提交</mt-button>
      </form>
    </main>
  </div>
</template>

<script>
import api from '../api'
import category from '../api/category'
import { complainType, ComplainInit, HOST} from '../api/config'
import { MessageBox, Toast } from 'mint-ui'
import moment from 'moment'
import WebUploader from 'webuploader/dist/webuploader.min.js'
export default {
  data() {
    return {
      complain: new ComplainInit(),
      complainType: complainType,
      categories: category.product_class1
    };
  },
  mounted(){
    this.webUploaderInit()
  },
  methods: {
    /**
     * 保存投诉信息
     * @return {[string]} [成功/失败]
     */
    save(){
      MessageBox.confirm('确定提交投诉信息?').then(action => {
        if(this.rule()){
          Toast(this.rule())
          return false
        }
        this.complain.evidenceImg = JSON.stringify(this.complain.evidenceImg)
        this.complain.createTime = moment().format('YYYY-MM-DD HH:mm:ss')

        api.saveComplain(this.complain).then(data =>　{
          this.$router.push({path: '/ComplainSuccess'})
        }).catch(err => Toast(err))
      })
    },
    webUploaderInit(){
      const vm = this
      var uploader = WebUploader.create({
        swf: require('webuploader/dist/Uploader.swf'),
        server: `${HOST}common/upload/image`,
        pick: {
          id: '#filePicker'
          // multiple: false
        },
        resize: true, //压缩
        auto: true,
        accept: {
          title: 'Images',
          extensions: 'gif,jpg,jpeg,bmp,png',
          mimeTypes: 'image/*'
        }
      })
      // 当有文件添加进来的时候
      uploader.on('fileQueued', function(file) {
        const $li = $('<div id="' + file.id + '" class="file-item thumbnail">' + '<img>' + '</div>')
        const $img = $li.find('img')
        const $list = $("#imgWrap")

        $list.append($li)
        // 创建缩略图
        uploader.makeThumb(file, function(error, src) {
          if (error) {
            $img.replaceWith('<span>不能预览</span>')
            return
          }
          $('.upload-field .mint-field-other').css({'top': '10px'})
          $img.attr('src', src)
        }, 80, 60)
      })
      //成功
      uploader.on( 'uploadSuccess', function( file, response ) {
        vm.complain.evidenceImg.push(response._raw)  //返回图片地址
      })
    },
    /**
     * 隶属栏目change事件
     * @param  {[dom]} event [select dom元素]
     * @return {[string]}       [选中option的test]
     */
    categoryChange(event){
      const el = event.currentTarget
      this.complain.categoryName = $(el).find('option:selected').text()
    },
    rule(){
      let str = ''
      if(!this.complain.title){
        str = '请输入投诉标题'
      }
      if(!this.complain.category){
        str = '请选择隶属栏目'
      }
      if(!this.complain.name){
        str = '请输入姓名'
      }
      if(!this.complain.phone){
        str = '请输入联系电话'
      }
      if(!this.complain.type){
        str = '请选择投诉类型'
      }
      if(!this.complain.productDetail){
        str = '请输入投诉品牌'
      }
      if(!this.complain.request){
        str = '请输入投诉内容'
      }
      if(!this.complain.expect){
        str = '请输入期望结果'
      }
      return str
    }
  }
};
</script>

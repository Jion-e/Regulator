<template lang="html">
  <div class="complain">
    <mt-header title="质量投诉">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <main>
      <form class="add-form">
        <mt-field label="投诉标题" v-model="complain.title"></mt-field>
        <mt-field label="隶属栏目"  class="self-field" readonly>
          <select v-model="complain.category" @change="categoryChange($event)">
            <option
              v-for="type of categories"
              :value="type.id"
              v-text="type.name"
              >
            </option>
          </select>
        </mt-field>
        <mt-field label="姓名" v-model="complain.name"></mt-field>
        <mt-field label="性别" class="self-field" readonly>
          <label><input type="radio" class="radio" name="sex" value="0" v-model.number="complain.sex">男</label>
          <label><input type="radio" class="radio" name="sex" value="1" v-model.number="complain.sex">女</label>
        </mt-field>
        <mt-field label="联系电话" type="tel" v-model="complain.phone"></mt-field>
        <!-- <mt-field label="身份证" v-model="complain.idcard"></mt-field> -->
        <!-- <mt-field label="电子邮箱" type="email" v-model="complain.email"></mt-field> -->
        <!-- <mt-field label="地区" v-model="complain.address"></mt-field> -->
        <mt-field label="投诉类型" class="self-field">
          <select name="category"  v-model.number="complain.type">
            <option v-for="type of complainType" :value="type.id" v-text="type.name" ></option>
          </select>
        </mt-field>
        <!-- <mt-field label="产品品牌" v-model="complain.productBrand"></mt-field> -->
        <mt-field label="产品型号" v-model="complain.productDetail"></mt-field>
        <!-- <mt-field label="购买时间" type="date" v-model="complain.payTime"></mt-field>
        <mt-field label="购买价格" type="number" v-model="complain.payPrice"></mt-field> -->
        <mt-field label="生产厂家" v-model="complain.company"></mt-field>
        <!-- <mt-field label="厂家电话" v-model="complain.companyPhone"></mt-field> -->
        <mt-field label="投诉内容" type="textarea" rows="4" v-model="complain.request"></mt-field>
        <mt-field label="相关证据" class="self-field">
          <input type="file" name="name" value="">
          <!-- <div id="uploader" class="wu-example">
              <div id="thelist" class="uploader-list"></div>
              <div class="btns">
                  <div id="picker">选择文件</div>
                  <button id="ctlBtn" class="btn btn-default">开始上传</button>
              </div>
          </div> -->
        </mt-field>
        <mt-field label="期望结果" type="textarea" rows="3" v-model="complain.expect"></mt-field>
        <!-- <mt-field label="投诉回复" type="textarea" rows="4" v-model="complain.response"></mt-field> -->
        <mt-button type="primary" size="large" @click.native.prevent="save" style="border-radius:0">提交</mt-button>
      </form>
      <p>
        {{complain}}
      </p>
    </main>
  </div>
</template>

<script>
import api from '../api'
import category from '../api/category'
import { complainType, complainInit } from '../api/config'
import { MessageBox, Toast } from 'mint-ui'
import moment from 'moment'
// import WebUploader from 'webuploader/dist/webuploader.js'
import 'webuploader/dist/webuploader.css'
export default {
  data() {
    return {
      // complain: new complainInit(),
      complain: {
          // 'id|+1': 1,
          'title': "华为mate7电池爆炸",
          "category": 4,
          "categoryName": "手机数码",
          "name": "张三",
          "sex": 0,
          "phone": "18355664512",
          "idcard": "5126359654878567",
          "email": "",
          "address": "四川成都",
          "type": 3,
          "productBrand": "",
          "productDetail": "华为mate7移动银色64G",
          "payTime": "",
          "productPrice": "",
          "company": "华为",
          "companyPhone": "13100021546",
          "evidence_img": "",
          "request": "手机渣的一笔手机渣的一笔手机渣的一笔手机渣的一笔手机渣的一笔手机渣的一笔手机渣的一笔",
          "expect": "注重细节",
          "response": "亲，感谢的投诉，我们将生产出更让您满意的手机",
          "is": 0
      },
      complainType: complainType,
      categories: category.product_class1
    };
  },
  created(){
    // var uploader = WebUploader.create({
    //
    //     // swf文件路径
    //     swf: 'BASE_URL' + '/js/Uploader.swf',
    //
    //     // 文件接收服务端。
    //     server: 'http://webuploader.duapp.com/server/fileupload.php',
    //
    //     // 选择文件的按钮。可选。
    //     // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    //     pick: '#picker',
    //
    //     // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    //     resize: false
    // });
  },
  methods: {
    /**
     * 保存投诉信息
     * @return {[string]} [成功/失败]
     */
    save(){
      MessageBox.confirm('确定提交投诉信息?').then(action => {
        this.complain.createTime = moment().format('YYYY-MM-DD HH:mm:ss')

        api.saveComplain(this.complain).then(data =>　{
          this.$router.push({path: '/ComplainSuccess'})
        }).catch(err => {
          Toast(err)
        })
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
    }
  }
};
</script>

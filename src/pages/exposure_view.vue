<template lang="html">
  <div class="exposure">
    <mt-header title="质量曝光详情">
      <router-link to="/Exposure" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="view">
      <ul>
          <!-- <li><span>编号:</span>{{exposure.id}}</li> -->
          <li>
            <span class="card-label">企业名称:</span>
            <span class="card-input">{{exposure.companyName}}</span>
          </li>
          <li>
            <span class="card-label">企业所在地:</span>
            <span class="card-input">{{exposure.location}}</span>
          </li>
          <li>
            <span class="card-label">产品名称:</span>
            <span class="card-input">{{exposure.productName}}</span>
          </li>
          <li>
            <span class="card-label">商标:</span>
            <span class="card-input">{{exposure.brand}}</span>
          </li>
          <li>
            <span class="card-label">所属行业:</span>
            <span class="card-input">{{exposure.productClass1Name}}</span>
          </li>
          <li>
            <span class="card-label">细分行业:</span>
            <span class="card-input">{{exposure.productClass2Name}}</span>
          </li>
          <li>
            <span class="card-label">规格型号:</span>
            <span class="card-input">{{exposure.model}}</span>
          </li>
          <li>
            <span class="card-label">抽查结果:</span>
            <span class="card-input">{{exposure.result}}</span>
          </li>
          <li>
            <span class="card-label">不合格项目:</span>
            <span class="card-input">{{exposure.reason}}</span>
          </li>
          <li>
            <span class="card-label">承建机构:</span>
            <span class="card-input">{{exposure.accreditationBody}}</span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      exposure: {}
    };
  },
  created() {
    const id = this.$route.params.id
    api.fetchExposure(id).then(data => {
      this.exposure = data
    }).catch(err => Toast(err))
  },
  methods: {},
  components: {}
};
</script>

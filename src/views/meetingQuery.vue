<template>
  <div class="pageIndex">
    <img src="../assets/image/logo.png" alt="" class="logo">
    <div class="title">
      <img src="../assets/image/gdhy.png" alt="">
    </div>
    <div class="pageForm" v-show="isQuery">
      <van-form @failed="onFailed" @submit="onSubmit">
        <van-field
          v-model="form.person_phone"
          name="name"
          label-width="50"
          label="手机"
          type="number"
          maxlength="11"
          placeholder="请输入手机号码"
          :rules="[{ pattern:patternPhone,required: true, message: '请输入正确的手机号码' }]"
        />
        <div class="tip">请输入预登记时填写的手机号</div>
        <div style="margin: 0 20px;">
          <van-button round block type="info" native-type="submit" class="submitBtn">查询</van-button>
        </div>
        <div @click="register()" class="dj">去登记</div>
      </van-form>
    </div>
    <div class="queryNull" v-show="!isQuery">
      <!-- 查询失败 -->
      <div v-show="isFail">
        <div class="nullText" style="margin-top:64px">该手机号未登记！</div>
        <div class="nullText" style="margin-bottom:52px">请重新输入</div>
        <div style="margin: 16px;">
          <van-button round block type="info" class="submitBtn" @click="returnPage">返回</van-button>
        </div>
      </div>
      <!-- 查询成功 -->
      <div class="searchYes" v-show="isSuccess">
        <img :src="codeSrc" alt="">
        <div class="submitYes">提交成功</div>
        <div class="submitTip">请长按保存 ，入场时出示可快速扫码入场</div>
      </div>
    </div>
    <div class="footer">
      <div>
        <div>了解更多敬请关注</div>
        <div>民生银行企业财富管理公众号</div>
      </div>
      <div>
        <img src="../assets/image/code.jpg" alt="" class="code">
      </div>
    </div>
  </div>
</template>
<script>
import { meetingsearch } from '../assets/libs/service/request'
import envConfig from '../assets/env.json'
export default {
  name: 'index',
  data() {
    return {
      isFail: false,
      isSuccess: false,
      isQuery: true,
      patternPhone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
      form: {
        person_phone: ''
      },
      codeSrc: '',
      baseUrl: ''
    }
  },
  computed: { },
  beforeMount() {},
  mounted() {
    this.baseUrl = envConfig.env.dev

    let geturl = window.location.href 
    let getqyinfo = geturl.split('?')[1]
    let getqys = new URLSearchParams('?'+getqyinfo)
    let titleText = getqys.get('title')
    var title = document.getElementsByTagName("title");
    if(titleText){
      title[0].innerHTML = titleText
    } else {
      title[0].innerHTML = '高端会议'
    }
    
  },
  methods: {
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
      // 二维码
    },
    returnPage(){
      this.isQuery = true
    },
    onSubmit(val) {
      meetingsearch(this.form).then(data => {
        this.isQuery = false
        if(data.result){
          this.isSuccess = true
          this.isFail = false
          this.codeSrc = this.baseUrl + data.data.person_qrcode
        } else {
          this.form.person_phone = ''
          this.isFail = true
          this.isSuccess = false
        }
      }).catch()
    },
    register(){
      this.$router.push({
        name: 'meetingRegister',
        query: { }
      })
    }
  }
}
</script>
<style scoped lang="less">
  .searchYes {
    img {
      width: 160px;
      height: 160px;
      margin: 0 auto;
      display: block;
      margin-top: 10px;
    }
    .qrcode {
      width: 160px;
      height: 160px;
      margin: 0 auto;
      display: -block;
      margin-top: 10px;
    }
    .submitYes {
      opacity: 0.8999999761581421;
      color: #0076BF;
      font-family: FZLanTingHeiS-B-GB;
      font-weight: regular;
      font-size: 20px;
      line-height: 28px;
      letter-spacing: 0px;
      text-align: center;
      margin-top: 12px;
    }
    .submitTip {
      opacity: 0.8999999761581421;
      color: #000000;
      font-family: FZLanTingHeiS-R-GB;
      font-weight: regular;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: center;
      margin-top: 8px;
      padding-bottom: 24px;
    }
  }

  .dj {
    opacity: 0.6000000238418579;
    color: #000000;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: regular;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 10px;
    text-align: center;
    margin: 20px 20px 0 20px;
  }
.pageIndex {
    background-image: url('../assets/image/background.jpg');
    width: 100vw;
    height: 700px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .logo {
    position: absolute;
    top: 40px;
    left: 30px;
    width: 160px;
    height: 28px;
  }
  .title {
    position: absolute;
    top: 120px;
    left: calc(50vw - 47px);
  }
  .title img{
    width: 94px;
    height: 128px;
  }
  .pageForm, .queryNull {
    position: absolute;
    top: 300px;
    left: 7.6%;
  }
  .footer {
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 100%;
    >div:nth-of-type(1) {
      width: calc(100vw - 100px);
      div {
        opacity: 0.8999999761581421;
        color: #000000;
        font-family: FZLanTingHeiS-R-GB;
        font-weight: regular;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1px;
        text-align: left;
        padding-left: 39px;
      }
    }
    div {
      .code {
        width: 64px;
        height: 64px;
        margin-right: 30px;
      }
    }
  }
  .nullText {
    opacity: 0.8999999761581421;
    color: #000000;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: regular;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 1px;
    text-align: center;
  }
  .submitBtn {
    border-radius: 8px;
    background: linear-gradient(-90deg, #00ACDC 0%, #0B87D4 100%);
    border: 0px solid #00000014;
    color: #FFFFFF;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: regular;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 10px;
    text-align: center;
    margin: 0 auto;
  }
  .registerBtn {
    border-radius: 8px;
    color: #000000;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: regular;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 10px;
    text-align: center;
    margin: 0 auto;
  }
  .tip {
    opacity: 0.4000000059604645;
    color: #000000;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: regular;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 30px;
  }
  .pageIndex /deep/ .van-cell {
    color: #000000;
    border-radius: 20px;
    margin-bottom: 6px;
  }
  .pageForm {
    width: 84.8%;
    background: #ffffff;
    // border-top-left-radius: 20px;
    // border-top-right-radius: 20px;
    border-radius: 20px;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 12px 24px 0px #A2CAF133;
    margin: 0px auto;
    height: 200px;
    padding-top: 50px;
  }
  .queryNull {
    width: 84.8%;
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 12px 24px 0px #A2CAF133;
    padding-top: 20px;
  }
</style>

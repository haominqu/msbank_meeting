<template>
  <div class="pageIndex">
    <img src="../assets/image/logo.png" alt="" class="logo">
    <div class="title">
      <img src="../assets/image/gdhy.png" alt="">
    </div>
    <div class="pageForm" v-show="isQuery">
      <van-form validate-first @failed="onFailed" @submit="submit">
        <van-field
          v-model="form.person_name"
          name="name"
          label="姓名"
          label-width="50"
          placeholder="请输入姓名"
          maxlength="20"
          :rules="[{ required: true, message: '请输入正确的姓名' }]"
        />
        <van-field
          v-model="form.person_tel"
          name="name"
          label-width="50"
          label="手机"
          maxlength="11"
          placeholder="请输入手机号码"
          :rules="[{ patternPhone, message: '请输入正确的手机号码' }]"
        />
        <van-field
          v-model="form.person_company"
          name="name"
          label-width="50"
          label="公司"
          placeholder="请输入公司"
          :rules="[{ required: true, message: '请输入公司' }]"
        />
        <div class="tip">我们承诺以上信息仅用于会议登记</div>
        <div style="margin: 0 20px;">
          <van-button round block type="info" native-type="submit" class="submitBtn">提交</van-button>
        </div>
      </van-form>
    </div>
    <div class="queryNull" v-show="!isQuery">
      <div class="searchYes">
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
import QRCode from 'qrcodejs2'
import { meetingSignin } from '../assets/libs/service/request'
import { Dialog } from 'vant'
import envConfig from '../assets/env.json'
export default {
  name: 'index',
  data() {
    return {
      isQuery: true,
      patternName: /^[\u4e00-\u9fa5]{0,20}$/,
      patternPhone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
      // patternCompany: /^[\u4e00-\u9fa5]{0,4}$/,
      form: {
        person_name: '',
        person_tel: '',
        person_company: '',
        meeting_id: ''
      },
      codeSrc:'',
      baseUrl: ''
    }
  },
  computed: {
  },
  beforeMount() {
  },
  mounted() {
    this.baseUrl = envConfig.env.dev
  },
  methods: {
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
    },
    returnPage(){
      this.isQuery = true
    },
    submit() {
      let geturl = window.location.href 
      let getqyinfo = geturl.split('?')[1]
      let getqys = new URLSearchParams('?'+getqyinfo)
      let getqycode = getqys.get('qycode')
      this.form.meeting_id = getqys.get('meetingId')
      meetingSignin(this.form).then(data => {
        if(data.result){
          this.isQuery = false
          this.codeSrc = this.baseUrl + data.data.person_qrcode
        } else {
          Dialog.alert({
            title: '提示',
            message: data.error,
          }).then(() => {
            
          });
        }
      }).catch()
    },
    register(){
      this.$router.push({
        name: 'meetingRegister',
        query: { }
      })
    }
  },
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
    height: 100vh;
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
    top: 110px;
    left: calc(50vw - 47px);
  }
  .title img{
    width: 94px;
    height: 128px;
  }
  .pageForm, .queryNull {
    position: absolute;
    top: 280px;
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
    margin-bottom: 15px;
    margin-top: 15px;
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
    height: 250px;
    padding-top: 20px;
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

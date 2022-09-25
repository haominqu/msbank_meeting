<template>
  <div class="pageIndex">
    <img src="../assets/image/logo.png" alt="" class="logo">
    <div class="title">
      <img src="../assets/image/gdhyd.png" alt="">
    </div>
    <div class="pageForm">
      <div class="erCode">
        <img src="../assets/image/code.jpg" alt="" class="code">
      </div>
      <div class="indexTip">立即扫码预约  现场快速入场</div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { Dialog } from 'vant';
export default {
  name: 'index',

  data() {
    return {
      isQuery: true,
      patternName: /^[\u4e00-\u9fa5]{2,4}$/,
      patternPhone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
      patternCompany: /^[\u4e00-\u9fa5]{2,4}$/,
      form: {
        name: '喜洋洋',
        phone: '15022129966',
        company: '内径'
      }
    }
  },
  computed: {
   
  },
  beforeMount() {
   
  },
  mounted() {
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
    submit() {
      // ------成功
      this.isQuery = false
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'd', // 需要转换为二维码的内容
        width: 150,
        height: 150,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      // 失败======
      Dialog.alert({
        title: '提示',
        message: '提交失败，重试',
      }).then(() => {
        // on close
      });
      // 调查询接口
      // this.$service.callService('claimSubmit',this.form).then(res => {
      //   Dialog.alert({
      //     title: '提交成功',
      //     message: '您的理赔资料已提交完成，我们会尽快处理您的申请',
      //   }).then(() => {
      //     location.reload()
      //   })
      // })
    },
    register(){
      this.$router.push({
        name: 'meetingRegister',
        query: { }
      })
    }
  },
  watch:{
    
  }
}
</script>

<style scoped lang="less">
  .erCode {
    width: 100%;
    img {
      width: 106px;
      height: 106px;
      display: block;
      margin: 0 auto;
    }
  }
  .indexTip {
    opacity: 0.8999999761581421;
    color: #000000;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: regular;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 34px;
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
    top: 160px;
    left: calc(50vw - 71px);
  }
  .title img{
    width: 143px;
    height: 192px;
  }
  .pageForm{
    position: absolute;
    top: 450px;
    width: 100%;
  }
</style>

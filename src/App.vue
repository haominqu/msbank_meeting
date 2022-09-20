<template>
  <div 
    id="app"
  >
    <!-- <Header 
      v-if="getLoginType === 'mobile'"
      :propTitle="title"
    />
    <Menu v-else/> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <div @click="showLoading">asdf</div> -->
    <router-view/>
    <!-- <Loading /> -->
  </div>
</template>

<script>
// import Menu from '@/components/manageComponents/menu'
// import Loading from '@/components/common/loading'
// // import Header from '@/components/base/header'
// // import title from '@/router/routeTitle'
// import { detectUA } from '@/assets/util/index'
// import { mapGetters } from 'vuex'
// import RN from '@/router/routeName'
// import router from '@/router/index'
// // import store from '@/store/index'

export default {
  name: 'home',
  components: {
    // Loading,
    // Header,
    // Menu
  },
  data() {
    return {
      title: null,
      pcStyle: {
        maxWidth: '100%',
        background: 'none'  
      }
    }
  },
  computed: {
   
  },
  beforeCreate() {
    // this.initFn()
  },
  beforeMount() {
    // if(!detectUA.mobile) {
    //   store.commit({
    //     type: 'setLoginType',
    //     loginType: 'pc'
    //   })
    // }
  },
  methods: {

  },
  mounted() {
    // this.title = title[this.$route.name]
    // console.log(this.title,'===this.title==')

    // console.log(detectUA)
    // router.push({name: RN.AUTHORIZATION})
    // if (this.getLoginType === 'pc') {
    //   document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    // } else {
    //   document.getElementsByTagName('html')[0].style.overflow = 'auto'
    // }
    // console.log(this.getLoginType,'====getLoginType===')
  },
  watch:{
    // $route(to){
    //   this.title = title[to.name]
    // }
  }
}
</script>

<style lang="scss">
  @import "./assets/css/common.scss";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    min-height: 100vh;
  }
  .pc {
    width: 100%;
    background: #eee;
    display: flex;
    justify-content: space-between;
  }
  .mobile {
    @extend .page-max-width;
    // background: url('assets/image/bg.png') top center;
  }
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .noClick {
   pointer-events: none;
  //  -webkit-filter: grayscale(1);
   opacity: 0.7;
  //  -webkit-filter: opacity(.7);
  }
</style>

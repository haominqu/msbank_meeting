// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');

// module.exports = {
// //   outputDir: 'docs',
// //   publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [
//           autoprefixer(),
//           pxtorem({
//             rootValue: 75,
//             propList: ['*']
//           })
//         ]
//       }
//     }
//   }
// };
module.exports = {
    publicPath: './',
    outputDir: './dist', // 构建输出目录  //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    // lintOnSave: false, //是否开启eslint
    devServer: {
      open: false, //是否自动弹出浏览器页面
    //   host: "localhost",
    //   port: '8081',
      https: false,  //是否使用https协议
      hotOnly: true, //是否开启热更新
      proxy: {
        '/api': {
            // target: 'http://172.19.50.79:8180/', //API服务器的地址
            target: 'http://101.42.247.64:8001/', //API服务器的地址
            // ws: true, //代理websockets
            changeOrigin: true, // 虚拟的站点需要更管origin
            pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
              '^/api': ''
            }
        },
        '/meeting': {
          // target: 'http://172.19.50.79:8180/', //API服务器的地址
          target: 'http://101.42.247.64:8001/', //API服务器的地址
          // ws: true, //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/meeting': ''
          }
        }
      },
    }
}
// const path = require('path');

// const devServerPort = 9527; // TODO: get this variable from setting.ts
// const name = '规则引擎'; // TODO: get this variable from setting.ts

module.exports = {
  // lintOnSave: process.env.NODE_ENV === 'development',
  // productionSourceMap: false,
  /* devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:8881',
        // target: 'http://10.25.16.65:8881', 
        changeOrigin: true, // needed for virtual hosted sites
        ws: true // proxy websockets
      }
    }
  }, */
  // pwa: {
  //   name: name,
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
  //   }
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        '/Users/zoey/Desktop/work/单表操作设计/data-table/src/styles/_variables.scss',
        '/Users/zoey/Desktop/work/单表操作设计/data-table/src/styles/_mixins.scss'
      ]
    }
  },
  // chainWebpack(config) {
  //   // provide the app's title in webpack's name field, so that
  //   // it can be accessed in index.html to inject the correct title.
    // config.set('name', name);

    //   // https://webpack.js.org/configuration/devtool/#development
    //   // Change development env source map if you want.
    //   // The default in vue-cli is 'eval-cheap-module-source-map'.
    //   // config
    //   //   .when(process.env.NODE_ENV === 'development',
    //   //     config => config.devtool('eval-cheap-source-map')
    //   //   )

  //   config
  //     .when(process.env.NODE_ENV !== 'development',
  //       config => {
  //         config
  //           .optimization.splitChunks({
  //             chunks: 'all',
  //             cacheGroups: {
  //               libs: {
  //                 name: 'chunk-libs',
  //                 test: '/[\\/]node_modules[\\/]/',
  //                 priority: 10,
  //                 chunks: 'initial' // only package third parties that are initially dependent
  //               },
  //               elementUI: {
  //                 name: 'chunk-elementUI', // split elementUI into a single package
  //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //               },
  //               commons: {
  //                 name: 'chunk-commons',
  //                 test: path.resolve(__dirname, 'src/components'),
  //                 minChunks: 3, //  minimum common number
  //                 priority: 5,
  //                 reuseExistingChunk: true
  //               }
  //             }
  //           });
  //         config.optimization.runtimeChunk('single');
  //       }
  //     );
  // }
};

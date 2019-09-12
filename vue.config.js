// vue.config.js
var PostCompilePlugin = require('webpack-post-compile-plugin')
var path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ws_html/'
    : '/',
  // assetsDir: 'ws_html',
  configureWebpack: {
    module: {
      rules: [
        // ...
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
            resolve('src')
          ]
        },
        // ...
      ]
    },
    plugins: [
      new PostCompilePlugin()
    ],
    externals: {
      'ap': 'ap', // 配置使用CDN
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/customer': {
        target: 'http://222.212.141.34:8085'
      },
      '/product': {
        target: 'http://222.212.141.34:8085'
      },
      // '/CarInfo': {
      //   target: 'http://api.car.bitauto.com'
      // },
      // '/web_app': {
      //   target: 'http://mapi.yiche.com'
      // }
    }
  }
}

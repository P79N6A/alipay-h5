// vue.config.js
var PostCompilePlugin = require('webpack-post-compile-plugin')
var path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
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
    port: 80,
  }
}

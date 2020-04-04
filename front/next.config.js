const Dotenv = require('dotenv-webpack')
const path = require("path")
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withLess(withCSS({
  // for less settings
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  target: 'serverless',
  webpack: (config, { isServer }) => {
    // for less settings
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    // Next.js 9.1からpublicディレクトリがサポートされたので変更必要？
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })
    // directory root alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "./src")
    };
    // dotEnv settings
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        systemvars: true
      })
    ];
    return config
  }
}))

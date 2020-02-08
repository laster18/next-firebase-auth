const Dotenv = require('dotenv-webpack');
const path = require("path")
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  target: 'serverless',
  webpack(config) {
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
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "./src")
    };
    // config.plugins = config.plugins || [];
    // config.plugins = [
    //   ...config.plugins,
    //   // Read the .env file
    //   new Dotenv({
    //     path: path.join(__dirname, ".env"),
    //     systemvars: true
    //   })
    // ];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        systemvars: true
      })
    ];

    // config.env = {
    //   customKey: 'MyValue'
    // }

    return config
  }
})

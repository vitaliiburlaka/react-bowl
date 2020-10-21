/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const appPublic = path.join(__dirname, 'public')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

const proxy = fs.existsSync(path.join(__dirname, 'proxy.json'))
  ? require(path.join(__dirname, 'proxy.json'))
  : {}

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: '/',
  https: protocol === 'https',
  port: 9000,
  overlay: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  proxy,
  open: true,
}

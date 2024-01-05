module.exports = {
  devServer: {
    proxy: {
      '/my-web': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    if (process.env.analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}

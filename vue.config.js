const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        productName: 'DereMemo'
      }
    },
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}) 

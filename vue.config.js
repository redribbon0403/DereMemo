const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // Or, for multiple preload files:
      preload: { preload: 'src/preload.js' }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
})

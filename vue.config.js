const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions:{
          plugins: [
            // 把px单位换算成rem单位
            require("postcss-pxtorem")({
              rootValue: 192, // 换算的基数 375的设计稿，换算基数就是37.5 ,本项目是1920，则192
              propList: ["*"], //可以从px更改为rem的属性。
              // selectorBlackList: [".el"],// 要忽略的选择器并保留为px。
              minPixelValue: 2 // 设置要替换的最小像素值。
            })
          ]
        }
      },
    }
  },
})

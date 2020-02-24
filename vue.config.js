module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "src/views/admin/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "后台管理系统",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    userManage: "src/views/userManage/main.js",
    financeManage: "src/views/financeManage/main.js",
    operationManage: "src/views/operationManage/main.js",
    systemManage: "src/views/systemManage/main.js",
    maintainManage: "src/views/maintainManage/main.js",
  },
  lintOnSave: false, // 注释eslint
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        target: 'http://192.168.1.78:8080',
        // ws: true,
        changeOrigin: true
      }
    },
  }
}

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  devServer: {
    port: 3000,
    disableHostCheck: true // local 이외의 host에서도 접속하도록 허용
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};

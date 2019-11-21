var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 자바스크립트 빌드
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "../dist"), // __dirname : webpack config 파일이 위치한 곳 (현재는 /usr/src/app/config)
    filename: "index_bundle.js"
    // publicPath: "/" // http://0.0.0.0:3000/index_bundle.js 접속시 빌드 이후의 javascript 볼 수 있음
  },
  // 빌드된 파일의 크기가 512000 이상이면 경고 메시지 출력
  performance: {
    // hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  // 서버 설정
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    disableHostCheck: true, // local 이외의 host에서도 접속하도록 허용
    historyApiFallback: true // 리액트 라우터가 제대로 동작하기 위한 설정
    // contentBase: path.resolve(__dirname, "dist"),
  },
  // Loader 적용
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader", // React 빌드
            options: {
              // webpack dev server 의 첫 로딩속도를 빠르게 함
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        ],
        exclude: "/node_modules"
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }] // HTML 빌드와 minify
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }, // CSS 빌드
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] // SASS 빌드
      }
    ]
  },
  //절대경로 설정
  resolve: {
    modules: [path.join(__dirname, "../src"), "node_modules"]
  },
  mode: "production", // production 모드인 경우 CSS, JAVASCRIPT minify, 자바스크립트 번들링 유무에 따라 파일크기가 엄청 다름
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html" // 빌드 전 HTML 파일 위치
    }),
    // css 파일을 따로 추출함
    new MiniCssExtractPlugin({
      filename: "style.css" // 빌드 이후의 CSS 파일명
    }),
    new CleanWebpackPlugin() // 사용하지 않는 빌드 파일 삭제
  ]
};

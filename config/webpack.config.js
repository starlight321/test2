const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
    header: path.resolve(__dirname, "../src/header.js"),
  },
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
        include: path.join(__dirname, "../assets"),
        exclude: "/node_modules/",
      },
      {
        test: /\.less$/,

        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader",
        ],
        include: path.join(__dirname, "../assets"),
        exclude: "/node_modules/",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        minimize: true, //是否打包为最小值
        removeAttrbuteQuotes: true, //去除引号
        removeComments: true, //去掉注释
        collapseWhitespace: true, //去掉空格
        minifyCss: true, //压缩css
        removeEmptyElements: false, //清理内容为空的元素
      },
      filename: "index.html",
      inject: "body",
      chunks: ["header", "main"],
      chunksSortMode: "manual", // manual 按照手动的顺序载入 dependency 按照不同文件的依赖关系来排序
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/header.html"),
      filename: "header.html",
      inject: "body",
      chunks: ["header"],
    }),
  ],
};

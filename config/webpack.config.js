const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.(jpe?g|png|gif)$/i, // 图片
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20480, // 20kb
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, // 10kb
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
        ],
        include: path.join(__dirname, "../assets"),
        exclude: "/node_modules/",
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
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
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].css",
    }),
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

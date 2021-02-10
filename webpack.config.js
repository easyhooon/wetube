const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
//entry => 파일들이 어디에서 왔는가?
const OUTPUT_DIR = path.join(__dirname, "static");
//output => 그걸 어디에 넣을 것인가?

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(scss)$/,  //scss인 파일을 전부 찾아줌 
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader" //css를 가져와줌 
          },
          {
            loader: "postcss-loader", //postcss-loader는 특정 plugin들을 css에 대해 실행시켜줌 
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      //options
                      browsers: "cover 99.5%"
                    },
                  ]
                ]
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css'
    }),
  ]
};

module.exports = config;


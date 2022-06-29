const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const WebpackConfig = {
  mode: "production",
  entry: {
    app: ["./src/packages/index.ts"]
  },
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    filename: "xin-vant.common.js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "src"),
      "xin-vant": path.resolve(__dirname, "./")
    },
    modules: ["node_modules"]
  },
  externals: [
    {
      vue: "vue"
    },
    nodeExternals()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length,
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    modules: true,
    children: false,
    chunks: false,
    chunkModules: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['happypack/loader?id=ts'],
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'happypack/loader?id=babel'
          },
          compilerOptions: {
            preserveWhitespace: false,
            whitespace: 'condense'
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, './src/assets/scss/baseParams.scss')
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['happypack/loader?id=css'],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [

    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_TYPE': JSON.stringify('commonjs2')  // 注入全局参数，区分UMD和COMMONJS的打包方式，用来分辨是否需要自动注册全局组件
    }),
    new HappyPack({
      id: 'babel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        {
          loader: 'ts-loader',
          query: {happyPackMode: true},
          options: {appendTsSuffixTo: [/\.vue$/]}
        }
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'sass',
      loaders: [
        // 将 JS 字符串生成为 style 节点
        MiniCssExtractPlugin.loader,
        // 将 CSS 转化成 CommonJS 模块
        'css-loader',
        // 将 Sass 编译成 CSS
        'sass-loader',
        //全局注入公用变量
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, './src/assets/scss/baseParams.scss')
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'css',
      loaders: [MiniCssExtractPlugin.loader, 'css-loader'],
      threadPool: happyThreadPool
    }),
    new MiniCssExtractPlugin({
      filename: "xin-vant.css"
    }),
    new OptimizeCssAssetsPlugin({
      sourceMap: false,
      cssnanoOptions: {
        preset: [
          "default",
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
    })
  ]
};

// 每个loader的用时
let smpConfig = null;
smpConfig = smp.wrap(WebpackConfig)

module.exports = smpConfig || WebpackConfig;

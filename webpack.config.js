const path = require("path");
var webpackNotifier = require("webpack-notifier");
var htmlWebpack = require("html-webpack-plugin");
var pkg = require("./package.json");
var webpack = require("webpack");
var DotEnv = require("dotenv-webpack");

const devPlugins = [
  new webpackNotifier({ title: pkg.name }),
  new webpack.HotModuleReplacementPlugin(),
  /**
   * @see https://github.com/mrsteele/dotenv-webpack
   * @param path ('./.env') - The path to your environment variables.
   * @param safe (false) - If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample.
   * @param systemvars (false) - Set to true if you would rather load all system variables as well (useful for CI purposes).
   * @param silent (false) - If true, all warnings will be surpressed.
   */
  new DotEnv({})
];

const buildDir = "built";

const devConfig = {
  devServer: {
    host: "localhost",
    port: 8090,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: "errors-only"
  }
};

const prodConfig = {};

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NLU_TRAINER_API: JSON.stringify(process.env.NLU_TRAINER_API)
    }
  })
];

module.exports = function(env) {
  let otherPlugins = env === "dev" ? devPlugins : prodPlugins;
  let otherConf = env === "dev" ? devConfig : prodConfig;
  return {
    entry: {
      app: path.resolve(__dirname)
    },
    output: {
      path: path.resolve(__dirname, buildDir),
      publicPath: "/",
      filename: "app.js"
    },
    performance: {
      hints: false
    },
    mode: env === "dev" ? "development" : "production",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "awesome-typescript-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(eot|woff2|woff|ttf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: "pre",
          loader: "source-map-loader"
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    plugins: [
      new htmlWebpack({
        title: pkg.description,
        appMountId: "app",
        template: "./index.html"
      }),
      ...otherPlugins
    ],
    ...otherConf
  };
};

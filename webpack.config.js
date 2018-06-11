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
    new DotEnv({ systemvars: true })
]

const buildDir = "built"

const devConfig = {
    devServer: {
    host: "localhost",
    port: 8090,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, buildDir),
    hotOnly: true,
    inline: true,
    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    proxy: {
      "/api": {
        target: process.env.RASA_ENDPOINT || "http://localhost:5000",
        pathRewrite: { "^/api": "" }
      }
    }
  }
}

const prodConfig = {}


const prodPlugins = []

module.exports = function(env) {
    let otherPlugins = env === "dev" ? devPlugins : prodPlugins
    let otherConf = env === "dev" ? devConfig : prodConfig
    return {
        entry: {
            app: path.resolve(__dirname)
        },
        output: {
            path: path.resolve(__dirname, buildDir),
            filename: "app.js"
        },
        devtool: "source-map",
        mode: process.env.dev ? "devlopment" : "production",
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    use: "ts-loader"
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
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
            modules: [ path.resolve(__dirname), "node_modules"]
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
    }
}
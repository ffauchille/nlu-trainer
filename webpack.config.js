const path = require("path");
var webpackNotifier = require("webpack-notifier");
var htmlWebpack = require("html-webpack-plugin");
var pkg = require("./package.json");
var tsconf = require("./tsconfig.json");
var webpack = require("webpack");

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
    new DotEnv()

]

const devConfig = {
    devServer: {
    host: "localhost",
    port: 8090,
    historyApiFallback: true,
    hot: true,
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


const prodPlugins = []

module.exports = function(env) {
    let otherPlugins = env === "dev" ? devPlugins : prodPlugins
    return {
        entry: {
            app: path.join(__dirname);
        },
        output: {
            path: path.resolve(__dirname, tsconf.outDir),
            filename: "app.js"
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    use: [
                        { loader: "ts-loader" }
                    ]
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
        plugins: [
            new htmlWebpack({
                title: pkg.description,
                appMountId: "app",
                template: "src/index.html"
            }),
            ...otherPlugins
        ]
    }
}
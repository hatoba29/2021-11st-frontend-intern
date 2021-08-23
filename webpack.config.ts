import path from "path"
import webpack from "webpack"
import webpackDevServer from "webpack-dev-server"
import HtmlWebPackPlugin from "html-webpack-plugin"

// temporary interface for devServer type error
interface WebpackConfig extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration
}

const config: WebpackConfig = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "src", "App.ts"),
    worker: path.resolve(__dirname, "src", "Worker.ts"),
  },
  output: {
    filename: "[name].js",
  },
  devServer: {
    port: 1234,
    historyApiFallback: true,
    hot: true,
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      css: path.resolve(__dirname, "src", "css"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.jpg$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html",
    }),
  ],
}

export default config

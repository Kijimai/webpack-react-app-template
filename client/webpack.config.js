const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// Before running build for production, make sure to change mode to 'production' before running build

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index.bundle.js",
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    port: 3010,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
}

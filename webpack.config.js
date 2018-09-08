const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./client/src/app.jsx",
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "file-loader",
        query: {
          optipng: {
            optimizationLevel: 7
          }
        },
        exclude: "/assets/example.gif"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"]
  }
};
module.exports = config;

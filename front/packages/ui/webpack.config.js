const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // 중요: dev-server에서 정적 경로 설정
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@p2p-ui/components": path.resolve(__dirname, "src/components"),
      "@p2p-ui/assets": path.resolve(__dirname, "src/assets"),
    },
  },
  // build log 확인용
  // stats: "verbose",
  // infrastructureLogging: {
  //   level: "log",
  //   debug: /swc-loader/,
  // },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
          "url-loader",
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
            sourceMaps: true,
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "src"), // 정적 HTML 파일 위치
    },
    port: 3001,
    hot: true,
    open: true,
  },
};

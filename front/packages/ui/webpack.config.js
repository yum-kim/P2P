const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // 중요: dev-server에서 정적 경로 설정
    libraryTarget: "module",
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@p2p-ui/components": path.resolve(__dirname, "src/components"),
    },
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
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
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              exportType: "default",
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "removeDimensions", // width,height 자동 제거
                    active: true,
                  },
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "src"), // 정적 HTML 파일 위치
    },
    port: 3008,
    hot: true,
    open: true,
  },
};

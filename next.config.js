const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel]
    });
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            publicPath: "./",
            outputPath: "static/css/themes/default/assets/fonts/",
            name: "[name].[ext]"
          }
        }
      ]
    });
    return config;
  }
});

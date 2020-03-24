const withLess = require('@zeit/next-less');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

module.exports = withLess({
  webpack: (config, { dev, isServer, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    let time = 0;
    const handler = percentage => {
      // e.g. Output each progress message directly to the console:
      if (dev && isServer) {
        if (percentage === 0) {
          time = Date.now();
        } else if (percentage === 1) {
          time = Date.now() - time;
          console.log(`服务端编译所用时长 ${time} ms`);
        }
      }
    };

    config.plugins.push(new webpack.ProgressPlugin(handler));

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });
    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    // staticFolder: '/static',
    // mySecret: process.env.MY_SECRET // Pass through env variables
  },

  //放在最前面 发生警告 提示loader加载顺序问题
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
});

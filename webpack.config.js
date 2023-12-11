const path = require('path');

module.exports = {
  entry: './server.js', // Your main entry file
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory (it will be created if it doesn't exist)
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      url: require.resolve('url/'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      fs: false,
      buffer: require.resolve('buffer/'),
      querystring: require.resolve('querystring-es3/'),
      http: require.resolve('stream-http'),
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert/'),
      crypto: require.resolve('crypto-browserify'),
      https: require.resolve('https-browserify'),
      // os: require.resolve('os-browserify/browser'),
      net: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the following rules to .js files
        exclude: /node_modules/, // Don't apply to files in the node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel for transpiling JavaScript
          options: {
            presets: ['@babel/preset-env'], // Use the @babel/preset-env preset
          },
        },
      },
    ],
  },
};
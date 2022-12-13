const path = require('path');

module.exports = {
  entry: './src/play/index',
  devtool: 'source-map',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js', 'jsx'],
      fallback: { "url": require.resolve("url/") },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  devServer: {
    host: 'localhost',
    port: 4000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
        stats: 'errors-warnings',
        publicPath: '/static/',
    },
  },
};


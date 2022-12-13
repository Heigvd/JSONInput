const path = require('path');

module.exports = {
  entry: './src/index.ts',
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
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/',
    library: {
        type: 'commonjs2',
    }
  },
  externals: {
    "react": "react",
    "react-dom": "react-dom"
  }
};


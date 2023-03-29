const path = require('path');

module.exports = {
  mode: 'production',
  watch: false,
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: false, //'eval-source-map'
  output: {
    library: 'KnockKnock',
    libraryTarget: 'umd',
    libraryExport : "default",
    umdNamedDefine: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
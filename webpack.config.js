const path = require('path');

module.exports = {
  mode: 'production',//development/production
  watch: false,
  entry: './src/index.ts',
  // devServer:{
  //   static: path.resolve(__dirname),
  //   port: 4000,
  //   open: true,
  //   hot: true
  // },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: false, //'eval-source-map'
  output: {
    library: 'KnockKnock',
    libraryTarget: 'umd',
    libraryExport : "default",
    umdNamedDefine: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
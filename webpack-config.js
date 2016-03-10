var webpack = require('webpack');
var path = require('path');

function entry(options) {
  var entry = {
    app: ['./app/js/index.jsx'],
    "../sw": './app/js/sw.js'
  };

  //If devserver is enabled, bundle the webpack client into the app bundle
  if (options.devserver === true) {
    entry.app.push('webpack-dev-server/client?http://' + options.webpackHost + ':' + options.webpackPort);
  }

  return entry;
}

function externals(options) {
  return {
    "react" : "React",
    "react-dom" : "React"
  };
}

function plugins(options) {
  var plugins = [];

  if (options.minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  }

  plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = function(options) {

  return {
    entry : entry(options),

    devtool : 'source-map',
    
    output : {
      filename : '[name].min.js',
      publicPath :'/assets/',
      sourceMapFilename : '[file].map',
      path : path.join(__dirname,'./server/public/bundle')
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets:['react', 'es2015']
          }
        }
      ]
    },

    resolve: {
      extensions: ['', '.js', '.jsx'],
      fallback: [path.join(__dirname, 'node_modules')]
    },

    resolveLoader: {
      fallback: [path.join(__dirname, 'node_modules')]
    },

    externals: externals(options),
    plugins: plugins(options),

  };
};

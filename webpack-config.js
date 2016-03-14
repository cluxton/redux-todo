var webpack = require('webpack');
var path = require('path');

function entry(options) {
  var entry = {
    app: ['./app/js/index.jsx'],

    //npm modules to be included in common "vendor" bundle
    vendor: [
      'react',
      'react-dom',
      'redux',
      'redux-thunk'
    ]
  };

  //If devserver is enabled, bundle the webpack client into the app bundle
  if (options.devserver === true) {
    entry.app.push('webpack-dev-server/client?http://' + options.webpackHost + ':' + options.webpackPort);
  }

  return entry;
}

function externals(options) {
  return { };
}

function plugins(options) {
  var plugins = [];

  if (options.minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  }

  plugins.push(new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js"))

  if (options.env) {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + options.env + '"'
    }))
  }
  
  plugins.push(new webpack.NoErrorsPlugin());

  return plugins;
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

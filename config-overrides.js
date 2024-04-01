module.exports = function override(config, env) {
  // Override the Webpack config here.
  config.resolve.fallback = {
    ...config.resolve.fallback,
    querystring: require.resolve('querystring-es3'),
    https: require.resolve('https-browserify')
  };

  return config;
};

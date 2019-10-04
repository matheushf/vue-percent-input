module.exports = {
  configureWebpack: (config) => {
    config.externals = {
      'v-money': 'v-money',
    };
  },
};

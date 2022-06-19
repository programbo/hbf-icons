module.exports = {
  template: require('./svgr.template'),
  ext: 'tsx',
  prettierConfig: {
    parser: 'typescript',
  },
  svgoConfig: require('./svgo.config'),
};

module.exports = {
  plugins: [
    'convertStyleToAttrs',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: '(id|style)',
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ 'aria-hidden': 'true' }],
      },
    },
    {
      name: 'preset-default',
      params: {
        overrides: {},
      },
    },
  ],
}

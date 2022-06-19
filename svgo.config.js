module.exports = {
  plugins: [
    'convertStyleToAttrs',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|id|style)',
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ fill: 'currentColor' }, { 'aria-hidden': 'true' }],
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

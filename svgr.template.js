const template = (variables, { tpl }) => {
  return tpl`
import * as React from 'react'

${variables.interfaces};

const ${variables.componentName} = (props: React.SVGProps<SVGSVGElement>): React.ReactElement<React.SVGProps<SVGSVGElement>> => (
  ${variables.jsx}
);

${variables.exports};
`;
};

module.exports = template;

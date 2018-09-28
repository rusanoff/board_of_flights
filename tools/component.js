let minimist = require('minimist');
let fs = require('fs');
let path = require('path');
let args = minimist(process.argv.slice(2));
let componentTemplate = `import React, {PureComponent} from 'react';
import './${args.className}.scss';

export default class ${args.className} extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return(
      <div></div>
    );
  }
}
`;

fs.mkdirSync(
  path.resolve(__dirname, '..', 'src', 'components', args.className)
);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'components', args.className, `${args.className}.jsx`),
  componentTemplate,
  {flag: 'w+'}
);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'components', args.className, `${args.className}.scss`),
  '',
  {flag: 'w+'}
);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'components', args.className, 'index.js'),
  `export {default} from './${args.className}';`,
  {flag: 'w+'}
);
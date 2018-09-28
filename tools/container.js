let minimist = require('minimist');
let fs = require('fs');
let path = require('path');
let args = minimist(process.argv.slice(2));
let componentTemplate = `import React, {PureComponent} from 'react';

export default class ${args.className}Container extends PureComponent {
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

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'containers', `${args.className}Container.jsx`),
  componentTemplate,
  {flag: 'w+'}
);
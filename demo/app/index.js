
const profile = require('./profile');

const Greet = ({ profile: { name } }) => React.createElement("span", null, "Hello ",  name, "!");

ReactDOM.render(
  React.createElement(Greet, {profile:  profile }),
  document.getElementById('root')
);
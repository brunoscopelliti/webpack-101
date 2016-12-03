
const profile = require('./profile');

const Greet = ({ profile: { name } }) => <span>Hello { name }!</span>;

ReactDOM.render(
  <Greet profile={ profile } />,
  document.getElementById('root')
);
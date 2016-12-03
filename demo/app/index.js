
import React from 'react';
import { render } from 'react-dom';

import profile from './profile';

const Greet = ({ profile: { name } }) => <span>Hello { name }!</span>;

render(
  <Greet profile={ profile } />,
  document.getElementById('root')
);
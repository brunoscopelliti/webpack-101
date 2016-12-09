
import React from 'react';
import { render } from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { initializeState } from 'state/';

import App from './app';

render(
  <ReduxProvider store={ initializeState() }>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
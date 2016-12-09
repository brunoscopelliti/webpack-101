
import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import { Provider as ReduxProvider } from 'react-redux';
import { initializeState } from 'state/';

import Picker from 'blocks/picker/';
import ProfileForm from 'components/profile-form/';

import App from 'app';


render(
  <ReduxProvider store={ initializeState() }>
    <Router history={ browserHistory }>
      <Route component={ App }>
        <Route path="/" components={{ main: Picker }} />
        <Route path="/edit/:username" components={{ main: ProfileForm  }} />
      </Route>
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
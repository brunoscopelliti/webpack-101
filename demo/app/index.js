
import { AppContainer as HotContainer } from 'react-hot-loader';

import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import { Provider as ReduxProvider } from 'react-redux';
import { initializeState } from 'state/';

import Picker from 'blocks/picker/';
import ProfileForm from 'components/profile-form/';

import App from 'app';


const routes = (
  <Route component={ App }>
    <Route path="/" components={{ main: Picker }} />
    <Route path="/edit/:username" components={{ main: ProfileForm  }} />
  </Route>
);

const reduxStore = initializeState();

function renderApp(){
  render(
    <HotContainer>
      <ReduxProvider store={ reduxStore }>
        <Router history={ browserHistory }>
          { routes }
        </Router>
      </ReduxProvider>
    </HotContainer>,
    document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept(
    [
      'blocks/picker',
      'components/button',
      'components/card',
      'components/github-picker',
      'components/profile-form/'
    ],
    () => {

      const Picker = require('blocks/picker/');
      const Button = require('components/button/');
      const GithubPicker = require('components/github-picker/');
      const Card = require('components/card/');
      const ProfileForm = require('components/profile-form/');

      renderApp();

    }
  );
}
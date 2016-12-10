
import { createStore, combineReducers } from 'redux';

import { updateSelectedUser as selectedUser } from './selectedUser/';
import { setProfile as profile } from './profile/';

export function initializeState(initialState = {}){
  const store = createStore(
    combineReducers({
      selectedUser,
      profile
    }), 
    initialState
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(
      [
        './selectedUser/',
        './profile/'
      ], 
      () => {
        const { updateSelectedUser: selectedUser } = require('./selectedUser/');
        const { setProfile: profile } = require('./profile/');
        store.replaceReducer(combineReducers({
          selectedUser,
          profile
        }));
      }
    );
  }

  return store;
}
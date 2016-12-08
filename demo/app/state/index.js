
import { createStore, combineReducers } from 'redux';

import { updateSelectedUser as selectedUser } from './selectedUser/';
import { setProfile as profile } from './profile/';

export function initializeState(initialState = {}){
  return createStore(
    combineReducers({
      selectedUser,
      profile
    }), 
    initialState
  );
}

import actions from './action-types';

export function setProfile(state = {}, action){
  switch(action.type){
    case actions.SET_PROFILE:
      return Object.assign({}, action.profile);
    case actions.RESET_PROFILE:
      return {};
    default:
      return state;
  }
}
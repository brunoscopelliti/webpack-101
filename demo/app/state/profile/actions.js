
import actions from './action-types';

export function setProfile(profile){
  return {
    type: actions.SET_PROFILE,
    profile
  };
}

export function resetProfile(){
  return {
    type: actions.RESET_PROFILE
  };
}

import actions from './action-types'

export function setSelectedUser(user){
  return {
    type: actions.SET_SELECTED_USER,
    user
  };
}

import actions from './action-types'

export function updateSelectedUser(state = '', action) {
  switch (action.type){
    case actions.SET_SELECTED_USER:
      return action.user;
    default:
      return state;
  }
}
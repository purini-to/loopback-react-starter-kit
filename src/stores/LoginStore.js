import AppDispatcher from '../core/AppDispatcher';
import BaseStore from './BaseStore';

import Type from '../constants/ActionTypes';

class LoginStore extends BaseStore {

  constructor() {
    super();
    // First we register to the Dispatcher to listen for actions.
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._error = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Type.LOGIN_USER:
        this._user = action.user;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  // Just getters for the properties it got from the action.
  get user() {
    return this._user;
  }
  
  get error() {
    return this._error;
  }

  isLoggedIn() {
    return !!this._user;
  }
}
export default new LoginStore();
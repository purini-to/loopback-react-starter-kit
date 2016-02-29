import Location from '../core/Location';
import AppDispatcher from '../core/AppDispatcher';

import Type from '../constants/ActionTypes';

export default {
  /**
   * ログインしたユーザーを通知する
   * @param {object} user ユーザー情報
   */
  loginUser(user) {
      // We save the JWT in localStorage to keep the user authenticated. We’ll learn more about this later.
      localStorage.setItem('token', user.token);
      // Send the action to all stores through the Dispatcher
      AppDispatcher.dispatch({
        actionType: Type.LOGIN_USER,
        user: user
      });
      Location.push('/');
    },
    /**
     * ログインに失敗したユーザーを通知する
     * @param {object} user ユーザーエラー情報
     */
    invalidUser(user) {
      console.log(user);
    }
}
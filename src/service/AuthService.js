import 'babel-polyfill';
import {apiRoot, jsonHeaders} from '../config';

import LoginActions from '../actions/LoginAction';

const API_LOGIN = 'Users/login';

// 認証を行うサービスクラス
class AuthService {

  /**
   * ログイン認証を行う
   * @param {string} username アカウント名
   * @param {string} password パスワード
   */
  async login(username, password) {
    try {
      const response = await fetch(`${apiRoot}/${API_LOGIN}`, {
        method: 'post',
        headers: jsonHeaders,
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const user = await response.json();
      if (response.status == 200) {
        LoginActions.loginUser(user);
      } else {
        LoginActions.invalidUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthService()
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import CardActions from 'material-ui/lib/card/card-actions';

import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';

import Colors from 'material-ui/lib/styles/colors';

import { Form } from 'formsy-react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginForm.scss';

import authService from '../../service/AuthService';

import LoginStore from '../../stores/LoginStore';

const styles = {
  errorStyle: {
    color: Colors.orange600,
  },
};

// ログインフォーム
class LoginForm extends Component {
  /**
   * ステートの初期化
   */
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      loggedKeep: false,
      canSubmit: false
    };
  }
  
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    authService.login(this.state.userName, this.state.password);
  }
  
  enableButton() {
    this.setState({canSubmit: true});
  }
  
  disableButton() {
    this.setState({canSubmit: false});
  }
  
  /**
   * 描画処理
   * @returns {object} ReactViewコンポーネント
   */
  render() {
    return (
      <Form className={s.login} onSubmit={this.login.bind(this)}>
        <TextField
          floatingLabelText="アカウント名"
          type="text"
          valueLink={this.linkState('userName')}
          errorText=""
          errorStyle={styles.errorStyle}
        />
        <TextField
          floatingLabelText="パスワード"
          type="password"
          valueLink={this.linkState('password')}
          errorText=""
          errorStyle={styles.errorStyle}
        />
        <Checkbox
          label="ログイン状態を維持する"
          className={s.chkKeep}
          checkedLink={this.linkState('loggedKeep')}
        />
        <CardActions className={s.loginAction}>
          <RaisedButton
            label="ログイン"
            labelPosition="before"
            primary={true}
            className={s.btnLogin}
            type="submit"
            disabled={!this.state.canSubmit}
          />
        </CardActions>
              </Form>
    );
  }
}

// 双方向バインディングを行うために必要
reactMixin(LoginForm.prototype, LinkedStateMixin);
export default withStyles(LoginForm, s);

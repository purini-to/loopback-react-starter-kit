/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';

import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionInput from 'material-ui/lib/svg-icons/action/input';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';

import Link from '../Link';

const title = 'Log In';

const styles = {
  button: {
    margin: 12,
  },
  padding: {
    paddingTop: 16
  }
};

class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className={s.logo}>Lively</h2>
          <Card>
            <CardText>
              <form className={s.login}>
                <TextField
                  floatingLabelText="アカウント名"
                  type="text"
                />
                <TextField
                  floatingLabelText="パスワード"
                  type="password"
                />
                <Checkbox
                  label="ログイン状態を維持する"
                  style={styles.padding}
                />
                <CardActions className={s.loginAction}>
      <RaisedButton
      label="ログイン"
      labelPosition="before"
      primary={true}
      style={styles.button}
      />
                </CardActions>
              </form>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }

}

export default withStyles(LoginPage, s);

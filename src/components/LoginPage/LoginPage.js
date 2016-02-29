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
import CardText from 'material-ui/lib/card/card-text';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';

import LoginForm from '../LoginForm';

const title = 'ログイン';

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
              <LoginForm />
            </CardText>
          </Card>
        </div>
      </div>
    );
  }

}

export default withStyles(LoginPage, s);

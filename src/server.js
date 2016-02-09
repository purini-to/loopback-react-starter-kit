/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import loopback from 'loopback';
import boot from 'loopback-boot';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port, loopbackRoot } from './config';

const server = global.server = loopback();

//
// Launch the server
// -----------------------------------------------------------------------------
server.start = function() {
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(express.static(path.join(__dirname, 'public')));

  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/api/content', require('./api/content').default);

  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', async (req, res, next) => {
    try {
      let statusCode = 200;
      const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
      const css = [];
      const context = {
        insertCss: styles => css.push(styles._getCss()),
        onSetTitle: value => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => statusCode = 404,
      };

      // URLを前方一致させるために先頭に空白を追加する
      const restUrl = " " + server.get('restApiRoot');
      const url = " " + req.path;
      if (url.indexOf(restUrl) === -1) {
        await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
          data.body = ReactDOM.renderToString(component);
          data.css = css.join('');
        });

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send(`<!doctype html>\n${html}`);
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  });
  
  // start the web server
  return server.listen(port, function() {
    server.emit('started');
    var baseUrl = server.get('url').replace(/\/$/, '');
    console.log(`The server is running at ${baseUrl}/`);
    if (server.get('loopback-component-explorer')) {
      var explorerPath = server.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(server, `${process.cwd()}/${loopbackRoot}`, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    server.start();
});

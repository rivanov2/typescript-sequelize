﻿/// <reference path="./typings/main.d.ts" />

import express = require('express');
import routes = require('./routes/index');
import http = require('http');
import path = require('path');
import Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'root', 'admin');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(() => {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then((jane: any) => {
    console.log(jane.get({
    plain: true
  }));
});
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);

import stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    //app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

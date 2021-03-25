"use strict";

var env = process.env.NODE_ENV;
var MYSQL_CONF;
var REDIS_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Wang@123',
    port: '3306',
    database: 'wystanblog'
  };
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  };
}

if (env === 'production') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Wang@123',
    port: '3306',
    database: 'wystanblog'
  };
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  };
}

module.exports = {
  MYSQL_CONF: MYSQL_CONF,
  REDIS_CONF: REDIS_CONF
};
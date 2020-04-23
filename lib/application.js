'use strict';
const Emitter =  require('events');
const context = require('./context');
const response = require('./response');
const request = require('./request');
const http = require('http');
const compose = require('./compose');


module.exports = class MyKoa extends Emitter {
  constructor() {
    super();

    this.middleware = [];
    this.env = process.env.NODE_ENV || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('fn must be a function');
    }
    this.middleware.push(fn);
    return this;
  }

  listen(...args) {
    return http.createServer(this.callback()).listen(...args);
  }

  callback() {
    const fn  = compose(this.middleware);

    const handleRequest = (req, res) => {
      const context = this.createContext(req, res);
      return this.handleRequest(context, fn);
    };
    return handleRequest;
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    context.req = req;
    context.res = res;
    const response = context.response = Object.create(this.response);
    const request = context.request = Object.create(this.request);
    context.app = this;
    request.req = context.req = req;
    request.res = context.res = res;
    request.ctx = context;
    response.ctx = context;
    response.request = request;
    request.response = response;
    response.req = req;
    response.res = res;
    request.originalurl = req.originalurl;
    return context;
  }

  handleRequest(context, fn) {
    const res = context.res;
    res.statusCode = 404;
    const onerror = err => context.onerror(err);
    const handleResponse = () => respond(context);
    return fn(context).then((res) => {
      console.log(res);
      handleResponse();
    }).catch(onerror);
  }
};

function respond(ctx) {
  const res = ctx.res;
  const body = ctx.body;
  console.log('body res is --- ', body);
  res.end(body);
}

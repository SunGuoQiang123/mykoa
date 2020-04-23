const delegate = require('delegates');
const Cookies = require('cookies');
const COOKIES = Symbol('context#cookies');

const proto = module.exports = {
  get cookies() {
    if (!this[COOKIES]) {
      this[COOKIES] = new Cookies(this.req, this.res, {
        keys: this.app.keys,
        secure: this.request.secure,
      });
    }
    return this[COOKIES];
  },

  set cookies(_cookies) {
    this[COOKIES] = _cookies;
  },

  onerror(err) {

  }
};

delegate(proto, 'response')
  .method('remove')
  .method('set')
  .method('append')
  .access('status')
  .access('body')
  .access('length')
  .getter('headersSent');


delegate(proto, 'request')
  .method('get')
  .access('method')
  .access('query')
  .access('search')
  .access('path')
  .access('url')
  .getter('href')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('header');

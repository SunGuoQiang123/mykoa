const parse = require('parseurl');
const stringfy = require('url').format;
const qs = require('querystring');

module.exports = {
  get url () {
    return this.req.url;
  },
  set url (_url) {
    this.req.url = _url;
  },
  get origin() {
    return `${this.protocol}://${this.host}`;
  },
  get method() {
    return this.req.method;
  },
  set method(val) {
    this.req.method = val;
  },
  get path() {
    return parse(this.req).pathname;
  },
  set path(val) {
    const url = parse(this.req);
    if (url.pathname === val) {
      return;
    }
    url.pathname = val;
    url.path = null;
    this.url = stringfy(url);
  },
  get query() {
    const str = this.querystring;
    const c = this._queryCache = this._queryCache || {};
    return c[str] || (c[str] = qs.parse(str));
  },
  set query(val) {
    this.querystring = qs.stringify(val);
  },
  get querystring() {
    if (!this.req) {
      return '';
    }
    return parse(this.req).query || '';
  },
  set querystring(val) {
    const url = parse(this.req);
    if (url.search === `?${val}`) {
      return;
    }
    url.search = `?${val}`;
    url.path = null;
    this.url = stringify(url);
  },
  get length() {
    const len = this.get('Content-Length');
    if (len === '') return;
    return ~~len;
  },
  get type () {
    const type = this.get('Content-Type');
    if (type === '') {
      return;
    }
    return type.split(';')[0];
  },
  get(field) {
    const req = this.req;
    field = field.toLowercase();
    return req.headers[field] || '';
  }
};

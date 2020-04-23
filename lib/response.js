const statues = require('statuses');

module.exports = {
  get status() {
    return this.res.statusCode;
  },
  set status(code) {
    if (this.headersSent) {
      return;
    }

    this._explicitStatus = true;
    this.res.statusCode = code;
    if (this.req.httpVersionMajor < 2) {
      this.res.statusMessage = statues[code];
    }
    if (this.body && statues.empty[code]) {
      this.body = null;
    }
  },
  get body() {
    return this._body;
  },
  set body(val) {
    const originalBody = this._body;
    this._body = val;
    if (!this._explicitStatus) {
      this.status = 200;
    }
    const setType = !this.header['Content-Type'];
    this.type = 'json';
  },
  get header() {
    const { res } = this;
    return res.getHeaders();
  },
  get headersSent() {
    return this.res.headersSent;
  },
  redirect(url, alt) {
    if (url === 'back') {
      url = this.ctx.get('Referer') || alt || '/';
      this.set('Location', url);
    }
    if (!statues.redirect[this.status]) {
      this.status = 302;
    }
  },
  get length() {
    const len = this.get('Content-Length');
    return Math.trunc(len) || 0;
  },
  set length(num) {
    this.set('Content-Length', num);
  },
  get(key) {
    return this.header[key.toLowerCase()] || '';
  },
  set(key, val) {
    if (this.headersSent) {
      return;
    }
    if (arguments.length === 2) {
      if (Array.isArray(val)) {
        val = val.map(it => typeof it === 'string' ? it : String(it));
      } else {
        val = (typeof val) !== 'string' ? String(val) : val;
      }
      this.res.setHeader(key, val);
    } else {
      for (it in key) {
        this.set(it, key[it]);
      }
    }
  },
  append(key, val) {
    const prev = this.get(key);
    if (prev) {
      val = Array.isArray(prev) ?
            prev.concat(val) : [prev].concat(val);
    }
    this.set(key, val);
  },
  remove(field) {
    if (this.headersSent) {
      return;
    }
    this.res.removeHeader(field);
  }
};

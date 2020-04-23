module.exports = function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('middleware must be a arry');
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('middleware item must be a function');
    }
  }

  return function fnMiddleware(context, next) {
    const len = middleware.length;
    return dispatch(0);
    function dispatch(i) {
      if (i === len) {
        return Promise.resolve();
      }
      const fn = middleware[i];
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    }
  };
};

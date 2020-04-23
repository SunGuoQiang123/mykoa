
function factorial(n, total = 1) {
  if (n <= 1) {
    return 1;
  }
  if (n === 1) {
    return total;
  }
  return factorial(n - 1, total * n);
}

function CodingMan (man) {
  function Man (man) {
    setTimeout(() => {
      console.log(`Hi This is ${man}`);
    }, 0);
  }

  Man.prototype.eat = function(food) {
    setTimeout(() => {
      console.log(`Eat ${food}`);
    }, 0);
    return this;
  };

  Man.prototype.sleep = function(time) {
    const now = new Date();
    const span = time * 1000;
    setTimeout(() => {
      while (new Date() - now < span) { }
      console.log(`Wake up after ${time}s`);
    }, 0);
    return this;
  };

  Man.prototype.sleepFirst = function(time) {
    const now = new Date();
    const span = time * 1000;
    while (new Date() - now < span) { }
    console.log(`Wake up after ${time}s`);
    return this;
  };
}
/**
 * 二分查找数组中指定元素，返回索引
 * @param {Array} arr 待查询数组
 * @param {any} target 目标元素
 */
function bsearch(arr, target) {
  const l = 0;
  const r = arr.length - 1;
  let guess;
  while (l < r) {
    guess = Math.floor((l + r) / 2);
    if (arr[guess] === target) {
      return guess;
    } else if (arr[guess] < target) {
      l = guess + 1;
    } else {
      r = guess - 1;
    }
  }
  return -1;
}

function fibonaqi(n) {
  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  return fibonaqi(n - 2) + fibonaqi(n - 1);
}

function fibonaqi1(n) {
  if (n <= 2) {
    return n - 1;
  }
  let a = 0;
  let b = 0;
  let c = 1;
  for (let i = 3; i <= n; i++) {
    a = b;
    b = c;
    c = a + b;
  }
  return c;
}

Array.prototype.push2 = function(...rest) {
  this.splice(this.length, 0, ...rest);
  return this.length;
};
Array.prototype.pop2 = function() {
  return this.splice(this.legnth - 1, 1)[0];
};

function findSum(arr, sum) {
  const len = arr.length;
  if (len <= 1) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === sum) {
        return [i, j];
      }
    }
  }
  return false;
}

function bigOrder(arr1, arr2) {
  const result = [];
  while (arr1.length && arr2.length) {
    result.push(arr1[0] < arr2[0] ? arr1.shift() : arr2.shift());
  }
  return result.concat(arr1, arr2);
}

function findThreeSum(arr) {
  // arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let sum = arr[i] + arr[j];
      if (arr.includes(sum)) {
        return true;
      }
    }
  }
  return false;
}

String.prototype.repeat = function(num) {
  return Array(num).fill(this).join();
};

function new2(fun) {
  const o = Object.create(fun.prototype);
  const result = fun.call(o);
  return typeof result === 'object' ? result : o;
}

Object._create = function(proto) {
  const Fn = function() {};
  Fn.prototype = proto;
  return new Fn();
};

function curry(fn) {
  const args = [];
  const len = fn.length;
  return function curryFn(arg) {
    args.push(arg);
    if (args.length === len) {
      return fn.apply(this, args);
    } else {
      return curryFn;
    }
  };
}

function curr1(fn) {
   const args = [];
  return function curryFn () {
    if (!arguments.length) {
      return fn.apply(this, args);
    } else {
      args = args.concat(Array.from(arguments));
      return curryFn;
    }
  };
}

function after(fn, time = 1) {
  const args = [];
  let count = 0;
  return function afterFn() {
    count++;
    args.push(...Array.from(arguments));
    if (count === time) {
      return fn.apply(this, args);
    } else {
      return afterFn;
    }
  };
}

function throttle (fn, wait) {
  let startTime = 0;
  return function(...args) {
    let curTime = new Date();
    if (curTime - startTime > wait) {
      startTime = curTime;
      return fn.apply(this, args);
    }
  };
}

function debounce(fn, wait, immediate) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);

      if (immediate) {
        timer = setTimeout(() => {
          timer = null;
        }, wait);
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, wait);
      }
    } else {
      if (immediate) {
        fn.apply(this, args);
        timer = setTimout(() => {
          timer = null;
        }, wait);
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, wait);
      }
    }

    if (immediate && !timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) {
          fn.apply(this, args);
        }
      }, wait);
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(fn, args);
      }, wait);
    }
  };
}

function debounce1(fn, time) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimout(() => {
      fn.apply(this, args);
      timer = null;
    }, time);
  };
}

Array.prototype.reduce = function(fn, initial) {
  let arr = this;
  let acc = initial || arr[0];
  let startIndex = initial ? 0 : 1;
  for(let i = startIndex; i < arr.length; i++) {
    acc = fn.call(this, acc, arr[i], i, arr);
  }
  return acc;
};

Function.prototype._bind = function(context, ...args) {
  const argList = [];
  const fn = this;
  argList.push(...args);
  const fnBound = function(...newArgs) {
    argList.push(...newArgs);
    return fn.apply(this instanceof fnBound ? this : context, argList);
  };
  fnBound.prototype = fn.prototype;
  return fnBound;
};

function compose1(fnList) {
  return function(arg) {
    return fnList.reduce((acc, fn) => {
      return fn(arg);
    }, arg);
  };
}

function compose(middleware) {

  return function(ctx, next) {
    return dispatch(0);
      function dispatch(index) {
        if (index === middleware.length) {
          return Promise.resolve();
        }
        const fn = middleware[index];
        return Promise.resolve(fn(ctx, dispatch.bind(null, index + 1)));
      }
  };
}

function dedupe(str) {
  let res = '';
  for(let i = 0; i < str.length; i++) {
    res[res.length - 1] !== str[i] && (res += str[i]);
  }
  return res;
}

function maxSum(arr) {
  let sum = arr[0] + arr[1];
  for(let i = 1; i < arr.length - 1; i++) {
    let tmp = arr[i] + arr[i + 1];
    if ( tmp > sum) {
      sum = tmp;
    }
  }
  return sum;
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left, right);
}

function mergeSort(arr) {
  if (arr.legnth === 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function quickSort(arr) {
  const index = Math.floor(arr.length / 2);
  const middle = arr[index];
  const left = [];
  const right = [];
  for(let i = 0; i < arr.length; i++) {
    if (i === index) {
      continue;
    }
    if (arr[i] > middle) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat(middle, quickSort(right));
}

function bubbleSort(arr) {
  for(let i = arr.length - 1; i >= 1; i--) {
    for(let j = 0; j <= i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function selectSort(arr) {
  let tmp;
  for(let j = 0; j < arr.length - 1; j++) {
    let minIndex = j;
    for(let i = j + 1; i < arr.length; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
    }
    if (j !== minIndex) {
      tmp = arr[j];
      arr[j] = arr[minIndex];
      arr[minIndex] = tmp;
    }
  }
  return arr;
}

function insertSort(arr) {
  for(let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    for(let j = i; j > 0; j--) {
      if (arr[j - 1] > cur) {
        arr[j] = arr[j - 1];
      } else {
        break;
      }
    }
    arr[j] = cur;
  }
  return arr;
}

function getDup(arr) {
  return arr.filter((it, i, self) => {
    return self.indexOf(it) === i && self.lastIndexOf(it) !== i;
  });
}

function binarySearch(arr, target) {
  let tmp;
  if (!arr.length) {
    return -1;
  }
  const middle = Math.floor(arr.length / 2);
  if (arr[middle] < target) {
    tmp = arr.slice(middle + 1);
    return binarySearch(tmp, target);
  } else if (arr[middle] > target) {
    tmp = arr.slice(0, middle);
    return binarySearch(tmp, target);
  } else if (arr[middle] === target) {
    return middle;
  }
}

function arrBinarySearch(arr, target) {
  let i = 0;
  let j = arr[i].length - 1;
  while(i < arr.length && j >= 0) {
    if (target < arr[i][j]) {
      j--;
    } else if(target > arr[i][j]) {
      i++;
      j = arr[i].length - 1;
    } else {
      return [i, j];
    }
  }
  return false;
}

class NewPromise {
  constructor(fn) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.successCb = [];
    this.failCb = [];
    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }

    function resolve(data) {
      if (that.stauts === 'pending') {
        this.status = 'resolved';
        this.value = data;
        setTimeout(() => {
          for(let fn of this.successCb) {
            fn();
          }
        });
      }
    }

    function reject(reason) {
      if (that.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        setTimeout(() => {
          for(let fn of this.failCb) {
            fn();
          }
        });
      }
    }
  }

  then(resolveCb, rejectCb) {
    return new Promise((resolve, reject) => {
      if (this.stauts === 'resolved') {
        setTimeout(() => {
          try {
            let res = resolveCb(this.value);
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
      }
      if(this.status === 'rejected') {
        setTimeout(() => {
          rejectCb(this.reason);
        });
      }
      if (this.staus === 'pending') {
        this.successCb.push(resolveCb);
        this.failCb.push(rejectCb);
      }
    });
  }
}

new Promise((resolve, reject) => {
  resolve(1);
}).then((data) => {
  let e = Promise.reject(2);
  return 2;
}).catch(err => console.log(err));

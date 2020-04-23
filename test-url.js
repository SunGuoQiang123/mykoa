const { URL, format, parse } = require('url');

const url = new URL('http://sgq:123@baidu.com:9990/name/123/?age=18&place=haerbin#heyi');
console.log('123', JSON.stringify(url, null, 4));

const newUrl = parse(url.href);
console.log(JSON.stringify(newUrl, null, 4));

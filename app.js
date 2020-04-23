// const Koa = require('koa');
const MyKoa = require('./lib/application');

const app = new MyKoa();

app.use(async (ctx, next) => {
  await next();
  console.log('flow back first middleware');
  return 1;
});
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  console.log('flow back second middleware');
  const end = new Date();
  console.log('end time is = ', end);
  console.log('start time is = ', start);
});

app.use(async (ctx, next) => {
  console.log(ctx.req.url);

  ctx.body = JSON.stringify({ name: 'hello world' })
  next();
})

app.listen(3000, () => {
  console.log('app started at port 3000!!');
});

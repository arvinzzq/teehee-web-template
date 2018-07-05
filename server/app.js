import Koa from 'koa';
import routerMiddleware from 'zeass/lib/middleware/router';
import pkgConfig from '../package';

const { name } = pkgConfig;
const APP_PORT = 8888;
const app = new Koa();

app
  .use(routerMiddleware.routes())
  .use(routerMiddleware.allowedMethods());

app.listen(APP_PORT, () => {
  console.log(`${name} is listening on port: ${APP_PORT}`);
});
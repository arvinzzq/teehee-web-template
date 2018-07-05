import Koa from 'koa';
import routerMiddleware from 'zeass/lib/middleware/router';
import renderMiddleware from 'zeass/lib/middleware/render';
import pkgConfig from '../package';

const { name } = pkgConfig;
const APP_PORT = 8888;
const app = new Koa();

app.use(renderMiddleware({
  filters: {
    js: name => `/${name}`,
    css: name => `/${name}`,
    json: JSON.stringify
  }
}));
app.use(routerMiddleware.routes())
app.use(routerMiddleware.allowedMethods());

app.listen(APP_PORT, () => {
  console.log(`${name} is listening on port: ${APP_PORT}`);
});
import Koa from 'koa';
import routerMiddleware from 'zeass/lib/middleware/router';
import renderMiddleware from 'zeass/lib/middleware/render';
import stateMiddleware from 'zeass/lib/middleware/state';
import jsonMiddleware from 'zeass/lib/middleware/json';
import codeMiddleware from 'zeass/lib/middleware/code';
import bodyMiddleware from 'zeass/lib/middleware/body';
import sessionMiddleware from 'zeass/lib/middleware/session';
import xssMiddleware from 'zeass/lib/middleware/xss';
import pkgConfig from '../package';

const { name } = pkgConfig;
const APP_PORT = 8888;
const app = new Koa();

// Set for session
app.keys = [name];

app.use(jsonMiddleware);
app.use(codeMiddleware);
app.use(bodyMiddleware());
app.use(sessionMiddleware());
app.use(stateMiddleware);
app.use(xssMiddleware({ enableStyle: true }));
app.use(renderMiddleware({
  filters: {
    js: name => `/${name}`,
    css: name => `/${name}`,
    json: JSON.stringify
  }
}));
app.use(routerMiddleware.routes());
app.use(routerMiddleware.allowedMethods());

app.listen(APP_PORT, () => {
  console.log(`${name} is listening on port: ${APP_PORT}`);
});
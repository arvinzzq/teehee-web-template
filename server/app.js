import Koa from 'koa';
import ip from 'ip';
import routerMiddleware from 'zeass/lib/middleware/router';
import renderMiddleware from 'zeass/lib/middleware/render';
import stateMiddleware from 'zeass/lib/middleware/state';
import jsonMiddleware from 'zeass/lib/middleware/json';
import codeMiddleware from 'zeass/lib/middleware/code';
import bodyMiddleware from 'zeass/lib/middleware/body';
import sessionMiddleware from 'zeass/lib/middleware/session';
import xssMiddleware from 'zeass/lib/middleware/xss';
import errorMiddleware from './middleware/error';
import pkgConfig from '../package';
import errorConfig from './config/error.json';

const NODE_ENV = process.env.NODE_ENV;
const { name, config } = pkgConfig;
console.log('NODE_ENV -----> ', NODE_ENV);
const APP_PORT = config["development"].port;
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
app.use(errorMiddleware(errorConfig));
app.use(routerMiddleware.routes());
app.use(routerMiddleware.allowedMethods());

const msg = `
${name} started!

    - Local:                http://127.0.0.1:${APP_PORT}
    - On Your Network:      http://${ip.address()}:${APP_PORT}
    `;

app.listen(APP_PORT, () => console.info(msg));
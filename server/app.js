import Koa from 'koa';
import path from 'path';
import ip from 'ip';
import koaStatic from 'koa-static';
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
import JS_CDN from './config/js_version';
import CSS_CDN from './config/css_version';

const NODE_ENV = process.env.NODE_ENV;
const { name, config } = pkgConfig;
const APP_PORT = config[NODE_ENV].port;
const CDN_DOMAIN = 'https://test.com';
const app = new Koa();

// Set for session
app.keys = [name];

app.use(koaStatic(process.cwd()));
app.use(jsonMiddleware);
app.use(codeMiddleware);
app.use(bodyMiddleware());
app.use(sessionMiddleware('redis'));
app.use(stateMiddleware);
app.use(xssMiddleware({ enableStyle: true }));
app.use(renderMiddleware({
  filters: {
    js: name => NODE_ENV === 'development' ? `build/${name}` : `${CDN_DOMAIN}/${JS_CDN[name.split('.js')[0]]}`,
    css: name => NODE_ENV === 'development' ? `build/${name}` : `${CDN_DOMAIN}/${CSS_CDN[name.split('.css')[0]]}`,
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
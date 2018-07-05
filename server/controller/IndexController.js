import Controller from 'zeass/lib/base/controller';
import route from 'zeass/lib/helper/route';
import autobind from 'zeass/lib/helper/autobind'

@autobind
@route.controller()
export default class IndexController extends Controller {
  async httpRequestLog(ctx, next) {
    const url = ctx.request.url;
    const method = ctx.request.method;
    const start = new Date();
    await next();
    const end = new Date();
    this.Logger.info(`[Response] ${method} ${url} ${end.getTime() - start.getTime()}ms`);
  }
}
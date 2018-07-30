import Controller from 'zeass/lib/base/controller';
import route from 'zeass/lib/helper/route';
import autobind from 'zeass/lib/helper/autobind'

@autobind
@route.controller()
export default class IndexController extends Controller {

  @route.get('/')
  @route.get('/home')
  @route.get('/blog')
  async getIndexHtml(ctx) {
    try {
      await ctx.render('index');
    } catch (err) {
      console.error(err);
    }
  }

  async httpRequestLog(ctx, next) {
    const url = ctx.request.url;
    const method = ctx.request.method;
    const startTime = Date.now();
    await next();
    const endTime = Date.now();
    const status = ctx.response.status;
    this.Logger.info(`[Response] ${method} ${url} ${status} ${endTime - startTime}ms`);
  }
}
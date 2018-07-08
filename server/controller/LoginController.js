import Controller from 'zeass/lib/base/controller';
import route from 'zeass/lib/helper/route';
import autobind from 'zeass/lib/helper/autobind'
import UserService from '../service/UserService';

@autobind
@route.controller()
export default class LoginController extends Controller {
  constructor() {
    super();
    this.UserService = new UserService();
  }

  @route.get('/login')
  async getLoginHtml(ctx) {
    try {
      ctx.body = 'hello login ~>';
      // Only for testing
      ctx.session.user = {
        name: 'zhongzhiqiang',
        slogan: '嘿嘿嘿'
      };
      const { redirect } = ctx.query;
      if (redirect) {
        ctx.redirect(redirect);
      }
    } catch(e) {
      console.log(e);
    }
  }

  @route.get('/logout')
  async logout(ctx) {
    try {
      ctx.session = null;
      // ctx.redirect('/login');
    } catch(e) {
      console.log(e);
    }
  }
}
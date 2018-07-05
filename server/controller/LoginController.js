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
    } catch(e) {
      console.log(e);
    }
  }
}
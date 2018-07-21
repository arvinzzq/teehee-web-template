import Controller from 'zeass/lib/base/controller';
import route from 'zeass/lib/helper/route';
import autobind from 'zeass/lib/helper/autobind';
import authorize from 'zeass/lib/helper/authorize';
import UserService from '../service/UserService';
import { csrfSetter, csrfValidator } from '../helper/csrf';

@autobind
@route.controller()
export default class UserController extends Controller {
  constructor() {
    super();
    this.UserService = new UserService();
  }

  @authorize
  @csrfSetter
  @route.get('/user/info')
  async getUserInfo(ctx) {
    try {
      ctx.render('index');
    } catch(e) {
      console.log(e);
    }
  }

  @csrfValidator()
  @route.get('/user/department/id')
  async getUserDeparmentId(ctx) {
    try {
      ctx.json(ctx.CODE.SUCCESS, 'heiheihei');
    } catch(e) {
      console.log(e);
    }
  }

  @route.post('/user/:id')
  async createUser(ctx) {
    try {
      console.log('get user info ~');
    } catch(e) {
      console.log(e);
    }
  }
}
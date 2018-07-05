import Controller from 'zeass/lib/base/controller';
import route from 'zeass/lib/helper/route';
import autobind from 'zeass/lib/helper/autobind'
import UserService from '../service/UserService';

@autobind
@route.controller()
export default class UserController extends Controller {
  constructor() {
    super();
    this.UserService = new UserService();
  }

  @route.get('/user/info')
  async getUserInfo(ctx) {
    try {
      ctx.render('index');
    } catch(e) {
      console.log(e);
    }
  }

  @route.get('/user/department/id')
  async getUserDeparmentId(ctx) {
    try {
      console.log('get user info idididd ~');
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
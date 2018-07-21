import Controller from 'zeass/lib/base/controller';
import route from 'zeass/lib/helper/route';
import autobind from 'zeass/lib/helper/autobind';
import RecordService from '../service/RecordService';

@autobind
@route.controller('/record')
export default class UserController extends Controller {
  constructor() {
    super();
    this.RecordService = new RecordService();
  }

  @route.post('/create')
  async createRecord(ctx) {
    const { title, content, url } = ctx.request.body;
    try {
      const result = await this.RecordService.createRecord({ title, content, url });
      ctx.json(ctx.CODE.SUCCESS, result);
    } catch(err) {
      console.log(err);
      ctx.json(ctx.CODE.ERROR, err);
    }
  }

  @route.get('/:id(\\d+)')
  async findRecordById(ctx) {
    const { id } = ctx.params;
    try {
      const result = await this.RecordService.findRecordById(id);
      ctx.json(ctx.CODE.SUCCESS, result)
    } catch(err) {
      console.log(err);
      ctx.json(ctx.CODE.ERROR, err);
    }
  }

  @route.get('/list')
  async findRecords(ctx) {
    const { page, pageSize } = ctx.query;
    try {
      const result = await this.RecordService.findRecords({ page, pageSize });
      ctx.json(ctx.CODE.SUCCESS, result);
    } catch(err) {
      console.log(err);
      ctx.json(ctx.CODE.ERROR, err);
    }
  }

  @route.delete('/delete/:id(\\d+)')
  async deleteRecord(ctx) {
    const { id } = ctx.params;
    try {
      const result = await this.RecordService.deleteRecord(id);
      ctx.json(ctx.CODE.SUCCESS, result);
    } catch(err) {
      console.log(err);
      ctx.json(ctx.CODE.ERROR, err);
    }
  }
}
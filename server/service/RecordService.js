import Service from 'zeass/lib/base/service';
import Models from '../model';
const { Record } = Models;

export default class Recordervice extends Service {
  async createRecord(data) {
    const { title, content, url } = data;
    return await Record.createRecord({ title, content, url });
  }

  async findRecordById(id) {
    return await Record.findRecordById(id);
  }

  async findRecords(data) {
    const { page, pageSize } = data;
    return await Record.findRecords({ page, pageSize });
  }

  async findAllRecords() {
    return await Record.findAllRecords();
  }

  async deleteRecord(id) {
    return await Record.deleteRecord(id);
  }
}
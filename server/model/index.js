import path from 'path';
import createModel from 'zeass/lib/helper/model';
import mysqlConfig from '../config/mysql';

export default createModel({
  mysqlConfig,
  modelPath: __dirname
});
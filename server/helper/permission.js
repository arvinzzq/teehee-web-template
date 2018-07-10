import { PermissionAsync } from 'zeass/lib/helper/permission';

const fnFetch = () =>  ['user', 'admin', 'developer'];
const successCallback = () => {
  console.log('success callback is invoked ~');
};
const failedCallback = () => {
  console.log('failed callback is invoked ~');
};

export default new PermissionAsync(fnFetch, successCallback, failedCallback);
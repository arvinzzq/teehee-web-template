const fs = require('fs');
const path = require('path');
const pluginName = 'hash-plugin';
function HashPlugin(options = {}) {
  this.options = options
}

// 生成version文件，并且支持根据options参数说明，上传静态资源文件到cdn。
HashPlugin.prototype.apply = function(compiler) {
  const { separator = '_' } = this.options;
  compiler.hooks.emit.tap(pluginName, compilation => {
    const { assets, outputOptions} = compilation;
    console.log('Object.kekek -> ', Object.keys(assets));
    console.log('relative path -> ', path.relative(__dirname, outputOptions.path));
    // const hashArray = Object.keys(assets).map(asset => );
    // console.log('hashArray -> ', hashArray);
    const pathRelative = path.relative(__dirname, outputOptions.path);
    const hashMap = {};
    Object.keys(assets).map(asset => {
      hashMap[asset.split(separator)[0]] = `${pathRelative}/${asset}`;
    });
    console.log('hash map -> ', hashMap);
  });
};

module.exports = HashPlugin;
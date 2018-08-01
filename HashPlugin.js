const fs = require('fs');
const path = require('path');
const pluginName = 'hash-plugin';
const cwd = process.cwd();
function HashPlugin(options = {}) {
  this.options = options
}

function collectHashMap(hashMap, asset, separator, pathRelative, reg) {
  if (reg.test(asset)) {
    hashMap[asset.split(separator)[0]] = `${pathRelative}/${asset}`;
  }
}

// generate version config file
HashPlugin.prototype.apply = function(compiler) {
  const { separator = '_', outputPath = './server/config'} = this.options;
  compiler.hooks.emit.tap(pluginName, compilation => {
    const { assets, outputOptions} = compilation;
    const pathRelative = path.relative(__dirname, outputOptions.path);
    const cssHashMap = {}, jsHashMap = {};
    const jsReg = /^js\//, cssReg = /^css\//;
    Object.keys(assets).map(asset => {
      collectHashMap(cssHashMap, asset, separator, pathRelative, cssReg);
      collectHashMap(jsHashMap, asset, separator, pathRelative, jsReg);
    });
    fs.writeFileSync(path.resolve(cwd, outputPath, './css_version.json'), JSON.stringify(cssHashMap, null, 2));
    fs.writeFileSync(path.resolve(cwd, outputPath, './js_version.json'), JSON.stringify(jsHashMap, null, 2));
    console.info('---> Version file is generated ~');
  });
};

module.exports = HashPlugin;
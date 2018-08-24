const fsExtra = require('fs-extra');
const path = require('path');
const pluginName = 'hash-plugin';
const cwd = process.cwd();
const defaultProcessor = hashMap => JSON.stringify(hashMap, null, 2);

function HashPlugin(options = {}) {
  this.options = options;
}

function collectHashMap(hashMap, asset, separator, pathRelative, reg, prefix = '') {
  if (reg.test(asset)) {
    hashMap[`${prefix}${asset.split(separator)[0]}`] = `${pathRelative}/${asset}`;
  }
}

// generate version config file
HashPlugin.prototype.apply = function (compiler) {
  const {
    separator = '_',
    outputPath = './server/config',
    isMerge = false,
    filename = 'version',
    extension = 'json',
    processor = defaultProcessor,
    prefix
  } = this.options;
  compiler
    .hooks
    .emit
    .tap(pluginName, compilation => {
      const {assets, outputOptions} = compilation;
      const pathRelative = path.relative(__dirname, outputOptions.path);
      const cssHashMap = {};
      const jsHashMap = {};
      const jsReg = /^js\//;
      const cssReg = /^css\//;
      Object
        .keys(assets)
        .map(asset => {
          collectHashMap(cssHashMap, asset, separator, pathRelative, cssReg, prefix);
          collectHashMap(jsHashMap, asset, separator, pathRelative, jsReg, prefix);
        });
      if (isMerge) {
        const hashMap = {
          ...cssHashMap,
          ...jsHashMap
        };
        fsExtra.outputFileSync(path.resolve(cwd, outputPath, `${filename}.${extension}`), processor(hashMap));
      } else {
        fsExtra.outputFileSync(path.resolve(cwd, outputPath, `css_${filename}.${extension}`), processor(cssHashMap));
        fsExtra.outputFileSync(path.resolve(cwd, outputPath, `js_${filename}.${extension}`), processor(jsHashMap));
      }
      console.info('---> Version file is generated ~');
    });
};

module.exports = HashPlugin;

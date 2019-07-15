// https://github.com/isleofcode/vue-cli-plugin-corber
// Function concepts in this file borrowed from isleofcode work above.

// This file was written by Acorn developers
// specifically for Nod-Frontent

const path = require('path');
const fs = require('fs');
const glob = require('glob');

let cordovaJS, cordovaPluginsJS;
let plugins = {};

// let platform = process.env['npm_config_CORBER_PLATFORM'];
let platform = process.argv.includes('--CORBER_PLATFORM=android')
  ? 'android'
  : 'ios';
let basePath = path.join('corber', 'cordova', 'platforms');
basePath = path.join(basePath, platform, 'platform_www');

//Loads cordova JS assets to memory
cordovaJS = fs.readFileSync(path.join(basePath, 'cordova.js'), 'utf-8');
cordovaPluginsJS = fs.readFileSync(
  path.join(basePath, 'cordova_plugins.js'),
  'utf-8'
);

let installedPlugins = glob.sync(path.join(basePath, 'plugins/**/*.js'));
installedPlugins.forEach(plugin => {
  let pluginName = plugin.split('plugins')[1];
  pluginName = path.join('/', 'plugins', pluginName);

  let contents = fs.readFileSync(plugin, 'utf-8');
  plugins[pluginName] = contents;
});

//Intercept Requests - return with our cache if Cordova assets
//eslint-disable-next-line no-unused-vars
function injectCordovaJS() {}

injectCordovaJS = function(req, res, next) {
  return (req, res, next) => {
    if (req.url === '/cordova.js') {
      res.send(cordovaJS);
      return;
    } else if (req.url === '/cordova_plugins.js') {
      res.send(cordovaPluginsJS);
      return;
    } else if (Object.keys(plugins).indexOf(`${req.url}`) > -1) {
      res.send(plugins[req.url]);
    } else {
      next();
    }
  };
};

module.exports = injectCordovaJS;

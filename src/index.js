/**
 * Created by Lukas Reichart on 28/05/15.
 *
 * @purpose   ::  Contains the js-data-asyncstorage adapter. Which is an adapter
 *                that can be used with react-native.
 *
 * @author    ::  Lukas Reichart @ Antum
 * @copyright ::  Antum
 */


var JSData = require('js-data');

var emptyStore = new JSData.DS();
var DSUtils = JSData.DSUtils;
var makePath = DSUtils.makePath;
var deepMixIn = DSUtils.deepMixIn;
var toJson = DSUtils.toJson;
var fromJson = DSUtils.fromJson;
var forEach = DSUtils.forEach;
var removeCircular = DSUtils.removeCircular;
var filter = emptyStore.defaults.defaultFilter;
var omit = require('mout/object/omit');
var guid = require('mout/random/guid');
var keys = require('mout/object/keys');
var compact = require('mout/array/compact' );
var P = DSUtils.Promise;

/**
 * The TestAsyncStorage needs to be used to run the tests. Because there is no
 * easy way to auto test react-native components ( please write me on twitter @lukasreichart )
 * if you now something or create a PR on github.
 * The TestAsyncStorage implements the same interface as react-native AsyncStorage
 * but on top of the browsers local storage. This way we can run our tests in the
 * chrome environment.
 * TODO: find a better testing solution.
 */

// Please uncomment to run the tests.
//class TestAsyncStorage {
//  getItem( key ) {
//    return new P(resolve => {
//      var item = localStorage.getItem( key );
//      resolve( item );
//    });
//  }
//
//  setItem( key, value ) {
//    return new P( resolve => {
//      localStorage.setItem( key, value );
//      resolve();
//    });
//  }
//
//  removeItem( key ) {
//    return new P( resolve => {
//      localStorage.removeItem( key );
//      resolve();
//    });
//  }
//}
//var AsyncStorage = new TestAsyncStorage();

// Remove this to run the tests
var React = require('react-native');
var AsyncStorage = React.AsyncStorage;

class Defaults {
}


Defaults.prototype.basePath = '';

class DSAsyncStorageAdapter {
  constructor(options) {
    options = options || {};
    this.defaults = new Defaults();
    deepMixIn(this.defaults, options);
  }

  getPath(resourceConfig, options) {
    return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.name);
  }

  getIdPath(resourceConfig, options, id) {
    return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.getEndpoint(id, options), id);
  }

  getIds(resourceConfig, options) {
    var ids = {};
    var idsPath = this.getPath(resourceConfig, options);

    return AsyncStorage.getItem(idsPath).then( (idsJson) => {
      if (idsJson) {
        ids = fromJson(idsJson);
        return ids;
      } else {
        return AsyncStorage.setItem(idsPath, toJson({})).then(() => ids );
      }
    });
  }

  saveKeys(ids, resourceConfig, options) {
    return AsyncStorage.setItem(this.getPath(resourceConfig, options), toJson(ids));
  }

  ensureId(id, resourceConfig, options) {
    var _this = this;
    return this.getIds(resourceConfig, options).then( ids => {
      ids[id] = 1;
      return _this.saveKeys(ids, resourceConfig, options);
    });
  }

  removeId(id, resourceConfig, options) {
    var _this = this;
    this.getIds(resourceConfig, options).then( (ids) => {
      delete ids[id];
      return _this.saveKeys(ids, resourceConfig, options);
    });
  }

  GET(key) {
    return AsyncStorage.getItem(key).then( item =>
      item ? fromJson(item) : undefined
    );
  }

  PUT(key, value) {
    var DSAsyncStorageAdapter = this;
    return DSAsyncStorageAdapter.GET(key).then( item => {
      if (item) {
        deepMixIn(item, removeCircular(value));
      }
      return AsyncStorage.setItem(key, toJson(item || value)).then( () =>
        DSAsyncStorageAdapter.GET(key) );
    });
  }

  DEL(key) {
    return AsyncStorage.removeItem(key);
  }

  find(resourceConfig, id, options) {
    return this.GET(this.getIdPath(resourceConfig, options || {}, id)).then(item => !item ? P.reject(new Error('Not Found!')) : item);
  }

  findAll(resourceConfig, params, options) {
    var _this = this;

    options = options || {};
    if (!options.allowSimpleWhere) {
      options.allowSimpleWhere = true;
    }

    return _this.getIds(resourceConfig, options).then( idsMap => {
      var ids = keys(idsMap);
      var tasks = [];

      forEach( ids, id => tasks.push(_this.GET( _this.getIdPath(resourceConfig, options, id) )) );

      return P.all(tasks).then( items => {
        items = compact(items);
        return filter.call( emptyStore, items, resourceConfig.name, params, options );
      });
    });
  }

  create(resourceConfig, attrs, options) {
    var _this = this;
    attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
    options = options || {};

    return _this.PUT(
      makePath(_this.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])),
      omit(attrs, resourceConfig.relationFields || [])
    ).then(item => {
        return _this.ensureId( item[resourceConfig.idAttribute], resourceConfig,
          options ).then(() => item );
      });
  }

  update(resourceConfig, id, attrs, options) {
    var _this = this;
    options = options || {};

    return _this.PUT(_this.getIdPath(resourceConfig, options, id), omit(attrs, resourceConfig.relationFields || [])).then(item => {
      return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig,
        options).then( () => item );
    });
  }

  updateAll(resourceConfig, attrs, params, options) {
    var _this = this;

    return _this.findAll(resourceConfig, params, options).then(items => {
      var tasks = [];
      forEach(items, item => tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], omit(attrs, resourceConfig.relationFields || []), options)));

      return P.all(tasks);
    });
  }

  destroy(resourceConfig, id, options) {
    var _this = this;
    options = options || {};
    return _this.DEL(_this.getIdPath(resourceConfig, options, id)).then(() => _this.removeId(id, resourceConfig.name, options));
  }

  destroyAll(resourceConfig, params, options) {
    var _this = this;

    return _this.findAll(resourceConfig, params, options).then(items => {
      var tasks = [];
      forEach(items, item => tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options)));
      return P.all(tasks);
    });
  }
}

module.exports = DSAsyncStorageAdapter;
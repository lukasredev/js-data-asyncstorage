/*
 * js-data-asyncstorage
 * http://github.com/js-data/js-data-asyncstorage
 *
 * Copyright (c) 2014-2015 Lukas Reichart <http://www.js-data.io/docs/dsasyncstorageadapter>
 * Licensed under the MIT license. <https://github.com/js-data/js-data-asyncstorage/blob/master/LICENSE>
 */
module.exports = function (grunt) {
  'use strict';

  require('jit-grunt')(grunt, {
    coveralls: 'grunt-karma-coveralls'
  });
  require('time-grunt')(grunt);

  var webpack = require('webpack');
  var pkg = grunt.file.readJSON('package.json');
  var banner = 'js-data-asyncstorage\n' +
    '@version ' + pkg.version + ' - Homepage <http://www.js-data.io/docs/dsasyncstorageadapter>\n' +
    '@author Lukas Reichart <lukas.reichart@hotmail.com>\n' +
    '@copyright (c) 2015 Lukas Reichart \n' +
    '@license MIT <https://github.com/lukasreichart/js-data-asyncstorage/blob/master/LICENSE>\n' +
    '\n' +
    '@overview js-data Adapter for react-native AsyncStorage.';

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    clean: {
      coverage: ['coverage/'],
      dist: ['dist/']
    },
    watch: {
      dist: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    },
    uglify: {
      main: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/js-data-asyncstorage.min.map',
          banner: '/*!\n' +
          '* js-data-asyncstorage\n' +
          '* @version <%= pkg.version %> - Homepage <http://www.js-data.io/docs/dsasyncstorageadapter>\n' +
          '* @author Lukas Reichart <lukas.reichart@hotmail.com>\n' +
          '* @copyright (c) 2015 Lukas Reichart\n' +
          '* @license MIT <https://github.com/lukasreichart/js-data-asyncstorage/blob/master/LICENSE>\n' +
          '*\n' +
          '* @overview js-data Adapter for react-native AsyncStorage.\n' +
          '*/\n'
        },
        files: {
          'dist/js-data-asyncstorage.min.js': ['dist/js-data-asyncstorage.js']
        }
      }
    },
    webpack: {
      dist: {
        entry: './src/index.js',
        output: {
          filename: './dist/js-data-asyncstorage.js',
          libraryTarget: 'umd',
          library: 'DSAsyncStorageAdapter'
        },
        externals: {
          'js-data': {
            amd: 'js-data',
            commonjs: 'js-data',
            commonjs2: 'js-data',
            root: 'JSData'
          }
        },
        module: {
          loaders: [
            { test: /(src)(.+)\.js$/, exclude: /node_modules/, loader: 'babel-loader?blacklist=useStrict' }
          ],
          preLoaders: [
            {
              test: /(src)(.+)\.js$|(test)(.+)\.js$/, // include .js files
              exclude: /node_modules/, // exclude any and all files in the node_modules folder
              loader: "jshint-loader?failOnHint=true"
            }
          ]
        },
        plugins: [
          new webpack.BannerPlugin(banner)
        ]
      }
    },
    karma: {
      options: {
        configFile: './karma.conf.js'
      },
      dev: {
        browsers: ['Chrome'],
        autoWatch: true,
        singleRun: false,
        reporters: ['spec'],
        preprocessors: {}
      },
      min: {
        browsers: ['Firefox', 'PhantomJS'],
        options: {
          files: [
            'bower_components/js-data/dist/js-data.min.js',
            'dist/js-data-asyncstorage.min.js',
            'karma.start.js',
            'test/**/*.js'
          ]
        }
      },
      ci: {
        browsers: ['Firefox', 'PhantomJS']
      }
    },
    coveralls: {
      options: {
        coverage_dir: 'coverage'
      }
    }
  });

  grunt.registerTask('version', function (filePath) {
    var file = grunt.file.read(filePath);

    file = file.replace(/<%= pkg\.version %>/gi, pkg.version);

    grunt.file.write(filePath, file);
  });

  grunt.registerTask('test', ['build', 'karma:ci', 'karma:min']);
  grunt.registerTask('build', [
    'clean',
    'webpack',
    'uglify:main'
  ]);
  grunt.registerTask('go', ['build', 'watch:dist']);
  grunt.registerTask('default', ['build']);
};

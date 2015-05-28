<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="64" height="64" />

## js-data-asyncstorage [![bower version](https://img.shields.io/bower/v/js-data-asyncstorage.svg?style=flat-square)](https://www.npmjs.org/package/js-data-asyncstorage) [![npm version](https://img.shields.io/npm/v/js-data-asyncstorage.svg?style=flat-square)](https://www.npmjs.org/package/js-data-asyncstorage) [![Circle CI](https://img.shields.io/circleci/project/js-data/js-data-asyncstorage/master.svg?style=flat-square)](https://circleci.com/gh/js-data/js-data-asyncstorage/tree/master) [![npm downloads](https://img.shields.io/npm/dm/js-data-asyncstorage.svg?style=flat-square)](https://www.npmjs.org/package/js-data-asyncstorage) [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/lukasreichart/js-data-asyncstorage/blob/master/LICENSE)

react-native AsyncStorage adapter for [js-data](http://www.js-data.io/).

### API Documentation
[DSAsyncStorageAdapter](http://www.js-data.io/docs/dsasyncstorageadapter)

### Demo
[https://js-data-asyncstorage.firebaseapp.com/](https://js-data-asyncstorage.firebaseapp.com/)

### Project Status

__Latest Release:__ [![Latest Release](https://img.shields.io/github/release/lukasreichart/js-data-asyncstorage.svg?style=flat-square)](https://github.com/lukasreichart/js-data-asyncstorage/releases)

### Quick Start
`bower install --save js-data js-data-asyncstorage` or `npm install --save js-data js-data-asyncstorage`.

Load `js-data-asyncstorage.js` after `js-data.js`.

```js
var adapter = new DSAsyncStorageAdapter();

var store = new JSData.DS();
store.registerAdapter('asyncstorage', adapter, { default: true });

// "store" will now use the asyncstorage adapter for all async operations
```

### Changelog
[CHANGELOG.md](https://github.com/lukasreichart/js-data-asyncstorage/blob/master/CHANGELOG.md)

### Community
- [Mailing List](https://groups.io/org/groupsio/jsdata) - Ask your questions!
- [Issues](https://github.com/lukasreichart/js-data-asyncstorage/issues) - Found a bug? Feature request? Submit an issue!
- [GitHub](https://github.com/lukasreichart/js-data-asyncstorage) - View the source code for js-data.
- [Contributing Guide](https://github.com/lukasreichart/js-data-asyncstorage/blob/master/CONTRIBUTING.md)

### Contributing

# Contributing Guide

First, support is handled via the [Mailing List](https://groups.io/org/groupsio/jsdata). Ask your questions there.

When submitting issues on GitHub, please include as much detail as possible to make debugging quick and easy.

- good - Your versions of Angular, JSData, etc, relevant console logs/error, code examples that revealed the issue
- better - A [plnkr](http://plnkr.co/), [fiddle](http://jsfiddle.net/), or [bin](http://jsbin.com/?html,output) that demonstrates the issue
- best - A Pull Request that fixes the issue, including test coverage for the issue and the fix

[Github Issues](https://github.com/lukasreichart/js-data-asyncstorage/issues).

#### Pull Requests

1. Contribute to the issue that is the reason you'll be developing in the first place
1. Fork js-data-asyncstorage
1. `git clone https://github.com/<you>/js-data-asyncstorage.git`
1. `cd js-data-asyncstorage; npm install; bower install;`
1. You need to follow the instructions in src/index.js to be able to run the tests without react-native.
1. `grunt go` (builds and starts a watch)
1. (in another terminal) `grunt karma:dev` (runs the tests)
1. Write your code, including relevant documentation and tests
1. Submit a PR and we'll review

### License

This adapter is mainly based on the work of [Jason Dobry](https://github.com/jmdobry)
for the [js-data-localstorage](https://github.com/js-data/js-data-localstorage) adapter.

The MIT License (MIT)

Copyright (c) 2015 Lukas Reichart & Jason Dobry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

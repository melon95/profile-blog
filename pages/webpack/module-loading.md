# 模块加载

以两段很简单的文件为例来看下 `Webpack` 是怎么来实现自定义的模块加载的

**index.js**

```javascript
import test from './test'

test()
```

**test.js**

```javascript
function test() {
  console.log('test')
}

export default test
```

经过 `Webpack` 打包后这两个文件会变成一个大文件 `main.js`，这其中会包括 `Webpack` 的模块加载实现和原本的代码。

要实现一个模块加载必须要有两个东西：模块对象、实现模块加载的函数。

## 模块对象

每一个文件都是一个模块，所以模块对象会有两个模块：`index`、`test`，每个模块都已文件路径作为键名：

```javascript
var webpack_modules = {
  './index.js': (unused_webpack_module, webpack_exports, webpack_require) => {
    eval(
      'webpack_require.r(webpack_exports); var _test__WEBPACK_importED_MODULE_0__ = webpack_require("./test.js");_test__WEBPACK_importED_MODULE_0__["default"]()',
    )
  },

  './test.js': (unused_webpack_module, webpack_exports, webpack_require) => {
    eval(
      'webpack_require.r(webpack_exports); webpack_require.d(webpack_exports, {   "default": () => (WEBPACK_DEFAULT_export) });function test () {  console.log(\'test\')} const WEBPACK_DEFAULT_export = (test);',
    )
  },
}
```

一个模块就是一个函数，类似于 `Commonjs` 会把 `exports`、`require` 作为参数传入，函数内部再利用 `eval` 来执行。比如 `webpack_require("./test.js")` 会加载 `test.js` 返回导出的变量。

## 实现模块加载的函数

`Webpack` 实现模块加载的函数名是 `webpack_require`

```javascript
// 模块缓存对象
var webpack_module_cache = {}

// 模块加载函数
function webpack_require(moduleId) {
  // 检查模块是否已经加载
  var cachedModule = webpack_module_cache[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  //创建一个新的模块并缓存
  var module = (webpack_module_cache[moduleId] = {
    exports: {},
  })

  // 执行模块函数
  webpack_modules[moduleId](module, module.exports, webpack_require)

  // 返回模块导出对象
  return module.exports
}
```

加载模块时传入模块本身、模块导出对象、模块加载函数 `module, module.exports, webpack_require` 作为模块方法的参数 `unused_webpack_module, webpack_exports, webpack_require`。

在模块函数中发现 `Webpack` 还在 `webpack_require` 上还定义了一些工具函数：

```javascript
// 定义export对象中值的获取
webpack_require.d = (exports, definition) => {
  for (var key in definition) {
    if (
      webpack_require.o(definition, key) &&
      !webpack_require.o(exports, key)
    ) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key],
      })
    }
  }
}

// 区分ESMoudle
webpack_require.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  Object.defineProperty(exports, 'esModule', { value: true })
}
```

这两个函数在 `test.js` 模块中都有被使用：

定义这是一个 ES 模块，在 `webpack_exports` 为 `esModule` 赋值为 `true`

```javascript
webpack_require.r(webpack_exports)
```

定义模块中导出值的获取，利用闭包来访问 `WEBPACK_DEFAULT_export`，也就是 `test` 函数

```javascript
webpack_require.d(webpack_exports, {
  default: () => WEBPACK_DEFAULT_export,
})
function test() {
  console.log('test')
}
const WEBPACK_DEFAULT_export = test
```

## 模块加载

当模块对象和实现模块加载的函数都已经实现了后，就只需要通过模块加载函数加载入口模块，然后就会递归的加载所有的模块：

```javascript
webpack_require('./index.js')
```

最后附上完整的 `main.js`

```javascript
/******/ ;(() => {
  // webpackBootstrap
  /******/ 'use strict'
  /******/ var webpack_modules = {
    /***/ './index.js':
      /*!******************!*\
  !*** ./index.js ***!
  \******************/
      /***/ (unused_webpack_module, webpack_exports, webpack_require) => {
        eval(
          'webpack_require.r(webpack_exports); var _test__WEBPACK_importED_MODULE_0__ = webpack_require("./test.js");(0,_test__WEBPACK_importED_MODULE_0__["default"])()',
        )

        /***/
      },

    /***/ './test.js':
      /*!*****************!*\
  !*** ./test.js ***!
  \*****************/
      /***/ (unused_webpack_module, webpack_exports, webpack_require) => {
        eval(
          'webpack_require.r(webpack_exports); webpack_require.d(webpack_exports, {   "default": () => (WEBPACK_DEFAULT_export) });function test () {  console.log(\'test\')} const WEBPACK_DEFAULT_export = (test);',
        )

        /***/
      },

    /******/
  }
  /************************************************************************/
  /******/ // The module cache
  /******/ var webpack_module_cache = {}
  /******/
  /******/ // The require function
  /******/ function webpack_require(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = webpack_module_cache[moduleId]
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (webpack_module_cache[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/ webpack_modules[moduleId](module, module.exports, webpack_require)
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ ;(() => {
    /******/ // define getter functions for harmony exports
    /******/ webpack_require.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          webpack_require.o(definition, key) &&
          !webpack_require.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
          /******/
        }
        /******/
      }
      /******/
    }
    /******/
  })() /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ webpack_require.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
    /******/
  })() /* webpack/runtime/make namespace object */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // define esModule on exports
    /******/ webpack_require.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
        /******/
      }
      /******/ Object.defineProperty(exports, 'esModule', { value: true })
      /******/
    }
    /******/
  })()
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var webpack_exports = webpack_require('./index.js')
  /******/
  /******/
})()
```

## 动态加载

`Webpack` 还支持动态加载： `import('./test.js')`，这会返回一个 `Promise` 值是模块导出对象：

```javascript
import('./test.js').then((module) => {
  module.default() // test
})
```

> import() 特性依赖于内置的 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果想在低版本浏览器中使用 `import()`，记得使用像 [es6-promise](https://github.com/stefanpenner/es6-promise) 或者 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) 这样 polyfill 库，来预先填充(shim) `Promise` 环境。

没有动态加载时打包出来的 `main.js` 只有不到 90 行代码，但是当使用动态加载时代码量会大增到 270 行：

**main.js**

```javascript
;(() => {
  // webpackBootstrap
  var webpack_modules = {
    /***/ './index.js':
      /*!******************!*\
  !*** ./index.js ***!
  \******************/
      /***/ (
        unused_webpack_module,
        __unused_webpack_exports,
        webpack_require,
      ) => {
        eval(
          'webpack_require.e(/*! import() */ "test_js").then(webpack_require.bind(webpack_require, /*! ./test.js */ "./test.js")).then((res) => {\n  res.default()\n})\n\n\n\n//# sourceURL=webpack://webpack-module/./index.js?',
        )

        /***/
      },
  }
  /************************************************************************/
  // The module cache
  var webpack_module_cache = {}

  // The require function
  function webpack_require(moduleId) {
    // Check if module is in cache
    var cachedModule = webpack_module_cache[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    // Create a new module (and put it into the cache)
    var module = (webpack_module_cache[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    })

    // Execute the module function
    webpack_modules[moduleId](module, module.exports, webpack_require)

    // Return the exports of the module
    return module.exports
  }

  // expose the modules object (webpack_modules)
  webpack_require.m = webpack_modules

  /************************************************************************/
  /* webpack/runtime/define property getters */
  ;(() => {
    // define getter functions for harmony exports
    webpack_require.d = (exports, definition) => {
      for (var key in definition) {
        if (
          webpack_require.o(definition, key) &&
          !webpack_require.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
        }
      }
    }
  })()

  /* webpack/runtime/ensure chunk */
  ;(() => {
    webpack_require.f = {}
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    webpack_require.e = (chunkId) => {
      return Promise.all(
        Object.keys(webpack_require.f).reduce((promises, key) => {
          webpack_require.f[key](chunkId, promises)
          return promises
        }, []),
      )
    }
  })()

  /* webpack/runtime/get javascript chunk filename */
  ;(() => {
    // This function allow to reference async chunks
    webpack_require.u = (chunkId) => {
      // return url for filenames based on template
      return '' + chunkId + '.js'
    }
  })()

  /* webpack/runtime/global */
  ;(() => {
    webpack_require.g = (function () {
      if (typeof globalThis === 'object') return globalThis
      try {
        return this || new Function('return this')()
      } catch (e) {
        if (typeof window === 'object') return window
      }
    })()
  })()

  /* webpack/runtime/hasOwnProperty shorthand */
  ;(() => {
    webpack_require.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
  })()

  /* webpack/runtime/load script */
  ;(() => {
    var inProgress = {}
    var dataWebpackPrefix = 'webpack-module:'
    // loadScript function to load a script via script tag
    webpack_require.l = (url, done, key, chunkId) => {
      if (inProgress[url]) {
        inProgress[url].push(done)
        return
      }
      var script, needAttach
      if (key !== undefined) {
        var scripts = document.getElementsByTagName('script')
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i]
          if (
            s.getAttribute('src') == url ||
            s.getAttribute('data-webpack') == dataWebpackPrefix + key
          ) {
            script = s
            break
          }
        }
      }
      if (!script) {
        needAttach = true
        script = document.createElement('script')

        script.charset = 'utf-8'
        script.timeout = 120
        if (webpack_require.nc) {
          script.setAttribute('nonce', webpack_require.nc)
        }
        script.setAttribute('data-webpack', dataWebpackPrefix + key)
        script.src = url
      }
      inProgress[url] = [done]
      var onScriptComplete = (prev, event) => {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null
        clearTimeout(timeout)
        var doneFns = inProgress[url]
        delete inProgress[url]
        script.parentNode && script.parentNode.removeChild(script)
        doneFns && doneFns.forEach((fn) => fn(event))
        if (prev) return prev(event)
      }
      var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: 'timeout',
          target: script,
        }),
        120000,
      )
      script.onerror = onScriptComplete.bind(null, script.onerror)
      script.onload = onScriptComplete.bind(null, script.onload)
      needAttach && document.head.appendChild(script)
    }
  })()

  /* webpack/runtime/make namespace object */
  ;(() => {
    // define esModule on exports
    webpack_require.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      }
      Object.defineProperty(exports, 'esModule', { value: true })
    }
  })()

  /* webpack/runtime/publicPath */
  ;(() => {
    var scriptUrl
    if (webpack_require.g.importScripts)
      scriptUrl = webpack_require.g.location + ''
    var document = webpack_require.g.document
    if (!scriptUrl && document) {
      if (document.currentScript) scriptUrl = document.currentScript.src
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName('script')
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
      }
    }
    // When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
    // or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
    if (!scriptUrl)
      throw new Error('Automatic publicPath is not supported in this browser')
    scriptUrl = scriptUrl
      .replace(/#.*$/, '')
      .replace(/\?.*$/, '')
      .replace(/\/[^\/]+$/, '/')
    webpack_require.p = scriptUrl
  })()

  /* webpack/runtime/jsonp chunk loading */
  ;(() => {
    // no baseURI

    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    var installedChunks = {
      main: 0,
    }

    webpack_require.f.j = (chunkId, promises) => {
      // JSONP chunk loading for javascript
      var installedChunkData = webpack_require.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined
      if (installedChunkData !== 0) {
        // 0 means "already installed".

        // a Promise means "currently loading".
        if (installedChunkData) {
          promises.push(installedChunkData[2])
        } else {
          if (true) {
            // all chunks have JS
            // setup Promise in chunk cache
            var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject]),
            )
            promises.push((installedChunkData[2] = promise))

            // start chunk loading
            var url = webpack_require.p + webpack_require.u(chunkId)
            // create error before stack unwound to get useful stacktrace later
            var error = new Error()
            var loadingEnded = (event) => {
              if (webpack_require.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId]
                if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined
                if (installedChunkData) {
                  var errorType =
                    event && (event.type === 'load' ? 'missing' : event.type)
                  var realSrc = event && event.target && event.target.src
                  error.message =
                    'Loading chunk ' +
                    chunkId +
                    ' failed.\n(' +
                    errorType +
                    ': ' +
                    realSrc +
                    ')'
                  error.name = 'ChunkLoadError'
                  error.type = errorType
                  error.request = realSrc
                  installedChunkData[1](error)
                }
              }
            }
            webpack_require.l(url, loadingEnded, 'chunk-' + chunkId, chunkId)
          } else {
          }
        }
      }
    }

    // no prefetching

    // no preloaded

    // no HMR

    // no HMR manifest

    // no on chunks loaded

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (webpack_require.o(moreModules, moduleId)) {
            webpack_require.m[moduleId] = moreModules[moduleId]
          }
        }
        if (runtime) var result = runtime(webpack_require)
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data)
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i]
        if (
          webpack_require.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]()
        }
        installedChunks[chunkId] = 0
      }
    }

    var chunkLoadingGlobal = (self['webpackChunkwebpack_module'] =
      self['webpackChunkwebpack_module'] || [])
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0))
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
    )
  })()

  /************************************************************************/

  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var webpack_exports = webpack_require('./index.js')
})()
```

当使用动态导入时，模块对象中就只有 `index` 这个模块了，`test` 模块的加载也发生了变化：

```javascript
webpack_require
  .e('test_js')
  .then(webpack_require.bind(webpack_require, './test.js'))
  .then((res) => {
    res.default()
  })
```

`import()` 被转化为了 `webpack_require.e()`

```javascript
webpack_require.f = {}

webpack_require.e = (chunkId) => {
  return Promise.all(
    Object.keys(webpack_require.f).reduce((promises, key) => {
      webpack_require.f[key](chunkId, promises)
      return promises
    }, []),
  )
}
```

当加载 `main.js ` 时会通过 `webpack_require.l` 创建一个 `script` 标签来加载 `test.js`

动态加载 `test.js` 分为以下几步：

1. 初始化 `self["webpackChunkwebpack_module"] = []` 并重写 `push` 方法为 `webpackJsonpCallback`
2. `webpack_require.e('test_js')`
3. `webpack_require.f.j('test_js', [])`
4. 创建一个 `Promise` 和拼接 `Script` 的地址请创建 `Script` 节点
5. 加载动态加载的模块，`push` 到 `self["webpackChunkwebpack_module"]` 中，在 `webpackJsonpCallback` 中：往模块对象中添加 `test.js` 模块、完成第 4 步中 `Promise`
6. 第 4 步的 `Promise` 完成 后， `webpack_require.e` 也会完成，通过 `webpack_require('./test.js') ` 来执行的 `test.js` 的源代码，并返回 `test.js` 模块的导出值以便在 `.then` 中调用

**test_js.js**

```javascript
;(self['webpackChunkwebpack_module'] =
  self['webpackChunkwebpack_module'] || []).push([
  ['test_js'],
  {
    /***/ './test.js':
      /*!*****************!*\
  !*** ./test.js ***!
  \*****************/
      /***/ (unused_webpack_module, webpack_exports, webpack_require) => {
        eval(
          'webpack_require.r(webpack_exports);\n/* harmony export */ webpack_require.d(webpack_exports, {\n/* harmony export */   "default": () => (WEBPACK_DEFAULT_export)\n/* harmony export */ });\nfunction test () {\n  console.log(\'test\')\n}\n\n/* harmony default export */ const WEBPACK_DEFAULT_export = (test);\n\n\n//# sourceURL=webpack://webpack-module/./test.js?',
        )

        /***/
      },
  },
])
```

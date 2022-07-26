/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./dist/pages/_app */ \"./node_modules/next/dist/pages/_app.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsdUdBQTZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmVzdC1uZXh0LWV4YW1wbGUvLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanM/NjZlYyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fYXBwJylcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/next/app.js\n");

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nObject.defineProperty(exports, \"AppInitialProps\", ({\n    enumerable: true,\n    get: function() {\n        return _utils.AppInitialProps;\n    }\n}));\nObject.defineProperty(exports, \"NextWebVitalsMetric\", ({\n    enumerable: true,\n    get: function() {\n        return _utils.NextWebVitalsMetric;\n    }\n}));\nexports[\"default\"] = void 0;\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\nvar _utils = __webpack_require__(/*! ../shared/lib/utils */ \"../shared/lib/utils\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\nfunction appGetInitialProps(_) {\n    return _appGetInitialProps.apply(this, arguments);\n}\nfunction _appGetInitialProps() {\n    _appGetInitialProps = /**\n * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.\n * This allows for keeping state between navigation, custom error handling, injecting additional data.\n */ _asyncToGenerator(function*({ Component , ctx  }) {\n        const pageProps = yield (0, _utils).loadGetInitialProps(Component, ctx);\n        return {\n            pageProps\n        };\n    });\n    return _appGetInitialProps.apply(this, arguments);\n}\nvar _Component;\nclass App extends (_Component = _react.default.Component) {\n    render() {\n        const { Component , pageProps  } = this.props;\n        return /*#__PURE__*/ _react.default.createElement(Component, Object.assign({}, pageProps));\n    }\n}\nApp.origGetInitialProps = appGetInitialProps;\nApp.getInitialProps = appGetInitialProps;\nexports[\"default\"] = App; //# sourceMappingURL=_app.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19hcHAuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYkEsOENBQTZDO0lBQ3pDRyxLQUFLLEVBQUUsSUFBSTtDQUNkLEVBQUMsQ0FBQztBQUNISCxtREFBa0Q7SUFDOUNJLFVBQVUsRUFBRSxJQUFJO0lBQ2hCQyxHQUFHLEVBQUUsV0FBVztRQUNaLE9BQU9DLE1BQU0sQ0FBQ0MsZUFBZSxDQUFDO0tBQ2pDO0NBQ0osRUFBQyxDQUFDO0FBQ0hQLHVEQUFzRDtJQUNsREksVUFBVSxFQUFFLElBQUk7SUFDaEJDLEdBQUcsRUFBRSxXQUFXO1FBQ1osT0FBT0MsTUFBTSxDQUFDRSxtQkFBbUIsQ0FBQztLQUNyQztDQUNKLEVBQUMsQ0FBQztBQUNITixrQkFBZSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLElBQUlRLE1BQU0sR0FBR0Msc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsb0JBQU8sQ0FBQyxDQUFDO0FBQ3JELElBQUlOLE1BQU0sR0FBR00sbUJBQU8sQ0FBQyxnREFBcUIsQ0FBQztBQUMzQyxTQUFTQyxrQkFBa0IsQ0FBQ0MsR0FBRyxFQUFFQyxPQUFPLEVBQUVDLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ3ZFLElBQUk7UUFDQSxJQUFJQyxJQUFJLEdBQUdQLEdBQUcsQ0FBQ0ssR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQztRQUN4QixJQUFJakIsS0FBSyxHQUFHa0IsSUFBSSxDQUFDbEIsS0FBSztLQUN6QixDQUFDLE9BQU9tQixLQUFLLEVBQUU7UUFDWk4sTUFBTSxDQUFDTSxLQUFLLENBQUMsQ0FBQztRQUNkLE9BQU87S0FDVjtJQUNELElBQUlELElBQUksQ0FBQ0UsSUFBSSxFQUFFO1FBQ1hSLE9BQU8sQ0FBQ1osS0FBSyxDQUFDLENBQUM7S0FDbEIsTUFBTTtRQUNIcUIsT0FBTyxDQUFDVCxPQUFPLENBQUNaLEtBQUssQ0FBQyxDQUFDc0IsSUFBSSxDQUFDUixLQUFLLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO0tBQzlDO0NBQ0o7QUFDRCxTQUFTUSxpQkFBaUIsQ0FBQ0MsRUFBRSxFQUFFO0lBQzNCLE9BQU8sV0FBVztRQUNkLElBQUlDLElBQUksR0FBRyxJQUFJLEVBQUVDLElBQUksR0FBR0MsU0FBUztRQUNqQyxPQUFPLElBQUlOLE9BQU8sQ0FBQyxTQUFTVCxPQUFPLEVBQUVDLE1BQU0sRUFBRTtZQUN6QyxJQUFJRixHQUFHLEdBQUdhLEVBQUUsQ0FBQ0ksS0FBSyxDQUFDSCxJQUFJLEVBQUVDLElBQUksQ0FBQztZQUM5QixTQUFTWixLQUFLLENBQUNkLEtBQUssRUFBRTtnQkFDbEJVLGtCQUFrQixDQUFDQyxHQUFHLEVBQUVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRSxNQUFNLEVBQUVmLEtBQUssQ0FBQyxDQUFDO2FBQzFFO1lBQ0QsU0FBU2UsTUFBTSxDQUFDYyxHQUFHLEVBQUU7Z0JBQ2pCbkIsa0JBQWtCLENBQUNDLEdBQUcsRUFBRUMsT0FBTyxFQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsTUFBTSxFQUFFLE9BQU8sRUFBRWMsR0FBRyxDQUFDLENBQUM7YUFDekU7WUFDRGYsS0FBSyxDQUFDZ0IsU0FBUyxDQUFDLENBQUM7U0FDcEIsQ0FBQyxDQUFDO0tBQ04sQ0FBQztDQUNMO0FBQ0QsU0FBU3RCLHNCQUFzQixDQUFDdUIsR0FBRyxFQUFFO0lBQ2pDLE9BQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFVLEdBQUdELEdBQUcsR0FBRztRQUNqQ3pCLE9BQU8sRUFBRXlCLEdBQUc7S0FDZixDQUFDO0NBQ0w7QUFDRCxTQUFTRSxrQkFBa0IsQ0FBQ0MsQ0FBQyxFQUFFO0lBQzNCLE9BQU9DLG1CQUFtQixDQUFDUCxLQUFLLENBQUMsSUFBSSxFQUFFRCxTQUFTLENBQUMsQ0FBQztDQUNyRDtBQUNELFNBQVNRLG1CQUFtQixHQUFHO0lBQzNCQSxtQkFBbUIsR0FBRzs7O0dBR3ZCLENBQUNaLGlCQUFpQixDQUFDLFVBQVUsRUFBRWEsU0FBUyxHQUFHQyxHQUFHLEdBQUcsRUFBRTtRQUM5QyxNQUFNQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRW5DLE1BQU0sQ0FBQyxDQUFDb0MsbUJBQW1CLENBQUNILFNBQVMsRUFBRUMsR0FBRyxDQUFDO1FBQ3ZFLE9BQU87WUFDSEMsU0FBUztTQUNaLENBQUM7S0FDTCxDQUFDLENBQUM7SUFDSCxPQUFPSCxtQkFBbUIsQ0FBQ1AsS0FBSyxDQUFDLElBQUksRUFBRUQsU0FBUyxDQUFDLENBQUM7Q0FDckQ7QUFDRCxJQUFJYSxVQUFVO0FBQ2QsTUFBTUMsR0FBRyxTQUFTLENBQUNELFVBQVUsR0FBR2pDLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDOEIsU0FBUyxDQUFDO0lBQ3JETSxNQUFNLEdBQUc7UUFDTCxNQUFNLEVBQUVOLFNBQVMsR0FBR0UsU0FBUyxHQUFHLEdBQUcsSUFBSSxDQUFDSyxLQUFLO1FBQzdDLE9BQU8sYUFBYSxDQUFDcEMsTUFBTSxDQUFDRCxPQUFPLENBQUNzQyxhQUFhLENBQUNSLFNBQVMsRUFBRXZDLE1BQU0sQ0FBQ2dELE1BQU0sQ0FBQyxFQUFFLEVBQUVQLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDOUY7Q0FDSjtBQUNERyxHQUFHLENBQUNLLG1CQUFtQixHQUFHYixrQkFBa0IsQ0FBQztBQUM3Q1EsR0FBRyxDQUFDTSxlQUFlLEdBQUdkLGtCQUFrQixDQUFDO0FBQ3pDbEMsa0JBQWUsR0FBRzBDLEdBQUcsQ0FBQyxDQUV0QixnQ0FBZ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXN0LW5leHQtZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvcGFnZXMvX2FwcC5qcz85NjFkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXBwSW5pdGlhbFByb3BzXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdXRpbHMuQXBwSW5pdGlhbFByb3BzO1xuICAgIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmV4dFdlYlZpdGFsc01ldHJpY1wiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3V0aWxzLk5leHRXZWJWaXRhbHNNZXRyaWM7XG4gICAgfVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3V0aWxzXCIpO1xuZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFwcEdldEluaXRpYWxQcm9wcyhfKSB7XG4gICAgcmV0dXJuIF9hcHBHZXRJbml0aWFsUHJvcHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbmZ1bmN0aW9uIF9hcHBHZXRJbml0aWFsUHJvcHMoKSB7XG4gICAgX2FwcEdldEluaXRpYWxQcm9wcyA9IC8qKlxuICogYEFwcGAgY29tcG9uZW50IGlzIHVzZWQgZm9yIGluaXRpYWxpemUgb2YgcGFnZXMuIEl0IGFsbG93cyBmb3Igb3ZlcndyaXRpbmcgYW5kIGZ1bGwgY29udHJvbCBvZiB0aGUgYHBhZ2VgIGluaXRpYWxpemF0aW9uLlxuICogVGhpcyBhbGxvd3MgZm9yIGtlZXBpbmcgc3RhdGUgYmV0d2VlbiBuYXZpZ2F0aW9uLCBjdXN0b20gZXJyb3IgaGFuZGxpbmcsIGluamVjdGluZyBhZGRpdGlvbmFsIGRhdGEuXG4gKi8gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qKHsgQ29tcG9uZW50ICwgY3R4ICB9KSB7XG4gICAgICAgIGNvbnN0IHBhZ2VQcm9wcyA9IHlpZWxkICgwLCBfdXRpbHMpLmxvYWRHZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCBjdHgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFnZVByb3BzXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIF9hcHBHZXRJbml0aWFsUHJvcHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbnZhciBfQ29tcG9uZW50O1xuY2xhc3MgQXBwIGV4dGVuZHMgKF9Db21wb25lbnQgPSBfcmVhY3QuZGVmYXVsdC5Db21wb25lbnQpIHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgQ29tcG9uZW50ICwgcGFnZVByb3BzICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIHBhZ2VQcm9wcykpO1xuICAgIH1cbn1cbkFwcC5vcmlnR2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzO1xuQXBwLmdldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wcztcbmV4cG9ydHMuZGVmYXVsdCA9IEFwcDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9X2FwcC5qcy5tYXAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiX3V0aWxzIiwiQXBwSW5pdGlhbFByb3BzIiwiTmV4dFdlYlZpdGFsc01ldHJpYyIsImRlZmF1bHQiLCJfcmVhY3QiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsInJlc29sdmUiLCJyZWplY3QiLCJfbmV4dCIsIl90aHJvdyIsImtleSIsImFyZyIsImluZm8iLCJlcnJvciIsImRvbmUiLCJQcm9taXNlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJzZWxmIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiZXJyIiwidW5kZWZpbmVkIiwib2JqIiwiX19lc01vZHVsZSIsImFwcEdldEluaXRpYWxQcm9wcyIsIl8iLCJfYXBwR2V0SW5pdGlhbFByb3BzIiwiQ29tcG9uZW50IiwiY3R4IiwicGFnZVByb3BzIiwibG9hZEdldEluaXRpYWxQcm9wcyIsIl9Db21wb25lbnQiLCJBcHAiLCJyZW5kZXIiLCJwcm9wcyIsImNyZWF0ZUVsZW1lbnQiLCJhc3NpZ24iLCJvcmlnR2V0SW5pdGlhbFByb3BzIiwiZ2V0SW5pdGlhbFByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/next/dist/pages/_app.js\n");

/***/ }),

/***/ "./src/client/ssr/appData.ts":
/*!***********************************!*\
  !*** ./src/client/ssr/appData.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AppDataContext\": () => (/* binding */ AppDataContext)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n// ./src/client/ssr/appData.ts\n\nconst AppDataContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2xpZW50L3Nzci9hcHBEYXRhLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhCQUE4QjtBQUNRO0FBR3RDLE1BQU1DLGNBQWMsR0FBR0Qsb0RBQWEsQ0FBVSxFQUFFLENBQVk7QUFFbEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXN0LW5leHQtZXhhbXBsZS8uL3NyYy9jbGllbnQvc3NyL2FwcERhdGEudHM/ZWYyMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuL3NyYy9jbGllbnQvc3NyL2FwcERhdGEudHNcclxuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBwRGF0YSB9IGZyb20gJ3NyYy9zaGFyZWQvdHlwZXMvYXBwLWRhdGEnO1xyXG5cclxuY29uc3QgQXBwRGF0YUNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEFwcERhdGE+KHt9IGFzIEFwcERhdGEpO1xyXG5cclxuZXhwb3J0IHsgQXBwRGF0YUNvbnRleHQgfTsiXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsIkFwcERhdGFDb250ZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/client/ssr/appData.ts\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _client_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../client/styles/globals.css */ \"./src/client/styles/globals.css\");\n/* harmony import */ var _client_styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_client_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ \"framer-motion\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/app */ \"./node_modules/next/app.js\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var src_client_ssr_appData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/client/ssr/appData */ \"./src/client/ssr/appData.ts\");\n/* harmony import */ var src_shared_utils_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/shared/utils/fetch */ \"./src/shared/utils/fetch.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);\nframer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n// ./src/pages/_app.tsx\n\n\n\n\n\nclass App extends (next_app__WEBPACK_IMPORTED_MODULE_3___default()) {\n    constructor(props){\n        super(props);\n        this.appData = props.pageProps.appData || {};\n        (0,src_shared_utils_fetch__WEBPACK_IMPORTED_MODULE_5__.initializeFetch)(this.appData.basePath);\n    }\n    render() {\n        const { Component , pageProps  } = this.props;\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(src_client_ssr_appData__WEBPACK_IMPORTED_MODULE_4__.AppDataContext.Provider, {\n            value: this.appData,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {\n                exitBeforeEnter: true,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"D:\\\\Proyecto Final\\\\forestoken-template\\\\src\\\\pages\\\\_app.tsx\",\n                    lineNumber: 26,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\Proyecto Final\\\\forestoken-template\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 25,\n                columnNumber: 17\n            }, this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Proyecto Final\\\\forestoken-template\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 24,\n            columnNumber: 13\n        }, this);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBREEsdUJBQXVCO0FBQ2U7QUFDVTtBQUNIO0FBQ1c7QUFFQztBQUV6RCxNQUFNSSxHQUFHLFNBQVNILGlEQUFPO0lBR3JCSSxZQUFZQyxLQUFlLENBQUU7UUFDekIsS0FBSyxDQUFDQSxLQUFLLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQ0MsT0FBTyxHQUFHRCxLQUFLLENBQUNFLFNBQVMsQ0FBQ0QsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUU3Q0osdUVBQWUsQ0FBQyxJQUFJLENBQUNJLE9BQU8sQ0FBQ0UsUUFBUSxDQUFDLENBQUM7S0FDMUM7SUFFREMsTUFBTSxHQUFHO1FBQ0wsTUFBTSxFQUFFQyxTQUFTLEdBQUVILFNBQVMsR0FBRSxHQUFHLElBQUksQ0FBQ0YsS0FBSztRQUUzQyxxQkFDSSw4REFBQ0osMkVBQXVCO1lBQUNXLEtBQUssRUFBRSxJQUFJLENBQUNOLE9BQU87c0JBQ3hDLDRFQUFDUCwwREFBZTtnQkFBQ2MsZUFBZTswQkFDNUIsNEVBQUNILFNBQVM7b0JBQUUsR0FBR0gsU0FBUzs7Ozs7d0JBQUk7Ozs7O29CQUNkOzs7OztnQkFDSSxDQUM1QjtLQUNMO0NBQ0o7QUFFRCxpRUFBZUosR0FBRyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmVzdC1uZXh0LWV4YW1wbGUvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuL3NyYy9wYWdlcy9fYXBwLnRzeFxyXG5pbXBvcnQgXCIuLi9jbGllbnQvc3R5bGVzL2dsb2JhbHMuY3NzXCI7XHJcbmltcG9ydCB7IEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XHJcbmltcG9ydCBOZXh0QXBwLCB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xyXG5pbXBvcnQgeyBBcHBEYXRhQ29udGV4dCB9IGZyb20gJ3NyYy9jbGllbnQvc3NyL2FwcERhdGEnO1xyXG5pbXBvcnQgeyBBcHBEYXRhIH0gZnJvbSAnc3JjL3NoYXJlZC90eXBlcy9hcHAtZGF0YSc7XHJcbmltcG9ydCB7IGluaXRpYWxpemVGZXRjaCB9IGZyb20gJ3NyYy9zaGFyZWQvdXRpbHMvZmV0Y2gnO1xyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgTmV4dEFwcDxBcHBQcm9wcz4ge1xyXG4gICAgYXBwRGF0YTogQXBwRGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogQXBwUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwRGF0YSA9IHByb3BzLnBhZ2VQcm9wcy5hcHBEYXRhIHx8IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGluaXRpYWxpemVGZXRjaCh0aGlzLmFwcERhdGEuYmFzZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IENvbXBvbmVudCwgcGFnZVByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXBwRGF0YUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuYXBwRGF0YX0+XHJcbiAgICAgICAgICAgICAgICA8QW5pbWF0ZVByZXNlbmNlIGV4aXRCZWZvcmVFbnRlcj5cclxuICAgICAgICAgICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cclxuICAgICAgICAgICAgPC9BcHBEYXRhQ29udGV4dC5Qcm92aWRlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7Il0sIm5hbWVzIjpbIkFuaW1hdGVQcmVzZW5jZSIsIk5leHRBcHAiLCJBcHBEYXRhQ29udGV4dCIsImluaXRpYWxpemVGZXRjaCIsIkFwcCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJhcHBEYXRhIiwicGFnZVByb3BzIiwiYmFzZVBhdGgiLCJyZW5kZXIiLCJDb21wb25lbnQiLCJQcm92aWRlciIsInZhbHVlIiwiZXhpdEJlZm9yZUVudGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/shared/constants/env.ts":
/*!*************************************!*\
  !*** ./src/shared/constants/env.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NODE_ENV\": () => (/* binding */ NODE_ENV),\n/* harmony export */   \"PORT\": () => (/* binding */ PORT),\n/* harmony export */   \"isClient\": () => (/* binding */ isClient),\n/* harmony export */   \"isServer\": () => (/* binding */ isServer)\n/* harmony export */ });\n// ./src/shared/constants/env.ts\nconst isServer = \"undefined\" === \"undefined\";\nconst isClient = !isServer;\nconst NODE_ENV = \"development\";\nconst PORT = process.env.PORT || 3000;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hhcmVkL2NvbnN0YW50cy9lbnYudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLGdDQUFnQztBQUN6QixNQUFNQSxRQUFRLEdBQUcsV0FBYSxLQUFLLFdBQVcsQ0FBQztBQUUvQyxNQUFNQyxRQUFRLEdBQUcsQ0FBQ0QsUUFBUSxDQUFDO0FBRTNCLE1BQU1FLFFBQVEsR0FMckIsYUFBYSxDQUtnQztBQUV0QyxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixJQUFJLElBQUksSUFBSSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmVzdC1uZXh0LWV4YW1wbGUvLi9zcmMvc2hhcmVkL2NvbnN0YW50cy9lbnYudHM/NzMzOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuL3NyYy9zaGFyZWQvY29uc3RhbnRzL2Vudi50c1xyXG5leHBvcnQgY29uc3QgaXNTZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJztcclxuXHJcbmV4cG9ydCBjb25zdCBpc0NsaWVudCA9ICFpc1NlcnZlcjtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XHJcbiJdLCJuYW1lcyI6WyJpc1NlcnZlciIsImlzQ2xpZW50IiwiTk9ERV9FTlYiLCJQT1JUIiwicHJvY2VzcyIsImVudiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/shared/constants/env.ts\n");

/***/ }),

/***/ "./src/shared/utils/fetch.ts":
/*!***********************************!*\
  !*** ./src/shared/utils/fetch.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetch\": () => (/* binding */ envAwareFetch),\n/* harmony export */   \"initializeFetch\": () => (/* binding */ initializeFetch)\n/* harmony export */ });\n/* harmony import */ var _constants_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/env */ \"./src/shared/constants/env.ts\");\n// ./src/shared/utils/fetch.ts\n\nconst context = {\n    basePath: \"\"\n};\nconst initializeFetch = (basePath)=>{\n    context.basePath = basePath;\n};\nconst getFetchUrl = (url)=>{\n    if (_constants_env__WEBPACK_IMPORTED_MODULE_0__.isServer) {\n        // на сервере не нужно добавлять basePath - запрос делается не через proxy\n        return url.startsWith(\"/\") ? `http://localhost:${_constants_env__WEBPACK_IMPORTED_MODULE_0__.PORT}${url}` : url;\n    }\n    return url.startsWith(\"/\") ? context.basePath + url : url;\n};\nconst envAwareFetch = (url, options)=>{\n    const fetchUrl = getFetchUrl(url);\n    return fetch(fetchUrl, options).then((res)=>res.json());\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hhcmVkL3V0aWxzL2ZldGNoLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhCQUE4QjtBQUNvQjtBQU1sRCxNQUFNRSxPQUFPLEdBQWlCO0lBQzFCQyxRQUFRLEVBQUUsRUFBRTtDQUNmO0FBRUQsTUFBTUMsZUFBZSxHQUFHLENBQUNELFFBQWdCLEdBQUs7SUFDMUNELE9BQU8sQ0FBQ0MsUUFBUSxHQUFHQSxRQUFRLENBQUM7Q0FDL0I7QUFFRCxNQUFNRSxXQUFXLEdBQUcsQ0FBQ0MsR0FBVyxHQUFLO0lBQ2pDLElBQUlOLG9EQUFRLEVBQUU7UUFDVjtRQUNBLE9BQU9NLEdBQUcsQ0FBQ0MsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUVOLGdEQUFJLENBQUMsRUFBRUssR0FBRyxDQUFDLENBQUMsR0FBR0EsR0FBRyxDQUFDO0tBQ3ZFO0lBRUQsT0FBT0EsR0FBRyxDQUFDQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUdMLE9BQU8sQ0FBQ0MsUUFBUSxHQUFHRyxHQUFHLEdBQUdBLEdBQUcsQ0FBQztDQUM3RDtBQUVELE1BQU1FLGFBQWEsR0FBRyxDQUFDRixHQUFXLEVBQUVHLE9BQThCLEdBQUs7SUFDbkUsTUFBTUMsUUFBUSxHQUFHTCxXQUFXLENBQUNDLEdBQUcsQ0FBQztJQUVqQyxPQUFPSyxLQUFLLENBQUNELFFBQVEsRUFBRUQsT0FBTyxDQUFDLENBQUNHLElBQUksQ0FBQyxDQUFDQyxHQUFHLEdBQUtBLEdBQUcsQ0FBQ0MsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUM3RDtBQUVrRCIsInNvdXJjZXMiOlsid2VicGFjazovL25lc3QtbmV4dC1leGFtcGxlLy4vc3JjL3NoYXJlZC91dGlscy9mZXRjaC50cz9kNjRjIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC4vc3JjL3NoYXJlZC91dGlscy9mZXRjaC50c1xyXG5pbXBvcnQgeyBpc1NlcnZlciwgUE9SVCB9IGZyb20gJy4uL2NvbnN0YW50cy9lbnYnO1xyXG5cclxudHlwZSBGZXRjaENvbnRleHQgPSB7XHJcbiAgICBiYXNlUGF0aDogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgY29udGV4dDogRmV0Y2hDb250ZXh0ID0ge1xyXG4gICAgYmFzZVBhdGg6ICcnLFxyXG59O1xyXG5cclxuY29uc3QgaW5pdGlhbGl6ZUZldGNoID0gKGJhc2VQYXRoOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnRleHQuYmFzZVBhdGggPSBiYXNlUGF0aDtcclxufTtcclxuXHJcbmNvbnN0IGdldEZldGNoVXJsID0gKHVybDogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoaXNTZXJ2ZXIpIHtcclxuICAgICAgICAvLyDQvdCwINGB0LXRgNCy0LXRgNC1INC90LUg0L3Rg9C20L3QviDQtNC+0LHQsNCy0LvRj9GC0YwgYmFzZVBhdGggLSDQt9Cw0L/RgNC+0YEg0LTQtdC70LDQtdGC0YHRjyDQvdC1INGH0LXRgNC10LcgcHJveHlcclxuICAgICAgICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgoJy8nKSA/IGBodHRwOi8vbG9jYWxob3N0OiR7UE9SVH0ke3VybH1gIDogdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1cmwuc3RhcnRzV2l0aCgnLycpID8gY29udGV4dC5iYXNlUGF0aCArIHVybCA6IHVybDtcclxufTtcclxuXHJcbmNvbnN0IGVudkF3YXJlRmV0Y2ggPSAodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJ0aWFsPFJlcXVlc3RJbml0PikgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hVcmwgPSBnZXRGZXRjaFVybCh1cmwpO1xyXG5cclxuICAgIHJldHVybiBmZXRjaChmZXRjaFVybCwgb3B0aW9ucykudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGVudkF3YXJlRmV0Y2ggYXMgZmV0Y2gsIGluaXRpYWxpemVGZXRjaCB9OyJdLCJuYW1lcyI6WyJpc1NlcnZlciIsIlBPUlQiLCJjb250ZXh0IiwiYmFzZVBhdGgiLCJpbml0aWFsaXplRmV0Y2giLCJnZXRGZXRjaFVybCIsInVybCIsInN0YXJ0c1dpdGgiLCJlbnZBd2FyZUZldGNoIiwib3B0aW9ucyIsImZldGNoVXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/shared/utils/fetch.ts\n");

/***/ }),

/***/ "./src/client/styles/globals.css":
/*!***************************************!*\
  !*** ./src/client/styles/globals.css ***!
  \***************************************/
/***/ (() => {



/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("framer-motion");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
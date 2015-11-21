"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _mochaJsdom = require("mocha-jsdom");

var _mochaJsdom2 = _interopRequireDefault(_mochaJsdom);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require("react-addons-test-utils");

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require("../../index");

function noop() {}

describe("redux-component", function () {
  describe("createDispatch", function () {
    (0, _mochaJsdom2["default"])();

    it("should exist", function () {
      (0, _expect2["default"])(_index.createDispatch).toExist();
    });

    it("should have signature of (component, reducer)", function () {
      (0, _expect2["default"])(_index.createDispatch.length).toEqual(2);
    });

    describe("returns function dispatch", function () {
      var mockedComp = undefined;

      beforeEach(function () {
        var mockedReducer = function mockedReducer(state, action) {
          if (state === undefined) state = { value: "INITIAL_STATE" };
          return _extends({}, state, action);
        };

        var MockedComponent = (function (_Component) {
          _inherits(MockedComponent, _Component);

          function MockedComponent() {
            _classCallCheck(this, MockedComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _get(Object.getPrototypeOf(MockedComponent.prototype), "constructor", this).apply(this, args);
            this.dispatch = (0, _index.createDispatch)(this, mockedReducer);
          }

          _createClass(MockedComponent, [{
            key: "render",
            value: function render() {
              return _react2["default"].createElement("div", null);
            }
          }]);

          return MockedComponent;
        })(_react.Component);

        mockedComp = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(MockedComponent, null));
      });

      it("should have initial state from reducer", function () {
        (0, _expect2["default"])(mockedComp.state.value).toEqual("INITIAL_STATE");
      });

      it("should change the component's state by dispatching an action", function (done) {
        (0, _expect2["default"])(mockedComp.state.value).toNotEqual("ANOTHER_VALUE");

        mockedComp.dispatch({
          type: "CHANGE_STATE",
          value: "ANOTHER_VALUE"
        });

        setTimeout(function () {
          (0, _expect2["default"])(mockedComp.state.type).toEqual("CHANGE_STATE");
          (0, _expect2["default"])(mockedComp.state.value).toEqual("ANOTHER_VALUE");
          done();
        });
      });
    });
  });
});
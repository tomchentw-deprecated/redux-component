"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  describe("ReduxComponentMixin", function () {
    (0, _mochaJsdom2["default"])();

    it("should exist", function () {
      (0, _expect2["default"])(_index.ReduxComponentMixin).toExist();
    });

    it("should have signature of (reducer)", function () {
      (0, _expect2["default"])(_index.ReduxComponentMixin.length).toEqual(1);
    });

    it("returns a mixin object", function () {
      var mixin = (0, _index.ReduxComponentMixin)(function () {
        return {};
      });

      (0, _expect2["default"])(mixin.getInitialState).toBeA("function", "and have getInitialState function");
      (0, _expect2["default"])(mixin.componentWillUnmount).toBeA("function", "and have componentWillUnmount function");
    });

    describe("mixed into React.createClass", function () {
      var mockedComp = undefined;

      beforeEach(function () {
        var mockedReducer = function mockedReducer(state, action) {
          if (state === undefined) state = { value: "INITIAL_STATE" };
          return _extends({}, state, action);
        };

        var MockedComponent = _react2["default"].createClass({
          displayName: "MockedComponent",

          mixins: [(0, _index.ReduxComponentMixin)(mockedReducer)],
          render: function render() {
            return _react2["default"].createElement("div", null);
          }
        });

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
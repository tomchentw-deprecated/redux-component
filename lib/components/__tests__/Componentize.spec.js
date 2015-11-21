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

var _redux = require("redux");

var _index = require("../../index");

function noop() {}

describe("React", function () {
  describe("Componentize", function () {
    (0, _mochaJsdom2["default"])();

    it("should exist", function () {
      (0, _expect2["default"])(_index.Componentize).toExist();
    });

    context("when called", function () {
      it("returns a function", function () {
        (0, _expect2["default"])((0, _index.Componentize)()).toBeA("function");
      });

      context("when called with \"render\" function", function () {
        it("returns ReduxComponent, a React.Component class", function () {
          var ReduxComponent = (0, _index.Componentize)()();

          (0, _expect2["default"])(ReduxComponent.prototype).toBeA(_react.Component);
          (0, _expect2["default"])(ReduxComponent.prototype.render).toBeA("function");
        });
      });
    });

    describe("(_1, _2, mapDispatchToLifecycle)", function () {
      it("should contain React.Component lifecycle functions", function () {
        var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
          return {};
        }, noop, noop)();
        var comp = new ReduxComponent();

        (0, _expect2["default"])(comp.componentWillMount).toBeA("function");
        (0, _expect2["default"])(comp.componentDidMount).toBeA("function");
        (0, _expect2["default"])(comp.componentWillReceiveProps).toBeA("function");
        (0, _expect2["default"])(comp.componentWillUpdate).toBeA("function");
        (0, _expect2["default"])(comp.componentDidUpdate).toBeA("function");
        (0, _expect2["default"])(comp.componentWillUnmount).toBeA("function");
      });

      it("should invoke action inside React.Component lifecycle functions", function () {
        var lifecycleCallbacks = {
          componentWillMount: function componentWillMount() {},
          componentDidMount: function componentDidMount() {},
          componentWillReceiveProps: function componentWillReceiveProps() {},
          componentWillUpdate: function componentWillUpdate() {},
          componentDidUpdate: function componentDidUpdate() {},
          componentWillUnmount: function componentWillUnmount() {}
        };

        var spies = Object.keys(lifecycleCallbacks).reduce(function (acc, key) {
          acc[key] = _expect2["default"].spyOn(lifecycleCallbacks, key);
          return acc;
        }, {});

        var mapDispatchToLifecycle = function mapDispatchToLifecycle() {
          return lifecycleCallbacks;
        };

        var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
          return {};
        }, mapDispatchToLifecycle, noop)();
        var comp = new ReduxComponent();

        Object.keys(spies).forEach(function (key) {
          return (0, _expect2["default"])(spies[key]).toNotHaveBeenCalled();
        });

        Object.keys(lifecycleCallbacks).forEach(function (key) {
          return comp[key]();
        });

        Object.keys(spies).forEach(function (key) {
          return (0, _expect2["default"])(spies[key]).toHaveBeenCalled();
        });
      });

      it("should invoke actions with correct arguments in certain React.Component lifecycle functions", function () {
        var lifecycleCallbacks = {
          componentWillMount: function componentWillMount(props) {},
          componentDidMount: function componentDidMount(props) {},
          componentWillReceiveProps: function componentWillReceiveProps(props, nextProps) {},
          componentWillUpdate: function componentWillUpdate(props, nextProps) {},
          componentDidUpdate: function componentDidUpdate(props, prevProps) {},
          componentWillUnmount: function componentWillUnmount(props) {}
        };

        var spies = Object.keys(lifecycleCallbacks).reduce(function (acc, key) {
          acc[key] = _expect2["default"].spyOn(lifecycleCallbacks, key);
          return acc;
        }, {});

        var mapDispatchToLifecycle = function mapDispatchToLifecycle() {
          return lifecycleCallbacks;
        };

        var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
          return {};
        }, mapDispatchToLifecycle, noop)();
        var comp = new ReduxComponent({
          name: "Tom Chen"
        });

        Object.keys(spies).forEach(function (key) {
          return (0, _expect2["default"])(spies[key]).toNotHaveBeenCalled();
        });

        comp.componentWillMount();

        (0, _expect2["default"])(spies.componentWillMount).toHaveBeenCalledWith({
          name: "Tom Chen"
        });

        comp.componentDidMount();

        (0, _expect2["default"])(spies.componentDidMount).toHaveBeenCalledWith({
          name: "Tom Chen"
        });

        comp.componentWillReceiveProps({
          email: "developer@tomchentw.com"
        });

        (0, _expect2["default"])(spies.componentWillReceiveProps).toHaveBeenCalledWith({
          name: "Tom Chen"
        }, {
          email: "developer@tomchentw.com"
        });

        comp.componentWillUpdate({
          email: "developer@tomchentw.com"
        });

        (0, _expect2["default"])(spies.componentWillUpdate).toHaveBeenCalledWith({
          name: "Tom Chen"
        }, {
          email: "developer@tomchentw.com"
        });

        comp.componentDidUpdate({
          age: 0
        });

        (0, _expect2["default"])(spies.componentDidUpdate).toHaveBeenCalledWith({
          name: "Tom Chen"
        }, {
          age: 0
        });

        comp.componentWillUnmount();

        (0, _expect2["default"])(spies.componentWillUnmount).toHaveBeenCalledWith({
          name: "Tom Chen"
        });
      });
    });

    describe("(_1, _2, _3, mapDispatchToActions) with render function", function () {
      context("(_1, _2, _3, mapDispatchToActions)", function () {
        it("should pass actions as third arguments of render", function (done) {
          var mapDispatchToActions = function mapDispatchToActions(dispatch) {
            return {
              customAction: function customAction() {
                dispatch({
                  type: "CUSTOM_ACTION"
                });
              }
            };
          };

          var customActionTriggered = false;

          var render = function render(props, state, actions) {
            (0, _expect2["default"])(actions.customAction).toBeA("function");
            if (!customActionTriggered) {
              // Emulate some event handler triggerd this action.
              setTimeout(function () {
                actions.customAction();
                done();
              });
              customActionTriggered = true;
            }
            return _react2["default"].createElement("div", null);
          };

          var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
            return {};
          }, noop, mapDispatchToActions)(render);

          var comp = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(ReduxComponent, null));
        });
      });

      context("render", function () {
        it("should pass props and null state", function (done) {
          var render = function render(props, state, actions) {
            (0, _expect2["default"])(props).toBeA("object");
            (0, _expect2["default"])(props).toEqual({
              name: "Tom Chen"
            });

            (0, _expect2["default"])(state).toEqual(null);
            done();
            return _react2["default"].createElement("div", null);
          };

          var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
            return undefined;
          }, noop, noop)(render);

          var comp = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(ReduxComponent, {
            name: "Tom Chen"
          }));
        });

        it("should pass props and initial state from reducer", function (done) {
          var render = function render(props, state, actions) {
            (0, _expect2["default"])(props).toBeA("object");
            (0, _expect2["default"])(props).toEqual({
              name: "Tom Chen"
            });

            (0, _expect2["default"])(state).toBeA("object");
            (0, _expect2["default"])(state).toEqual({
              age: 0
            });
            done();
            return _react2["default"].createElement("div", null);
          };

          var initialState = {
            age: 0
          };

          var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
            return initialState;
          }, noop, noop)(render);

          var comp = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(ReduxComponent, {
            name: "Tom Chen"
          }));
        });
      });

      context("dispatch an action", function () {
        it("should update the state and pass in to render", function (done) {
          var mapDispatchToActions = function mapDispatchToActions(dispatch) {
            return {
              getOlder: function getOlder() {
                dispatch({
                  type: "GET_OLDER",
                  age: 1
                });
              }
            };
          };

          var initialRender = true;

          var render = function render(props, state, actions) {
            (0, _expect2["default"])(props).toBeA("object");
            (0, _expect2["default"])(props).toEqual({
              name: "Tom Chen"
            });

            if (initialRender) {
              (0, _expect2["default"])(state).toBeA("object");
              (0, _expect2["default"])(state).toEqual({
                age: 0
              });
              // Emulate some event handler triggerd this action.
              setTimeout(actions.getOlder);

              initialRender = false;
            } else {
              (0, _expect2["default"])(state).toBeA("object");
              (0, _expect2["default"])(state).toEqual({
                age: 1
              });
              done();
            }
            return _react2["default"].createElement("div", null);
          };

          var initialState = {
            age: 0
          };

          var reducer = function reducer(state, action) {
            if (state === undefined) state = initialState;

            if (action.type === "GET_OLDER") {
              return _extends({}, state, {
                age: action.age
              });
            }
            return state;
          };

          var ReduxComponent = (0, _index.Componentize)(_redux.createStore, reducer, noop, mapDispatchToActions)(render);

          var comp = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(ReduxComponent, {
            name: "Tom Chen"
          }));
        });
      });

      it("will clean up Component after unmount", function () {
        var ReduxComponent = (0, _index.Componentize)(_redux.createStore, function () {
          return {};
        }, noop, noop)(function () {
          return _react2["default"].createElement("div", null);
        });

        var div = document.createElement("div");

        var comp = _reactDom2["default"].render(_react2["default"].createElement(ReduxComponent, { name: "Tom Chen" }), div);

        _reactDom2["default"].unmountComponentAtNode(div);

        (0, _expect2["default"])(comp.unsubscribeFromStore).toNotExist();
        (0, _expect2["default"])(comp.eventActions).toNotExist();
        (0, _expect2["default"])(comp.lifecycleActions).toNotExist();
        (0, _expect2["default"])(comp.store).toNotExist();
      });
    });
  });
});
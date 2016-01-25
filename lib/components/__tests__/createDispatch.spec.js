"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable prefer-arrow-callback */

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require("react-addons-test-utils");

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require("../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe("redux-component", function describeReduxComponent() {
  describe("createDispatch", function describeCreateDispatch() {
    it("should exist", function it() {
      (0, _expect2.default)(_index.createDispatch).toExist();
    });

    it("should have signature of (component, reducer)", function it() {
      (0, _expect2.default)(_index.createDispatch.length).toEqual(2);
    });

    describe("returns function dispatch", function describeReturnsFunctionDispatch() {
      var mockedComp = undefined;

      beforeEach(function beforeEachDescribe() {
        var mockedReducer = function mockedReducer() {
          var state = arguments.length <= 0 || arguments[0] === undefined ? { value: "INITIAL_STATE" } : arguments[0];
          var action = arguments[1];
          return _extends({}, state, action);
        };

        var MockedComponent = function (_Component) {
          _inherits(MockedComponent, _Component);

          function MockedComponent() {
            var _Object$getPrototypeO;

            _classCallCheck(this, MockedComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MockedComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));

            _this.dispatch = (0, _index.createDispatch)(_this, mockedReducer);
            return _this;
          }

          _createClass(MockedComponent, [{
            key: "render",
            value: function render() {
              return _react2.default.createElement("div", null);
            }
          }]);

          return MockedComponent;
        }(_react.Component);

        mockedComp = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(MockedComponent, null));
      });

      it("should have initial state from reducer", function it() {
        (0, _expect2.default)(mockedComp.state.value).toEqual("INITIAL_STATE");
      });

      it("should change the component's state by dispatching an action", function it(done) {
        (0, _expect2.default)(mockedComp.state.value).toNotEqual("ANOTHER_VALUE");

        mockedComp.dispatch({
          type: "CHANGE_STATE",
          value: "ANOTHER_VALUE"
        });

        setTimeout(function () {
          (0, _expect2.default)(mockedComp.state.type).toEqual("CHANGE_STATE");
          (0, _expect2.default)(mockedComp.state.value).toEqual("ANOTHER_VALUE");
          done();
        });
      });
    });
  });
});
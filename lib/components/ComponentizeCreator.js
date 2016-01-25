"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createComponentize;

var _createDispatch = require("./createDispatch");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createComponentize(React) {
  var Component = React.Component;

  var NullLifecycleActions = {
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    componentWillReceiveProps: function componentWillReceiveProps() {},
    componentWillUpdate: function componentWillUpdate() {},
    componentDidUpdate: function componentDidUpdate() {},
    componentWillUnmount: function componentWillUnmount() {}
  };

  return function Componentize(createStore, reducer, mapDispatchToLifecycle, mapDispatchToActions) {
    //
    return function createComponent(_render) {
      //
      return function (_Component) {
        _inherits(ReduxComponent, _Component);

        function ReduxComponent() {
          var _Object$getPrototypeO;

          _classCallCheck(this, ReduxComponent);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReduxComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));

          var dispatch = (0, _createDispatch.createDispatchWithStore)(_this, createStore(reducer));

          _this.lifecycleActions = _extends({}, NullLifecycleActions, mapDispatchToLifecycle(dispatch));

          _this.eventActions = mapDispatchToActions(dispatch);
          return _this;
        }

        _createClass(ReduxComponent, [{
          key: "componentWillMount",
          value: function componentWillMount() {
            this.lifecycleActions.componentWillMount(this.props);
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            this.lifecycleActions.componentDidMount(this.props);
          }
        }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps /*: Object*/) {
            this.lifecycleActions.componentWillReceiveProps(this.props, nextProps);
          }
        }, {
          key: "componentWillUpdate",
          value: function componentWillUpdate(nextProps /*: Object*/, nextState /*: Object*/) {
            this.lifecycleActions.componentWillUpdate(this.props, nextProps);
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate(prevProps /*: Object*/, prevState /*: Object*/) {
            this.lifecycleActions.componentDidUpdate(this.props, prevProps);
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.eventActions = null;

            this.lifecycleActions.componentWillUnmount(this.props);
            this.lifecycleActions = null;
          }
        }, {
          key: "render",
          value: function render() {
            return _render(this.props, this.state, this.eventActions);
          }
        }]);

        return ReduxComponent;
      }(Component);
    };
  };
}
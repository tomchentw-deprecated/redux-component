"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports["default"] = createComponentize;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createComponentize(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var NullLifecycleActions = {
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    componentWillReceiveProps: function componentWillReceiveProps() {},
    componentWillUpdate: function componentWillUpdate() {},
    componentDidUpdate: function componentDidUpdate() {},
    componentWillUnmount: function componentWillUnmount() {}
  };

  return function Componentize(createStore, reducer, mapDispatchToLifecycle, mapDispatchToActions) {

    return function createComponent(_render) {

      return (function (_Component) {
        _inherits(ReduxComponent, _Component);

        function ReduxComponent() {
          var _this = this;

          _classCallCheck(this, ReduxComponent);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(ReduxComponent.prototype), "constructor", this).apply(this, args);
          this.store = createStore(reducer);

          this.lifecycleActions = _extends({}, NullLifecycleActions, mapDispatchToLifecycle(this.store.dispatch));

          this.eventActions = mapDispatchToActions(this.store.dispatch);

          this.state = this.store.getState();

          this.unsubscribeFromStore = this.store.subscribe(function () {
            _this.setState(_this.store.getState());
          });
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
          value: function componentWillReceiveProps(nextProps) {
            this.lifecycleActions.componentWillReceiveProps(this.props, nextProps);
          }
        }, {
          key: "componentWillUpdate",
          value: function componentWillUpdate(nextProps, nextState) {
            this.lifecycleActions.componentWillUpdate(this.props, nextProps);
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate(prevProps, prevState) {
            this.lifecycleActions.componentDidUpdate(this.props, prevProps);
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.unsubscribeFromStore();
            this.unsubscribeFromStore = null;

            this.eventActions = null;

            this.lifecycleActions.componentWillUnmount(this.props);
            this.lifecycleActions = null;

            this.store = null;
          }
        }, {
          key: "render",
          value: function render() {
            return _render(this.props, this.state, this.eventActions);
          }
        }]);

        return ReduxComponent;
      })(Component);
    };
  };
}

module.exports = exports["default"];

// TODO: componentWillReceiveProps
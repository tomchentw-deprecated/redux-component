"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _componentsComponentizeCreator = require("./components/ComponentizeCreator");

var _componentsComponentizeCreator2 = _interopRequireDefault(_componentsComponentizeCreator);

var _componentsCreateDispatch = require("./components/createDispatch");

var _componentsCreateDispatch2 = _interopRequireDefault(_componentsCreateDispatch);

var _componentsReduxComponentMixin = require("./components/ReduxComponentMixin");

var _componentsReduxComponentMixin2 = _interopRequireDefault(_componentsReduxComponentMixin);

var Componentize = (0, _componentsComponentizeCreator2["default"])(_react2["default"]);

exports.Componentize = Componentize;
exports.createDispatch = _componentsCreateDispatch2["default"];
exports.ReduxComponentMixin = _componentsReduxComponentMixin2["default"];
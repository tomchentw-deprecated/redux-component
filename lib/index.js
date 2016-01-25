"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxComponentMixin = exports.createDispatch = exports.Componentize = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ComponentizeCreator = require("./components/ComponentizeCreator");

var _ComponentizeCreator2 = _interopRequireDefault(_ComponentizeCreator);

var _createDispatch = require("./components/createDispatch");

var _createDispatch2 = _interopRequireDefault(_createDispatch);

var _ReduxComponentMixin = require("./components/ReduxComponentMixin");

var _ReduxComponentMixin2 = _interopRequireDefault(_ReduxComponentMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable new-cap */

var Componentize = exports.Componentize = (0, _ComponentizeCreator2.default)(_react2.default);

exports.createDispatch = _createDispatch2.default;
exports.ReduxComponentMixin = _ReduxComponentMixin2.default;
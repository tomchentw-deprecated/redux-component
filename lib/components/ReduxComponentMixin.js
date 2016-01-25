"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReduxComponentMixin;

var _redux = require("redux");

function ReduxComponentMixin(reducer) {
  return {
    getInitialState: function getInitialState() {
      var _this = this;

      this.store = (0, _redux.createStore)(reducer);
      this.unsubscribeFromStore = this.store.subscribe(function () {
        _this.setState(_this.store.getState());
      });
      this.dispatch = this.store.dispatch;
      return this.store.getState();
    },
    componentWillUnmount: function componentWillUnmount() {
      this.unsubscribeFromStore();
    }
  };
}
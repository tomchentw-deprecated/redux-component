"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDispatchWithStore = createDispatchWithStore;
exports["default"] = createDispatch;

var _redux = require("redux");

function noop() {}

function createDispatchWithStore(component, store) {
  component.state = store.getState();

  var unsubscribeFromStore = store.subscribe(function () {
    component.setState(store.getState());
  });

  var oldComponentWillUnmount = component.componentWillUnmount || noop;

  component.componentWillUnmount = function () {
    unsubscribeFromStore();
    oldComponentWillUnmount.call(component);
  };

  return store.dispatch;
}

function createDispatch(component, reducer) {
  return createDispatchWithStore(component, (0, _redux.createStore)(reducer));
}
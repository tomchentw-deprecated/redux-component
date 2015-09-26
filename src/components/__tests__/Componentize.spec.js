import {
  default as expect,
} from "expect";

import {
  default as jsdom,
} from "mocha-jsdom";
// TODO: React@0.14
import {
  default as React,
  Children,
  PropTypes,
  Component,
} from "react/addons";
// TODO: React@0.14
// import ReactDOM from `react-dom`;
// import TestUtils from `react-addons-test-utils`;
import {
  createStore,
} from "redux";

import {
  Componentize,
} from "../../index";

const {TestUtils} = React.addons;

describe(`React`, () => {
  describe(`Componentize`, () => {
    jsdom();

    it(`should exist`, () => {
      expect(Componentize).toExist();
    });
  });
});

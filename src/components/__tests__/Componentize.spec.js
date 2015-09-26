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

    context(`when called`, () => {
      it(`returns a function`, () => {
        expect(Componentize()).toBeA(`function`);
      });

      context(`when called with "render" function`, () => {
        it(`returns ReduxComponent, a React.Component class`, () => {
          const ReduxComponent = Componentize()();

          expect(ReduxComponent.prototype).toBeA(Component);
          expect(ReduxComponent.prototype.render).toBeA(`function`);
        });
      });
    });

    describe(`(createStore, reducer)`, () => {
      it(`should create redux store inside the constructor of the ReduxComponent`, () => {
        const ReduxComponent = Componentize(createStore, () => ({}))();
        const comp = new ReduxComponent();

        expect(comp.store).toBeA(`object`);
      });
    });
  });
});

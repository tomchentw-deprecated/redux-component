import {
  default as expect,
} from "expect";

import {
  default as jsdom,
} from "mocha-jsdom";

import {
  default as React,
  Children,
  PropTypes,
  Component,
} from "react";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as TestUtils,
} from "react-addons-test-utils";

import {
  ReduxComponentMixin,
} from "../../index";

function noop () {
}

describe(`redux-component`, () => {
  describe(`ReduxComponentMixin`, () => {
    jsdom();

    it(`should exist`, () => {
      expect(ReduxComponentMixin).toExist();
    });

    it(`should have signature of (reducer)`, () => {
      expect(ReduxComponentMixin.length).toEqual(1);
    });

    it(`returns a mixin object`, () => {
      const mixin = ReduxComponentMixin(() => ({}));

      expect(mixin.getInitialState).toBeA(`function`, `and have getInitialState function`);
      expect(mixin.componentWillUnmount).toBeA(`function`, `and have componentWillUnmount function`);
    });

    describe(`mixed into React.createClass`, () => {
      let mockedComp;

      beforeEach(() => {
        const mockedReducer = (state = {value: `INITIAL_STATE`}, action) => ({...state, ...action});

        const MockedComponent = React.createClass({
          mixins: [ReduxComponentMixin(mockedReducer)],
          render () { return <div/>; },
        });

        mockedComp = TestUtils.renderIntoDocument(<MockedComponent />);
      });

      it(`should have initial state from reducer`, () => {
        expect(mockedComp.state.value).toEqual(`INITIAL_STATE`);
      });

      it(`should change the component's state by dispatching an action`, (done) => {
        expect(mockedComp.state.value).toNotEqual(`ANOTHER_VALUE`);

        mockedComp.dispatch({
          type: `CHANGE_STATE`,
          value: `ANOTHER_VALUE`,
        });

        setTimeout(() => {
          expect(mockedComp.state.type).toEqual(`CHANGE_STATE`);
          expect(mockedComp.state.value).toEqual(`ANOTHER_VALUE`);
          done();
        });
      });
    });
  });
});

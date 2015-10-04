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
  createDispatch,
} from "../../index";

function noop () {
}

describe(`redux-component`, () => {
  describe(`createDispatch`, () => {
    jsdom();

    it(`should exist`, () => {
      expect(createDispatch).toExist();
    });

    it(`should have signature of (component, reducer)`, () => {
      expect(createDispatch.length).toEqual(2);
    });

    describe(`returns function dispatch`, () => {
      let mockedComp;

      beforeEach(() => {
        const mockedReducer = (state = {value: `INITIAL_STATE`}, action) => ({...state, ...action});

        class MockedComponent extends Component {
          constructor (...args) {
            super(...args);
            this.dispatch = createDispatch(this, mockedReducer);
          }

          render () { return <div/>; }
        }

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

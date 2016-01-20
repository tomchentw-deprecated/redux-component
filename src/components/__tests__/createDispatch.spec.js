/* eslint-disable func-names */

import {
  default as expect,
} from "expect";

import {
  default as React,
  Component,
} from "react";

import {
  default as TestUtils,
} from "react-addons-test-utils";

import {
  createDispatch,
} from "../../index";

describe(`redux-component`, function () {
  describe(`createDispatch`, function () {
    it(`should exist`, function () {
      expect(createDispatch).toExist();
    });

    it(`should have signature of (component, reducer)`, function () {
      expect(createDispatch.length).toEqual(2);
    });

    describe(`returns function dispatch`, function () {
      let mockedComp;

      beforeEach(function () {
        const mockedReducer = (state = { value: `INITIAL_STATE` }, action) => (
          { ...state, ...action }
        );

        class MockedComponent extends Component {
          constructor(...args) {
            super(...args);
            this.dispatch = createDispatch(this, mockedReducer);
          }

          render() { return <div/>; }
        }

        mockedComp = TestUtils.renderIntoDocument(<MockedComponent />);
      });

      it(`should have initial state from reducer`, function () {
        expect(mockedComp.state.value).toEqual(`INITIAL_STATE`);
      });

      it(`should change the component's state by dispatching an action`, function (done) {
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

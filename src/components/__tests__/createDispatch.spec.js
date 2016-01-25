/* eslint-disable prefer-arrow-callback */

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

describe(`redux-component`, function describeReduxComponent() {
  describe(`createDispatch`, function describeCreateDispatch() {
    it(`should exist`, function it() {
      expect(createDispatch).toExist();
    });

    it(`should have signature of (component, reducer)`, function it() {
      expect(createDispatch.length).toEqual(2);
    });

    describe(`returns function dispatch`, function describeReturnsFunctionDispatch() {
      let mockedComp;

      beforeEach(function beforeEachDescribe() {
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

      it(`should have initial state from reducer`, function it() {
        expect(mockedComp.state.value).toEqual(`INITIAL_STATE`);
      });

      it(`should change the component's state by dispatching an action`, function it(done) {
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

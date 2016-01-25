/* eslint-disable prefer-arrow-callback */
/* eslint-disable new-cap */

import {
  default as expect,
} from "expect";

import {
  default as React,
} from "react";

import {
  default as TestUtils,
} from "react-addons-test-utils";

import {
  ReduxComponentMixin,
} from "../../index";

describe(`redux-component`, function describeReduxComponent() {
  describe(`ReduxComponentMixin`, function describeReduxComponentMixin() {
    it(`should exist`, function it() {
      expect(ReduxComponentMixin).toExist();
    });

    it(`should have signature of (reducer)`, function it() {
      expect(ReduxComponentMixin.length).toEqual(1);
    });

    it(`returns a mixin object`, function it() {
      const mixin = ReduxComponentMixin(() => ({}));

      expect(mixin.getInitialState).toBeA(`function`, `and have getInitialState function`);
      expect(mixin.componentWillUnmount).toBeA(
        `function`, `and have componentWillUnmount function`
      );
    });

    describe(`mixed into React.createClass`, function describeMixedIntoReactCreateClass() {
      let mockedComp;

      beforeEach(function beforeEachDescribe() {
        const mockedReducer = (state = { value: `INITIAL_STATE` }, action) => (
          { ...state, ...action }
        );

        /* eslint-disable react/prefer-es6-class */
        const MockedComponent = React.createClass({
          mixins: [ReduxComponentMixin(mockedReducer)],
          render() { return <div/>; },
        });
        /* eslint-enable react/prefer-es6-class */

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

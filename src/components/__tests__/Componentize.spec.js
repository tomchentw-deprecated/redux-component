/* eslint-disable prefer-arrow-callback */
/* eslint-disable new-cap */

import {
  default as expect,
} from "expect";

import {
  default as React,
  Component,
} from "react";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as TestUtils,
} from "react-addons-test-utils";

import {
  createStore,
} from "redux";

import {
  Componentize,
} from "../../index";

function noop() {
}

describe(`React`, function describeReact() {
  describe(`Componentize`, function describeComponentize() {
    it(`should exist`, function it() {
      expect(Componentize).toExist();
    });

    context(`when called`, function contextWhenCalled() {
      it(`returns a function`, function it() {
        expect(Componentize()).toBeA(`function`);
      });

      context(`when called with "render" function`, function contextWhenCalledWithRender() {
        it(`returns ReduxComponent, a React.Component class`, function it() {
          const ReduxComponent = Componentize()();

          expect(ReduxComponent.prototype).toBeA(Component);
          expect(ReduxComponent.prototype.render).toBeA(`function`);
        });
      });
    });

    describe(`(_1, _2, mapDispatchToLifecycle)`, function describeMapDispatchToLifecycle() {
      it(`should contain React.Component lifecycle functions`, function it() {
        const ReduxComponent = Componentize(createStore, () => ({}), noop, noop)();
        const comp = new ReduxComponent();

        expect(comp.componentWillMount).toBeA(`function`);
        expect(comp.componentDidMount).toBeA(`function`);
        expect(comp.componentWillReceiveProps).toBeA(`function`);
        expect(comp.componentWillUpdate).toBeA(`function`);
        expect(comp.componentDidUpdate).toBeA(`function`);
        expect(comp.componentWillUnmount).toBeA(`function`);
      });

      it(`should invoke action inside React.Component lifecycle functions`, function it() {
        const lifecycleCallbacks = {
          componentWillMount() {},
          componentDidMount() {},
          componentWillReceiveProps() {},
          componentWillUpdate() {},
          componentDidUpdate() {},
          componentWillUnmount() {},
        };

        const spies = Object.keys(lifecycleCallbacks).reduce((acc, key) => {
          /* eslint-disable no-param-reassign */
          acc[key] = expect.spyOn(lifecycleCallbacks, key);
          /* eslint-enable no-param-reassign */
          return acc;
        }, {});

        const mapDispatchToLifecycle = () => lifecycleCallbacks;

        const ReduxComponent = Componentize(
          createStore, () => ({}), mapDispatchToLifecycle, noop
        )();
        const comp = new ReduxComponent();

        Object.keys(spies).forEach(key =>
          expect(spies[key]).toNotHaveBeenCalled()
        );

        Object.keys(lifecycleCallbacks).forEach(key =>
          comp[key]({}, {})
        );

        Object.keys(spies).forEach(key =>
          expect(spies[key]).toHaveBeenCalled()
        );
      });

      /* eslint-disable max-len */
      it(`should invoke actions with correct arguments in certain Component lifecycle functions`, function it() {
      /* eslint-enable max-len */
        const lifecycleCallbacks = {
          componentWillMount(props) {},
          componentDidMount(props) {},
          componentWillReceiveProps(props, nextProps) {},
          componentWillUpdate(props, nextProps) {},
          componentDidUpdate(props, prevProps) {},
          componentWillUnmount(props) {},
        };

        const spies = Object.keys(lifecycleCallbacks).reduce((acc, key) => {
          /* eslint-disable no-param-reassign */
          acc[key] = expect.spyOn(lifecycleCallbacks, key);
          /* eslint-enable no-param-reassign */
          return acc;
        }, {});

        const mapDispatchToLifecycle = () => lifecycleCallbacks;

        const ReduxComponent = Componentize(
          createStore, () => ({}), mapDispatchToLifecycle, noop
        )();
        const comp = new ReduxComponent({
          name: `Tom Chen`,
        });

        Object.keys(spies).forEach(key =>
          expect(spies[key]).toNotHaveBeenCalled()
        );

        comp.componentWillMount();

        expect(spies.componentWillMount).toHaveBeenCalledWith({
          name: `Tom Chen`,
        });

        comp.componentDidMount();

        expect(spies.componentDidMount).toHaveBeenCalledWith({
          name: `Tom Chen`,
        });

        comp.componentWillReceiveProps({
          email: `developer@tomchentw.com`,
        });

        expect(spies.componentWillReceiveProps).toHaveBeenCalledWith({
          name: `Tom Chen`,
        }, {
          email: `developer@tomchentw.com`,
        });

        comp.componentWillUpdate({
          email: `developer@tomchentw.com`,
        }, {});

        expect(spies.componentWillUpdate).toHaveBeenCalledWith({
          name: `Tom Chen`,
        }, {
          email: `developer@tomchentw.com`,
        });

        comp.componentDidUpdate({
          age: 0,
        }, {});

        expect(spies.componentDidUpdate).toHaveBeenCalledWith({
          name: `Tom Chen`,
        }, {
          age: 0,
        });

        comp.componentWillUnmount();

        expect(spies.componentWillUnmount).toHaveBeenCalledWith({
          name: `Tom Chen`,
        });
      });
    });

    /* eslint-disable max-len */
    describe(`(_1, _2, _3, mapDispatchToActions) with render function`, function describeMapDispatchToActions() {
    /* eslint-enable max-len */
      context(`(_1, _2, _3, mapDispatchToActions)`, function contextMapDispatchToActions() {
        it(`should pass actions as third arguments of render`, function it(done) {
          const mapDispatchToActions = dispatch => ({
            customAction() {
              dispatch({
                type: `CUSTOM_ACTION`,
              });
            },
          });

          let customActionTriggered = false;

          const render = (props, state, actions) => {
            expect(actions.customAction).toBeA(`function`);
            if (!customActionTriggered) {
              // Emulate some event handler triggerd this action.
              setTimeout(() => {
                actions.customAction();
                done();
              });
              customActionTriggered = true;
            }
            return <div />;
          };

          const ReduxComponent = Componentize(
            createStore, () => ({}), noop, mapDispatchToActions
          )(render);

          TestUtils.renderIntoDocument(<ReduxComponent />);
        });
      });

      context(`render`, function contextRender() {
        it(`should pass props and null state`, function it(done) {
          const render = (props, state, actions) => {
            expect(props).toBeA(`object`);
            expect(props).toEqual({
              name: `Tom Chen`,
            });

            expect(state).toEqual(null);
            done();
            return <div />;
          };

          const ReduxComponent = Componentize(createStore, () => undefined, noop, noop)(render);

          TestUtils.renderIntoDocument(
            <ReduxComponent
              name="Tom Chen"
            />
          );
        });

        it(`should pass props and initial state from reducer`, function it(done) {
          const render = (props, state, actions) => {
            expect(props).toBeA(`object`);
            expect(props).toEqual({
              name: `Tom Chen`,
            });

            expect(state).toBeA(`object`);
            expect(state).toEqual({
              age: 0,
            });
            done();
            return <div />;
          };

          const initialState = {
            age: 0,
          };

          const ReduxComponent = Componentize(createStore, () => initialState, noop, noop)(render);

          TestUtils.renderIntoDocument(
            <ReduxComponent
              name="Tom Chen"
            />
          );
        });
      });

      context(`dispatch an action`, function contextDispathAnAction() {
        it(`should update the state and pass in to render`, function it(done) {
          const mapDispatchToActions = dispatch => ({
            getOlder() {
              dispatch({
                type: `GET_OLDER`,
                age: 1,
              });
            },
          });

          let initialRender = true;

          const render = (props, state, actions) => {
            expect(props).toBeA(`object`);
            expect(props).toEqual({
              name: `Tom Chen`,
            });

            if (initialRender) {
              expect(state).toBeA(`object`);
              expect(state).toEqual({
                age: 0,
              });
              // Emulate some event handler triggerd this action.
              setTimeout(actions.getOlder);

              initialRender = false;
            } else {
              expect(state).toBeA(`object`);
              expect(state).toEqual({
                age: 1,
              });
              done();
            }
            return (
              <div />
            );
          };

          const initialState = {
            age: 0,
          };

          const reducer = (state = initialState, action) => {
            if (action.type === `GET_OLDER`) {
              return {
                ...state,
                age: action.age,
              };
            }
            return state;
          };

          const ReduxComponent = Componentize(
            createStore, reducer, noop, mapDispatchToActions
          )(render);

          TestUtils.renderIntoDocument(
            <ReduxComponent
              name="Tom Chen"
            />
          );
        });
      });

      it(`will clean up Component after unmount`, function it() {
        const ReduxComponent = Componentize(createStore, () => ({}), noop, noop)(() => (<div />));

        const div = document.createElement(`div`);

        const comp = ReactDOM.render(
          <ReduxComponent name="Tom Chen" />
        , div);

        ReactDOM.unmountComponentAtNode(div);

        expect(comp.unsubscribeFromStore).toNotExist();
        expect(comp.eventActions).toNotExist();
        expect(comp.lifecycleActions).toNotExist();
        expect(comp.store).toNotExist();
      });
    });
  });
});

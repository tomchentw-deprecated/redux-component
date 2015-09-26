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
  createStore,
} from "redux";

import {
  Componentize,
} from "../../index";

function noop () {
}

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
        const ReduxComponent = Componentize(createStore, () => ({}), noop, noop)();
        const comp = new ReduxComponent();

        expect(comp.store).toBeA(`object`);
      });
    });

    describe(`(_1, _2, mapDispatchToLifecycle)`, () => {
      it(`should contain React.Component lifecycle functions`, () => {
        const ReduxComponent = Componentize(createStore, () => ({}), noop, noop)();
        const comp = new ReduxComponent();

        expect(comp.componentWillMount).toBeA(`function`);
        expect(comp.componentDidMount).toBeA(`function`);
        expect(comp.componentWillReceiveProps).toBeA(`function`);
        expect(comp.componentWillUpdate).toBeA(`function`);
        expect(comp.componentDidUpdate).toBeA(`function`);
        expect(comp.componentWillUnmount).toBeA(`function`);
      });

      it(`should invoke action inside React.Component lifecycle functions`, () => {
        const lifecycleCallbacks = {
          componentWillMount () {},
          componentDidMount () {},
          componentWillReceiveProps () {},
          componentWillUpdate () {},
          componentDidUpdate () {},
          componentWillUnmount () {},
        };

        const spies = Object.keys(lifecycleCallbacks).reduce((acc, key) => {
          acc[key] = expect.spyOn(lifecycleCallbacks, key);
          return acc;
        }, {});

        const mapDispatchToLifecycle = () => lifecycleCallbacks;

        const ReduxComponent = Componentize(createStore, () => ({}), mapDispatchToLifecycle, noop)();
        const comp = new ReduxComponent();

        Object.keys(spies).forEach(key =>
          expect(spies[key]).toNotHaveBeenCalled()
        );

        Object.keys(lifecycleCallbacks).forEach(key =>
          comp[key]()
        );

        Object.keys(spies).forEach(key =>
          expect(spies[key]).toHaveBeenCalled()
        );
      });

      it(`should invoke actions with correct arguments in certain React.Component lifecycle functions`, () => {
        const lifecycleCallbacks = {
          componentWillMount (props) {},
          componentDidMount (props) {},
          componentWillReceiveProps (props, nextProps) {},
          componentWillUpdate (props, nextProps) {},
          componentDidUpdate (props, prevProps) {},
          componentWillUnmount (props) {},
        };

        const spies = Object.keys(lifecycleCallbacks).reduce((acc, key) => {
          acc[key] = expect.spyOn(lifecycleCallbacks, key);
          return acc;
        }, {});

        const mapDispatchToLifecycle = () => lifecycleCallbacks;

        const ReduxComponent = Componentize(createStore, () => ({}), mapDispatchToLifecycle, noop)();
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
        });

        expect(spies.componentWillUpdate).toHaveBeenCalledWith({
          name: `Tom Chen`,
        }, {
          email: `developer@tomchentw.com`,
        });

        comp.componentDidUpdate({
          age: 0,
        });

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
    
    describe(`(_1, _2, _3, mapDispatchToActions) with render function`, () => {
      context(`(_1, _2, _3, mapDispatchToActions)`, () => {
        it(`should pass actions as third arguments of render`, (done) => {
          const mapDispatchToActions = (dispatch) => {
            return {
              customAction () {
                dispatch({
                  type: `CUSTOM_ACTION`,
                });
              },
            };
          };

          const render = (props, state, actions) => {
            expect(actions.customAction).toBeA(`function`);
            done();
          };

          const ReduxComponent = Componentize(createStore, () => ({}), noop, mapDispatchToActions)(render);
          const comp = new ReduxComponent();

          comp.render();
        });
      });

      context(`render`, () => {
        it(`should pass props and undefined state`, (done) => {
          const render = (props, state, actions) => {
            expect(props).toBeA(`object`);
            expect(props).toEqual({
              name: `Tom Chen`,
            });

            expect(state).toBeA(`undefined`);
            done();
          };

          const ReduxComponent = Componentize(createStore, () => undefined, noop, noop)(render);
          const comp = new ReduxComponent({
            name: `Tom Chen`,
          });

          comp.render();
        });

        it(`should pass props and initial state from reducer`, (done) => {
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
          };

          const initialState = {
            age: 0,
          };

          const ReduxComponent = Componentize(createStore, () => initialState, noop, noop)(render);
          const comp = new ReduxComponent({
            name: `Tom Chen`,
          });

          comp.render();
        });
      });

      context(`dispatch an action`, () => {
        it(`should update the state and pass in to render`, (done) => {
          const mapDispatchToActions = (dispatch) => {
            return {
              getOlder () {
                dispatch({
                  type: `GET_OLDER`,
                  age: 1,
                });
              },
            };
          };

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

          const ReduxComponent = Componentize(createStore, reducer, noop, mapDispatchToActions)(render);

          const div = document.createElement(`div`);

          const comp = ReactDOM.render(
            <ReduxComponent name="Tom Chen" />
          , div);

          comp.eventActions.getOlder();

          ReactDOM.unmountComponentAtNode(div);
        });
      });

      it(`will clean up Component after unmount`, () => {

        const mapDispatchToActions = (dispatch) => {
          return {
            getOlder () {
              dispatch({
                type: `GET_OLDER`,
                age: 1,
              });
            },
          };
        };

        const ReduxComponent = Componentize(createStore, () => ({}), noop, mapDispatchToActions)(() => (<div />));

        const div = document.createElement(`div`);

        const comp = ReactDOM.render(
          <ReduxComponent name="Tom Chen" />
        , div);

        comp.eventActions.getOlder();

        ReactDOM.unmountComponentAtNode(div);

        expect(comp.unsubscribeFromStore).toNotExist();
        expect(comp.eventActions).toNotExist();
        expect(comp.lifecycleActions).toNotExist();
        expect(comp.store).toNotExist();
      });
    });
  });
});

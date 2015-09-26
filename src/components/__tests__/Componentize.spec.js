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
        const ReduxComponent = Componentize(createStore, () => ({}), noop)();
        const comp = new ReduxComponent();

        expect(comp.store).toBeA(`object`);
      });
    });

    describe(`(_1, _2, mapDispatchToLifecycle)`, () => {
      it(`should contain React.Component lifecycle functions`, () => {
        const ReduxComponent = Componentize(createStore, () => ({}), noop)();
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

        const ReduxComponent = Componentize(createStore, () => ({}), mapDispatchToLifecycle)();
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
          componentWillReceiveProps (nextProps) {},
          componentWillUpdate (nextProps, nextState) {},
          componentDidUpdate (prevProps, prevState) {},
        };

        const spies = Object.keys(lifecycleCallbacks).reduce((acc, key) => {
          acc[key] = expect.spyOn(lifecycleCallbacks, key);
          return acc;
        }, {});

        const mapDispatchToLifecycle = () => lifecycleCallbacks;

        const ReduxComponent = Componentize(createStore, () => ({}), mapDispatchToLifecycle)();
        const comp = new ReduxComponent();

        Object.keys(spies).forEach(key =>
          expect(spies[key]).toNotHaveBeenCalled()
        );

        comp.componentWillReceiveProps({
          name: `Tom Chen`,
        });

        expect(spies.componentWillReceiveProps).toHaveBeenCalledWith({
          name: `Tom Chen`,
        });

        comp.componentWillUpdate({
          email: `developer@tomchentw.com`,
        }, {
          age: 1,
        });

        expect(spies.componentWillUpdate).toHaveBeenCalledWith({
          email: `developer@tomchentw.com`,
        }, {
          age: 1,
        });

        comp.componentDidUpdate({
          name: `Tom Chen`,
        }, {
          age: 0,
        });

        expect(spies.componentDidUpdate).toHaveBeenCalledWith({
          name: `Tom Chen`,
        }, {
          age: 0,
        });
      });
    });
  });
});

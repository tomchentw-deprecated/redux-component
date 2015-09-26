## API

### `Componentize(createStore, reducer, mapDispatchToLifecycle, mapDispatchToActions)`

Componentize redux store and redux actions to a React component.

It returns a `createComponent` function and you'll have to invoke it with a `render` function to get the React component. Notice all 4 arguments are always required.

#### Arguments

* `createStore(reducer): reduxStore` \(*Function*): The createStore function from stock `redux` package, or a funciton returned by `applyMiddleware(...middlewares)(createStore)`. It will be invoked with `reducer` function inside the constructor of the React component.

* `reducer(state, action): nextState` \(*Function*): The `reducer` function in redux. Notice the state here refers to components `this.state` and the return value (`nextState`) will be passed in to `this.setState`.

* `mapDispatchToLifecycle(dispatch): lifecycleActions` \(*object*): An object with the same function names, but bound to a Redux store, will be used in the corresponding React component lifecycle callbacks. (Tip: you may use the [`bindActionCreators()`](http://gaearon.github.io/redux/docs/api/bindActionCreators.html) helper from Redux.) You may not omit it, however you're free to pass in any [`noop`](https://lodash.com/docs#noop) functions.

* `mapDispatchToActions(dispatch): eventActions` \(*object*): An object with the same function names, but bound to a Redux store, will be passed in as third argument of the `render` function. Typically it will be used as event handler during JSX creation. (Tip: you may use the [`bindActionCreators()`](http://gaearon.github.io/redux/docs/api/bindActionCreators.html) helper from Redux.) You may not omit it, however you're free to pass in a functions that returns an empty object.

#### Returns

A React component class that manage the state by a local redux store and event handlers are redux action creators.

#### Remarks

* It needs to be invoked two times. The first time with its arguments described above, and a second time, with the `pure` render function: `Componentize(createStore, reducer, mapDispatchToLifecycle, mapDispatchToActions)(render)`.

#### Examples

##### Minimal setup

```js
export default Componentize(
  createStore, () => ({}), _.noop, _.noop
)(function render (props, state, actions) {
  // Notice actions will be undefined (return value of invoking _.noop)
  return (<div />);
});
```

##### Using lifecycle actions

```js
export default Componentize(createStore, (state, action) => {
  return action;
}, dispatch => {
  return bindActionCreators({
    componentDidMount (props) {
      return {
        type: `MOUNTED_ON_DOM`,
        windowKeyLength: Object.keys(window).length,
      };
    },
  }, dispatch);
}, _.noop)(function render (props, state, actions) {
  return (
    <div>
      window containing how many keys: {state.windowKeyLength}
    </div>
  );
});
```

##### Using event actions

```js
export default Componentize(createStore, (state, action) => {
  return action;
}, _.noop, dispatch => {
  return bindActionCreators({
    handleClick (extraKey, event) {
      return {
        type: `HANDLE_CLICK`,
        fromWhich: extraKey,
        metaKey: event.metaKey,
      };
    },
  }, dispatch);
})(function render (props, state, actions) {
  return (
    <div>
      Last clicked with: {state.metaKey} from {state.fromWhich}
      <button
        className={classNames({active: state.fromWhich === `A`})}
        onClick={actions.bind(null, `A`)}
      >AAAAAAAAAAAAA</button>
      <button
        className={classNames({active: state.fromWhich === `Z`})}
        onClick={actions.bind(null, `Z`)}
      >ZZZZZZZZZZZZZ</button>
    </div>
  );
});
```

##### Custom createStore from applyMiddleware

Check out the [SimpleComponent](https://github.com/tomchentw/redux-component/blob/master/examples/gh-pages/src/SimpleComponent.js) under [examples/gh-pages](https://github.com/tomchentw/redux-component/tree/master/examples/gh-pages).

import {
  createStore,
} from "redux";

function noop() {
}

export function createDispatchWithStore(component, store) {
  /* eslint-disable no-param-reassign */
  component.state = store.getState();

  const unsubscribeFromStore = store.subscribe(() => {
    component.setState(store.getState());
  });

  const oldComponentWillUnmount = component.componentWillUnmount || noop;

  component.componentWillUnmount = () => {
    unsubscribeFromStore();
    oldComponentWillUnmount.call(component);
  };

  return store.dispatch;
  /* eslint-enable no-param-reassign */
}

export default function createDispatch(component, reducer) {
  return createDispatchWithStore(component, createStore(reducer));
}

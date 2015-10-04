import {
  createStore,
} from "redux";

function noop () {
}

export default function createDispatch (component, reducer) {
  const store = createStore(reducer);

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
}

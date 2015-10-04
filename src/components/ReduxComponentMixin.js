import {
  createStore,
} from "redux";

export default function ReduxComponentMixin (reducer) {
  return {
    getInitialState () {
      this.store = createStore(reducer);
      this.unsubscribeFromStore = this.store.subscribe(() => {
        this.setState(this.store.getState());
      });
      this.dispatch = this.store.dispatch;
      return this.store.getState();
    },

    componentWillUnmount () {
      this.unsubscribeFromStore();
    },
  };
}

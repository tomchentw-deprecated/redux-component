export default function createComponentize (React) {
  const {
    Component,
    PropTypes,
  } = React;

  return function Componentize (createStore, reducer) {

    return function createComponent (render) {

      return class ReduxComponent extends Component {
        constructor (...args) {
          super(...args);
          this.store = createStore(reducer);
        }

        render () {
          return null;
        }
      };
    };
  };
}

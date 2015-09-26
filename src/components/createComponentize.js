
export default function createComponentize (React) {
  const {
    Component,
    PropTypes,
  } = React;

  const NullLifecycleActions = {
    componentWillMount () {},
    componentDidMount () {},
    componentWillReceiveProps () {},
    componentWillUpdate () {},
    componentDidUpdate () {},
    componentWillUnmount () {},
  };

  return function Componentize (createStore, reducer, mapDispatchToLifecycle) {

    return function createComponent (render) {

      return class ReduxComponent extends Component {
        constructor (...args) {
          super(...args);
          this.store = createStore(reducer);

          this.lifecycleActions = {
            ...NullLifecycleActions,
            // TODO: componentWillReceiveProps
            ...mapDispatchToLifecycle(this.store.dispatch, this.props),
          };
        }

        componentWillMount () {
          this.lifecycleActions.componentWillMount();
        }

        componentDidMount () {
          this.lifecycleActions.componentDidMount();
        }

        componentWillReceiveProps (nextProps: object) {
          this.lifecycleActions.componentWillReceiveProps();
        }

        componentWillUpdate (nextProps: object, nextState: object) {
          this.lifecycleActions.componentWillUpdate();
        }

        componentDidUpdate (prevProps: object, prevState: object) {
          this.lifecycleActions.componentDidUpdate();
        }

        componentWillUnmount () {
          this.lifecycleActions.componentWillUnmount();
        }

        render () {
          return null;
        }
      };
    };
  };
}

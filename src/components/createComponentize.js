
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

  return function Componentize (createStore, reducer, mapDispatchToLifecycle, mapDispatchToActions) {

    return function createComponent (render) {

      return class ReduxComponent extends Component {
        constructor (...args) {
          super(...args);
          this.store = createStore(reducer);

          this.lifecycleActions = {
            ...NullLifecycleActions,
            // TODO: componentWillReceiveProps
            ...mapDispatchToLifecycle(this.store.dispatch),
          };

          this.eventActions = mapDispatchToActions(this.store.dispatch);

          this.state = this.store.getState();
        }

        componentWillMount () {
          this.lifecycleActions.componentWillMount(this.props);
        }

        componentDidMount () {
          this.lifecycleActions.componentDidMount(this.props);
        }

        componentWillReceiveProps (nextProps: object) {
          this.lifecycleActions.componentWillReceiveProps(this.props, nextProps);
        }

        componentWillUpdate (nextProps: object, nextState: object) {
          this.lifecycleActions.componentWillUpdate(this.props, nextProps);
        }

        componentDidUpdate (prevProps: object, prevState: object) {
          this.lifecycleActions.componentDidUpdate(this.props, prevProps);
        }

        componentWillUnmount () {
          this.lifecycleActions.componentWillUnmount(this.props);
        }

        render () {
          return render(this.props, this.state, this.eventActions);
        }
      };
    };
  };
}

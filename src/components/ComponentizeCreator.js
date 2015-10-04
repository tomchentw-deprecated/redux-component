
import {
  createDispatchWithStore,
} from "./createDispatch";

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
          const dispatch = createDispatchWithStore(this, createStore(reducer));

          this.lifecycleActions = {
            ...NullLifecycleActions,
            // TODO: componentWillReceiveProps
            ...mapDispatchToLifecycle(dispatch),
          };

          this.eventActions = mapDispatchToActions(dispatch);
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
          this.eventActions = null;

          this.lifecycleActions.componentWillUnmount(this.props);
          this.lifecycleActions = null;
        }

        render () {
          return render(this.props, this.state, this.eventActions);
        }
      };
    };
  };
}

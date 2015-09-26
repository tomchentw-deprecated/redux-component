export default function createComponentize (React) {
  const {
    Component,
    PropTypes,
  } = React;

  return function Componentize () {

    return function createComponent (render) {

      return class ReduxComponent extends Component {
        render () {
          return null;
        }
      };
    };
  };
}

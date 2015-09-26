## Quick Start

React stateful component creator using redux.

### Inspiration

* [react-redux][react-redux]
* [cycle-react](https://github.com/pH200/cycle-react)
* [ducks-modular-redux][ducks-modular-redux]

### Use Cases

#### Stateful component with local state

Sometimes, you don't want every state in your application to go into global redux store. They could be just local state exists in the component via `setState` call. `redux-component` provides you a clean and testable interface to write the stateful component.

#### Migration to redux

You have a existing flux architecture in the application, but you'll like to switch to `redux`. Then `redux-component` lets you start small for migrations.

#### Start local and push to global when necessary

Build statefull components with `redux-component` and apply `ducks-modular-redux` approach in it. When a global state is needed, simply pull out action creators and reducers to global redux architecture, then `connect` it and you're done.

### Yeah so how do I get started?

Checkout [ducks-modular-redux][ducks-modular-redux]. You've used `connect` from [react-redux][react-redux] already, right? Awesome. You've already learned `redux-component`. Check out the **only** one [API](https://github.com/tomchentw/redux-component/blob/master/docs/api.md) in the docs and you're cool now.

[react-redux]: https://github.com/rackt/react-redux/
[ducks-modular-redux]: https://github.com/erikras/ducks-modular-redux

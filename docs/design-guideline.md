## Design Guideline

React stateful component creator using redux.

### Inspiration

* [react-redux](https://github.com/rackt/react-redux/)
* [cycle-react](https://github.com/pH200/cycle-react)
* [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)

### Use Cases

#### Stateful component with local state

Sometimes, you don't want every state in your application to go into global redux store. They could be just local state exists in the component via `setState` call. `redux-component` provides you a clean and testable interface to write the stateful component in the first place.

#### Migration to redux

You already have a existing global flux architecture in the application. For the time being, you may want to migrate the coe to use `redux`. Then `redux-component` lets you start small steps: migrating the component's local state first, get familiar with the `redux` APIs & ecosystems, then refactor your global flux architecture at the end.

#### Start local and push to global when necessary

Build statefull components with `redux-component` and apply `ducks-modular-redux` approach in it. When a global state is needed, simply pull out necessary action creators and reducer to your global redux architecture. After that, `connect` it to the component and you've done with it.

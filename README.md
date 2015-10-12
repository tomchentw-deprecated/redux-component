# redux-component [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][codeclimate-coverage-image]][codeclimate-coverage-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]
> Create stateful React Component using goodness from redux

[![Version][npm-image]][npm-url]


## Quick start: Say Hi

The form component that reads name and email from the user and submit the form to the API server.

```js
import { Componentize } from "redux-component";

const createComponent = Componentize(/* ... */);

const Component = createComponent(function SayHi (props, state, actions) {
  return (
    <form onSubmit={e => actions.submitForm(props, e)}>
      {renderUsername(state.usernameLoading, props.userId, state.username)}
      {renderError(state.error)}
      <input type="text" value={state.formValues.name} onChange={e => actions.textChanged(`name`, e)} />
      <input type="email" value={state.formValues.email} onChange={e => actions.textChanged(`email`, e)} />
      <button type="submit">Hi</button>
    </form>
  );
});
```

This basically covers everything for creating a stateful React component.


## Documentation

See the full list of [API](docs/api.md#api).


## Usage

`redux-component` requires __React 0.13 or later.__

```sh
npm install --save redux-component
```

All functions are available on the top-level export.

```js
import { Componentize } from "redux-component";
```


## Initiative

React 0.14 introduces [stateless function components](https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components). However, what if I want to use __pure functions__ to create stateful React components?

__That's what `redux-component` does.__

> Manage a component's local state using a local redux store.

A *isolated* redux store is created for each React component instance. It has __nothing__ to do with your global flux architecture. There are several goodness for this approach:

* Express component state transition in a single `reducer` function
* Event callbacks in redux actions are clean and easy to reason about
* You build *pure functions* all the way: `render`, `action`s and `reducer`
* No more `this.setState()` touched in your code
* Easy to test React component implements

See the complete example in the [examples/gh-pages](https://github.com/tomchentw/redux-component/tree/master/examples/gh-pages/src) folder and demo [hosted on GitHub](https://tomchentw.github.io/redux-component/).


## Contributing

[![devDependency Status][david-dm-image]][david-dm-url]

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


[npm-image]: https://img.shields.io/npm/v/redux-component.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/redux-component

[travis-image]: https://img.shields.io/travis/tomchentw/redux-component.svg?style=flat-square
[travis-url]: https://travis-ci.org/tomchentw/redux-component
[codeclimate-image]: https://img.shields.io/codeclimate/github/tomchentw/redux-component.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/tomchentw/redux-component
[codeclimate-coverage-image]: https://img.shields.io/codeclimate/coverage/github/tomchentw/redux-component.svg?style=flat-square
[codeclimate-coverage-url]: https://codeclimate.com/github/tomchentw/redux-component
[gemnasium-image]: https://img.shields.io/gemnasium/tomchentw/redux-component.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/tomchentw/redux-component
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/tomchentw/redux-component?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[david-dm-image]: https://img.shields.io/david/dev/tomchentw/redux-component.svg?style=flat-square
[david-dm-url]: https://david-dm.org/tomchentw/redux-component#info=devDependencies

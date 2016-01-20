import {
  default as React,
  PropTypes,
} from "react";

import {
  ReduxComponentMixin,
} from "redux-component";

import {
  default as randomPromise,
} from "./randomPromise";

// Hey let's just borrow from ES2015 class version
import {
  TEXT_CHANGED,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  LOAD_USERNAME_REQUEST,
  LOAD_USERNAME_SUCCESS,
  LOAD_USERNAME_FAILURE,

  reducer,
} from "./SimpleComponent.createDispatch";

/* eslint-disable react/prefer-es6-class */
// Here we define React Component using React.createClass & mixins
export const Component = React.createClass({

  propTypes: {
    userId: PropTypes.any.isRequired,
    globlaReduxActionGetUsername: PropTypes.any.isRequired,
    globlaReduxActionSubmitForm: PropTypes.any.isRequired,
  },

  mixins: [
    /* eslint-disable new-cap */
    ReduxComponentMixin(reducer),
    /* eslint-enable new-cap */
  ],

  getDefaultProps() {
    return {
      userId: 1,
      globlaReduxActionGetUsername: randomPromise,
      globlaReduxActionSubmitForm: randomPromise,
    };
  },

  componentDidMount() {
    this.dispatch({
      type: LOAD_USERNAME_REQUEST,
    });

    this.props.globlaReduxActionGetUsername(this.props.userId)
      .then((username) => {
        this.dispatch({
          type: LOAD_USERNAME_SUCCESS,
          username,
        });
      })
      .catch((error) => {
        this.dispatch({
          type: LOAD_USERNAME_FAILURE,
          error,
        });
      });
  },

  handleSubmitForm(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dispatch({
      type: SUBMIT_FORM_REQUEST,
    });

    const { formValues } = this.state;

    this.props.globlaReduxActionSubmitForm(formValues)
      .then(() => {
        this.dispatch({
          type: SUBMIT_FORM_SUCCESS,
        });
      })
      .catch((error) => {
        this.dispatch({
          type: SUBMIT_FORM_FAILURE,
          error,
        });
      });
  },

  renderUsername() {
    if (this.state.usernameLoading) {
      return (
        <label>Username loading ... (user id: {this.props.userId})</label>
      );
    } else {
      return (
        <label>Your username: {this.state.username}</label>
      );
    }
  },

  renderError() {
    if (this.state.error) {
      return (
        <p className="error">{this.state.error.message}</p>
      );
    } else {
      return null;
    }
  },

  render() {
    /* eslint-disable react/jsx-no-bind */
    return (
      <form onSubmit={this.handleSubmitForm}>
        {this.renderUsername()}
        {this.renderError()}
        <input type="text" value={this.state.formValues.name} onChange={event => this.dispatch({
          type: TEXT_CHANGED,
          formKey: `name`,
          value: event.target.value,
        })}
        />
        <input type="email" value={this.state.formValues.email} onChange={event => this.dispatch({
          type: TEXT_CHANGED,
          formKey: `email`,
          value: event.target.value,
        })}
        />
        <button type="submit">Hi</button>
      </form>
    );
    /* eslint-enable react/jsx-no-bind */
  },
});

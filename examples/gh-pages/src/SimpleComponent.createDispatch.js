import React from "react";
import { createDispatch } from "../../../src/index";
import randomPromise from "./randomPromise";

export const TEXT_CHANGED = `TEXT_CHANGED`;

export const SUBMIT_FORM_REQUEST = `SUBMIT_FORM_REQUEST`;
export const SUBMIT_FORM_SUCCESS = `SUBMIT_FORM_SUCCESS`;
export const SUBMIT_FORM_FAILURE = `SUBMIT_FORM_FAILURE`;

export const LOAD_USERNAME_REQUEST = `LOAD_USERNAME_REQUEST`;
export const LOAD_USERNAME_SUCCESS = `LOAD_USERNAME_SUCCESS`;
export const LOAD_USERNAME_FAILURE = `LOAD_USERNAME_FAILURE`;

const initialState = {
  formValues: {
    name: `Tom Chen`,
    email: `developer@tomchentw.com`,
  },
  error: null,
  usernameLoading: false,
  username: null,
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case TEXT_CHANGED:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.formKey]: action.value,
        },
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SUBMIT_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LOAD_USERNAME_REQUEST:
      return {
        ...state,
        usernameLoading: true,
      };
    case LOAD_USERNAME_SUCCESS:
      return {
        ...state,
        error: null,
        usernameLoading: false,
        username: action.username,
      };
    case LOAD_USERNAME_SUCCESS:
      return {
        ...state,
        error: action.error,
        usernameLoading: false,
      };
    default:
      return state;
  };
}

export class Component extends React.Component {

  static defaultProps = {
    userId: 1,
    globlaReduxActionGetUsername: randomPromise,
    globlaReduxActionSubmitForm: randomPromise,
  }

  constructor (...args) {
    super(...args);
    this.dispatch = createDispatch(this, reducer);
  }

  componentDidMount () {
    this.dispatch({
      type: LOAD_USERNAME_REQUEST,
    });
    
    this.props.globlaReduxActionGetUsername(this.props.userId)
      .then((username) => {
        this.dispatch({
          type: LOAD_USERNAME_SUCCESS,
          username: username,
        });
      })
      .catch((error) => {
        this.dispatch({
          type: LOAD_USERNAME_FAILURE,
          error: error,
        });
      });
  }

  handleSubmitForm (event) {
    event.preventDefault();
    event.stopPropagation();

    this.dispatch({
      type: SUBMIT_FORM_REQUEST,
    });

    const {formValues} = this.state;

    this.props.globlaReduxActionSubmitForm(formValues)
      .then(() => {
        this.dispatch({
          type: SUBMIT_FORM_SUCCESS,
        });
      })
      .catch((error) => {
        this.dispatch({
          type: SUBMIT_FORM_FAILURE,
          error: error,
        });
      });
  }

  renderUsername () {
    if (this.state.usernameLoading) {
      return (
        <label>Username loading ... (user id: {this.props.userId})</label>
      )
    } else {
      return (
        <label>Your username: {this.state.username}</label>
      )
    }
  }

  renderError () {
    if (this.state.error) {
      return (
        <p className="error">{this.state.error.message}</p>
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <form onSubmit={::this.handleSubmitForm}>
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
  }
}

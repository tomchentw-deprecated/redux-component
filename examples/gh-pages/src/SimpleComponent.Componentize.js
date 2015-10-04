import React from "react";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import thunkMiddleware from "redux-thunk";
import { Componentize } from "../../../src/index";
import randomPromise from "./randomPromise";

const TEXT_CHANGED = `redux-component/example/gh-pages/SimpleComponent/TEXT_CHANGED`;

const SUBMIT_FORM_REQUEST = `redux-component/example/gh-pages/SimpleComponent/SUBMIT_FORM_REQUEST`;
const SUBMIT_FORM_SUCCESS = `redux-component/example/gh-pages/SimpleComponent/SUBMIT_FORM_SUCCESS`;
const SUBMIT_FORM_FAILURE = `redux-component/example/gh-pages/SimpleComponent/SUBMIT_FORM_FAILURE`;

export const textChanged = (formKey, event) => {
  return {
    type: TEXT_CHANGED,
    formKey: formKey,
    value: event.target.value,
  };
};

export const submitForm = (props, event) =>{
  return (dispatch, getState) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(submitFormRequest());

    const {formValues} = getState();

    props.globlaReduxActionSubmitForm(formValues)
      .then(() => {
        dispatch(submitFormSuccess());
      })
      .catch((error) => {
        dispatch(submitFormFailure(error));
      });
  }
};

export function submitFormRequest () {
  return {
    type: SUBMIT_FORM_REQUEST,
  };
}

export function submitFormSuccess () {
  return {
    type: SUBMIT_FORM_SUCCESS,
  };
}

export function submitFormFailure (error) {
  return {
    type: SUBMIT_FORM_FAILURE,
    error: error,
  };
}

// Lifecycle --- BEGIN
export const componentDidMount = (props) => {
  return (dispatch, getState) => {
    dispatch(loadUsernameRequest());
    
    props.globlaReduxActionGetUsername(props.userId)
      .then((username) => {
        dispatch(loadUsernameSuccess(username));
      })
      .catch((error) => {
        dispatch(loadUsernameFailure(error));
      });
  };
};

const LOAD_USERNAME_REQUEST = `redux-component/example/gh-pages/SimpleComponent/LOAD_USERNAME_REQUEST`;
const LOAD_USERNAME_SUCCESS = `redux-component/example/gh-pages/SimpleComponent/LOAD_USERNAME_SUCCESS`;
const LOAD_USERNAME_FAILURE = `redux-component/example/gh-pages/SimpleComponent/LOAD_USERNAME_FAILURE`;

export function loadUsernameRequest () {
  return {
    type: LOAD_USERNAME_REQUEST,
  };
}

export function loadUsernameSuccess (username) {
  return {
    type: LOAD_USERNAME_SUCCESS,
    username: username,
  };
}

export function loadUsernameFailure (error) {
  return {
    type: LOAD_USERNAME_FAILURE,
    error: error,
  };
}

// Lifecycle --- END


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

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
)(createStore);

// only visible inside Componentize.
const mapDispatchToLifecycle = (dispatch) => {
  return bindActionCreators({
    componentDidMount,
  }, dispatch);
};

const mapDispatchToActions = (dispatch) => {
  return bindActionCreators({
    textChanged,
    submitForm,
  }, dispatch);
};

const createComponent = Componentize(createStoreWithMiddleware, reducer, mapDispatchToLifecycle, mapDispatchToActions);

export const Component = createComponent(function SimpleComponent (props, state, actions) {

  const renderError = () => {
    if (state.error) {
      return (
        <p className="error">{state.error.message}</p>
      );
    } else {
      return null;
    }
  }

  const renderUsername = () => {
    if (state.usernameLoading) {
      return (
        <label>Username loading ... (user id: {props.userId})</label>
      )
    } else {
      return (
        <label>Your username: {state.username}</label>
      )
    }
  };

  return (
    <form onSubmit={e => actions.submitForm(props, e)}>
      {renderUsername()}
      {renderError()}
      <input type="text" value={state.formValues.name} onChange={e => actions.textChanged(`name`, e)} />
      <input type="email" value={state.formValues.email} onChange={e => actions.textChanged(`email`, e)} />
      <button type="submit">Hi</button>
    </form>
  );
});

Component.defaultProps = {
  userId: 1,
  globlaReduxActionGetUsername: randomPromise,
  globlaReduxActionSubmitForm: randomPromise,
};

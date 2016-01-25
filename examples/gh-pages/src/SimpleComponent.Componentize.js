import {
  default as React,
} from "react";

import {
  createStore,
  applyMiddleware,
  bindActionCreators,
} from "redux";

import {
  default as thunkMiddleware,
} from "redux-thunk";

import {
  Componentize,
} from "redux-component";

import {
  default as randomPromise,
} from "./randomPromise";

const TEXT_CHANGED = `SimpleComponent/TEXT_CHANGED`;

const SUBMIT_FORM_REQUEST = `SimpleComponent/SUBMIT_FORM_REQUEST`;
const SUBMIT_FORM_SUCCESS = `SimpleComponent/SUBMIT_FORM_SUCCESS`;
const SUBMIT_FORM_FAILURE = `SimpleComponent/SUBMIT_FORM_FAILURE`;

export function textChanged(formKey, event) {
  return {
    type: TEXT_CHANGED,
    formKey,
    value: event.target.value,
  };
}

export function submitForm(props, event) {
  return (dispatch, getState) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(submitFormRequest());

    const { formValues } = getState();

    props.globlaReduxActionSubmitForm(formValues)
      .then(() => {
        dispatch(submitFormSuccess());
      })
      .catch((error) => {
        dispatch(submitFormFailure(error));
      });
  };
}

export function submitFormRequest() {
  return {
    type: SUBMIT_FORM_REQUEST,
  };
}

export function submitFormSuccess() {
  return {
    type: SUBMIT_FORM_SUCCESS,
  };
}

export function submitFormFailure(error) {
  return {
    type: SUBMIT_FORM_FAILURE,
    error,
  };
}

// Lifecycle --- BEGIN
export function componentDidMount(props) {
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
}

const LOAD_USERNAME_REQUEST = `SimpleComponent/LOAD_USERNAME_REQUEST`;
const LOAD_USERNAME_SUCCESS = `SimpleComponent/LOAD_USERNAME_SUCCESS`;
const LOAD_USERNAME_FAILURE = `SimpleComponent/LOAD_USERNAME_FAILURE`;

export function loadUsernameRequest() {
  return {
    type: LOAD_USERNAME_REQUEST,
  };
}

export function loadUsernameSuccess(username) {
  return {
    type: LOAD_USERNAME_SUCCESS,
    username,
  };
}

export function loadUsernameFailure(error) {
  return {
    type: LOAD_USERNAME_FAILURE,
    error,
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

export function reducer(state = initialState, action) {
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
    case LOAD_USERNAME_FAILURE:
      return {
        ...state,
        error: action.error,
        usernameLoading: false,
      };
    default:
      return state;
  }
}

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
)(createStore);

// only visible inside Componentize.
function mapDispatchToLifecycle(dispatch) {
  return bindActionCreators({
    componentDidMount,
  }, dispatch);
}

function mapDispatchToActions(dispatch) {
  return bindActionCreators({
    textChanged,
    submitForm,
  }, dispatch);
}

/* eslint-disable new-cap */
const createComponent = Componentize(
  createStoreWithMiddleware, reducer, mapDispatchToLifecycle, mapDispatchToActions
);
/* eslint-enable new-cap */

function renderUsername(usernameLoading, userId, username) {
  if (usernameLoading) {
    return (
      <label>Username loading ... (user id: {userId})</label>
    );
  } else {
    return (
      <label>Your username: {username}</label>
    );
  }
}

function renderError(error) {
  if (error) {
    return (
      <p className="error">{error.message}</p>
    );
  } else {
    return null;
  }
}

function SimpleComponent(props, state, actions) {
  /* eslint-disable react/jsx-no-bind */
  return (
    <form onSubmit={e => actions.submitForm(props, e)}>
      {renderUsername(state.usernameLoading, props.userId, state.username)}
      {renderError(state.error)}
      <input
        type="text"
        value={state.formValues.name}
        onChange={e => actions.textChanged(`name`, e)}
      />
      <input
        type="email"
        value={state.formValues.email}
        onChange={e => actions.textChanged(`email`, e)}
      />
      <button type="submit">Hi</button>
    </form>
  );
  /* eslint-enable react/jsx-no-bind */
}

export const Component = createComponent(SimpleComponent);

Component.defaultProps = {
  userId: 1,
  globlaReduxActionGetUsername: randomPromise,
  globlaReduxActionSubmitForm: randomPromise,
};

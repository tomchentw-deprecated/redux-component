import {
  default as React,
} from "react";

import {
  default as createComponentize,
} from "./components/createComponentize";

import {
  default as createDispatch,
} from "./components/createDispatch";

import {
  default as ReduxComponentMixin,
} from "./components/ReduxComponentMixin";

export const Componentize = createComponentize(React);

export {createDispatch};

export {ReduxComponentMixin};

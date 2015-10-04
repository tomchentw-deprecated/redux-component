import {
  default as React,
} from "react";

import {
  default as ComponentizeCreator,
} from "./components/ComponentizeCreator";

import {
  default as createDispatch,
} from "./components/createDispatch";

import {
  default as ReduxComponentMixin,
} from "./components/ReduxComponentMixin";

export const Componentize = ComponentizeCreator(React);

export {createDispatch};

export {ReduxComponentMixin};

import {
  default as React,
} from "react";

import {
  default as createComponentize,
} from "./components/createComponentize";

import {
  default as createDispatch,
} from "./components/createDispatch";

export const Componentize = createComponentize(React);

export {createDispatch};

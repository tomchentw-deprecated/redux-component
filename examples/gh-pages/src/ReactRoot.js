import {default as React} from "react";

import {Component as SimpleComponent_Componentize} from "./SimpleComponent.Componentize";
import {Component as SimpleComponent_createDispatch} from "./SimpleComponent.createDispatch";
import {Component as SimpleComponent_ReduxComponentMixin} from "./SimpleComponent.ReduxComponentMixin";

export default class ReactRoot extends React.Component {
  render () {
    return (
      <div>
        <SimpleComponent_Componentize />
        <SimpleComponent_createDispatch />
        <SimpleComponent_ReduxComponentMixin />
      </div>
    );
  }
}

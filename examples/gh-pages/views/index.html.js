import {
  default as React,
} from "react";

import {
  WebpackScriptEntry,
  WebpackStyleEntry,
  ReactRenderToStringEntry,
} from "reacthtmlpack/lib/entry";

export default (
  <html>
    <head>
      <title>redux-component | tomchentw</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta charSet="UTF-8" />
      <WebpackStyleEntry
        chunkName="client"
        chunkFilepath="../src/client.js"
        configFilepath="../Client.webpackConfig.js"
      />
      <WebpackScriptEntry
        chunkName="prism"
        chunkFilepath={require.resolve(`prismjs`)}
        configFilepath="../WebWorker.webpackConfig.js"
      />
    </head>
    <body>
      <ReactRenderToStringEntry
        id="react-container"
        tagName="div"
        chunkName="server"
        chunkFilepath="../src/server.js"
        configFilepath="../Server.webpackConfig.js"
      />
      <WebpackScriptEntry
        chunkName="client"
        chunkFilepath="../src/client.js"
        configFilepath="../Client.webpackConfig.js"
      />
    </body>
  </html>
);

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/App';

//why use hydrate instead of render? ReactDOM.hydrate() is same as render(), but is used to hydrate(attach event listeners)
//a container whose HTML contents were rendered by ReactDOMServer.
//React will attempt to attach event listeners to the existing markup.
//Using ReactDOM.render() to hydrate a server-rendered container is deprecated because of slowness
//and will be removed in React 17. Use hydrate() instead.
//we need our server container for the koa and junk so we do this :)
ReactDOM.hydrate(<App />, document.getElementById('app'));

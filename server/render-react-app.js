import React from 'react';
import {renderToString} from 'react-dom/server';
import HTML from '@shopify/react-html';

//React-HTML replaces a static HTML file which includes a div with id 'app',
//we then use this in client js document.getElementById('app'));
//this could be replaced by index.html, or an esj file if you prefered.
export default (ctx) => {
  const markup = renderToString(
    <HTML deferedScripts={[{path: 'bundle.js'}]} />,
  );

  ctx.body = markup;
  //this makes the body this 'markup' which is our html via the server, cool!!
};

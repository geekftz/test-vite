import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Child from './Child';

function App() {
  // let [count, setCount] = useState(0);
  const [curUrl, setCurUrl] = useState('');

  const getHashPath = (url) => {
    const index = url.indexOf('#');
    if (index >= 0) {
      return url.slice(index + 1);
    }
    return '/';
  };

  const refresh = (event) => {
    console.log('%c⧭', 'color: #735656', event);

    console.log(event.oldURL, event.newURL);
    let hash = location.hash.slice(1);
    document.body.style.color = hash;

    let curURL = '',
      oldURL = null;
    if (event.newURL) {
      oldURL = getHashPath(event.oldURL || '');
      curURL = getHashPath(event.newURL || '');
    } else {
      curURL = getHashPath(window.location.hash);
    }
    console.log('%c%s', 'color: #ffcc00', curURL);

    setCurUrl(curURL);
  };

  window.addEventListener('load', refresh, false);
  window.addEventListener('hashchange', refresh, false);

  return (
    <div className="App">
      123123123
      {/* {curUrl} */}
      {/* <Child /> */}
    </div>
  );
}

export default App;

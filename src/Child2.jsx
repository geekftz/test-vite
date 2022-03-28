import React, { useState, useRef, useEffect, useLayoutEffect, Suspense, useTransition } from 'react';

function Child() {
  const debounce = (fn, ms) => {
    let timer = null;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        fn();
      }, ms);
    };
  };

  const fn = () => {
    console.log('fn execute');
  };

  const debounceClick = debounce(fn, 1000);

  const throttle = (fn, ms) => {
    let timer = null;

    return () => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        fn();
        timer = null;
      }, ms);
    };
  };

  const throttleClick = throttle(fn, 1000);

  return (
    <div className="Child">
      <button onClick={debounceClick}>debounce</button>
      <button onClick={throttleClick}>throttle</button>
    </div>
  );
}

export default Child;

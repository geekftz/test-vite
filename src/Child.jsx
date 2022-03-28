import React, { useState, useRef, useEffect, useLayoutEffect, Suspense } from 'react';

import './Child.css';

// function Child() {
//   const [count, setCount] = useState(1);

//   const btnClick = () => {
//     // debugger;
//     setCount(count + 1);
//   };

//   return (
//     <>
//       <div>{count}</div>
//       <button onClick={btnClick}>add</button>
//     </>
//   );
// }

const delay = (fn, ms) => {
  setTimeout(() => {
    fn();
  }, ms);
};

function A() {
  return <div className="letter">A</div>;
}

// ###################

export function slowImport(value, ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

const B = React.lazy(() => slowImport(import('./B.jsx'), 1000));
const C = React.lazy(() => slowImport(import('./C.jsx'), 2000));

// ###################

// 页面1
function Page1() {
  return <A />;
}

// 页面2
function Page2() {
  return (
    <>
      {/* <B /> */}
      <B />
      <Suspense fallback={<div>Loading... C</div>}>
        <C />
      </Suspense>
    </>
  );
}

function Child() {
  const [showPage2, setShowPage2] = useState(false);

  // 点击切换到页面2
  const handleClick = () => setShowPage2(true);

  return (
    <div className="Child">
      <div>
        <button onClick={handleClick}>切换</button>
      </div>
      <div className="page">
        <Suspense fallback={<div>Loading... B</div>}>{!showPage2 ? <Page1 /> : <Page2 />}</Suspense>
      </div>
    </div>
  );
}

export default Child;

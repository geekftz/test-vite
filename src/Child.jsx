import React, { useState } from 'react';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './Child.css';

function Child() {
  // return (
  //   <div className="child">
  //     <DragTest />
  //   </div>
  // );

  const list = [1, 2, 3];
  const [count, setCount] = useState(1);
  return (
    <div className="App">
      <button onClick={() => setCount(count * 2)}>点击加倍</button>
      <ul>
        {list.map((item) => {
          return <li key={item}>{item * count}</li>;
        })}
      </ul>
    </div>
  );
}

export default Child;

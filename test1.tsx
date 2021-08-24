class TabNode extends React.Component {
  render() {
    // @ts-ignore
    const { connectDragSource, connectDropTarget, children } = this.props;

    return connectDragSource(connectDropTarget(children));
  }
}

const cardTarget = {
  drop(props: any, monitor: any) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
  beginDrag(props: any) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const WrapTabNode = DropTarget('DND_NODE', cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('DND_NODE', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode)
);

const DraggableTabs: React.FC = (props) => {
  const [order, setOrder] = useState([]);
  const { children } = props;

  // 改变order
  const moveTabNode = (dragKey: any, hoverKey: any) => {
    const newOrder = order.slice();

    React.Children.forEach(children, (c) => {
      // @ts-ignore
      if (newOrder.indexOf(c.key) === -1) {
        // @ts-ignore
        newOrder.push(c.key);
      }
    });
    // @ts-ignore
    const dragIndex = newOrder.indexOf(dragKey);
    // @ts-ignore
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);

    // @ts-ignore
    newOrder.splice(hoverIndex, 0, dragKey);
    console.log('%c newOrder = ⧭', 'color: #cc0036', newOrder);

    setOrder(newOrder);
  };

  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <DefaultTabBar {...props}>
      {(node: any) => (
        // @ts-ignore
        <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>
          {node}
        </WrapTabNode>
      )}
    </DefaultTabBar>
  );

  const orderTabs = useMemo(() => {
    const tabs: any = [];
    React.Children.forEach(children, (c) => {
      tabs.push(c);
    });

    const res = tabs.slice().sort((a: any, b: any) => {
      // @ts-ignore
      const orderA = order.indexOf(a.key);

      // @ts-ignore
      const orderB = order.indexOf(b.key);

      if (orderA !== -1 && orderB !== -1) {
        return orderA - orderB;
      }
      if (orderA !== -1) {
        return -1;
      }
      if (orderB !== -1) {
        return 1;
      }

      const ia = tabs.indexOf(a);
      const ib = tabs.indexOf(b);

      return ia - ib;
    });

    return res;
  }, [children, order]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs renderTabBar={renderTabBar}>{orderTabs}</Tabs>
    </DndProvider>
  );
};

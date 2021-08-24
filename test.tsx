class DraggableTabs extends React.Component {
  state = {
    order: [],
  };

  // 改变order
  moveTabNode = (dragKey: any, hoverKey: any) => {
    const newOrder = this.state.order.slice();
    const { children } = this.props;

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

    this.setState({
      order: newOrder,
    });
  };

  renderTabBar = (props: any, DefaultTabBar: any) => (
    <DefaultTabBar {...props}>
      {(node: any) => (
        // @ts-ignore
        <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>
          {node}
        </WrapTabNode>
      )}
    </DefaultTabBar>
  );

  render() {
    const { order } = this.state;
    const { children } = this.props;

    const tabs: any = [];
    React.Children.forEach(children, (c) => {
      tabs.push(c);
    });

    const orderTabs = tabs.slice().sort((a: any, b: any) => {
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

    return (
      <DndProvider backend={HTML5Backend}>
        <Tabs renderTabBar={this.renderTabBar} {...this.props}>
          {orderTabs}
        </Tabs>
      </DndProvider>
    );
  }
}

const DragTest = () => {
  return (
    <DraggableTabs>
      <TabPane tab="tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </DraggableTabs>
  );
};

帧之间的拖拽;

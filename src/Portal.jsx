import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import NbButton from './button/NbButton';

const ReactGridLayout = WidthProvider(RGL);

export default class Portal extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    items: 50,
    cols: 12,
    autoSize: true,
    rowHeight: 30,
    mounted: true,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    const layout = this.props.items//this.generateLayout();
    //console.log(JSON.stringify(layout));
    this.state = { layout };
  }

  getComponent(com) {
    if (com && com.type === 'button') {
        return (
            <NbButton></NbButton>
        )
    }
    else {
        return (
            <span>1</span>
        );
    }
  }

  generateDOM() {
    let _this = this;
    return _.map(this.props.items, function(o) {
      return (
        <div key={o.id} data-grid={{x:o.x, y:o.y, w:o.w, h:o.h}}>
          {_this.getComponent(o.com)}
        </div>
      );
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
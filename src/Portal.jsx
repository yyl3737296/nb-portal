import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import axios from 'axios';
import NbButton from './button/NbButton';
import NbInput from './input/NbInput';

const ReactGridLayout = WidthProvider(RGL);

export default class Portal extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        isDraggable: false,
        isResizable: false,
        cols: 12,
        items: [],
        autoSize: true,
        rowHeight: 30,
        mounted: true,
        onLayoutChange: function () { }
    };

    constructor(props) {
        super(props);

        const layout = this.props.items;
        const margin = [15, 15];
        this.state = { layout, margin };
        this.getPortalData();
    }

    getPortalData() {
        let _this = this;
        axios.get('data.json').then(function (res) {
            let items = res.data.items,
                margin = res.data.margin;
            if (margin) {
                _this.setState({ margin: margin });
            }

            _this.setState({ layout: items});
            
        });
    }

    getComponent(c) {
        if (c && c.t === 'button') {
            return (
                <NbButton {...c.d}></NbButton>
            )
        }
        else if (c && c.t === 'input') {
            return (
                <NbInput />
            )
        }
        else {
            return null
        }
    }

    getComponentDOM(o) {

        //if (o.c) {
            return (
                <div key={o.id} data-grid={{ x: o.x, y: o.y, w: o.w, h: o.h }}>
                    {this.getComponent(o.c)}
                </div>
            );
        //}
        return null;
    }

    generateDOM() {
        let _eleDom = [];
        _.forEach(this.state.layout, (obj) => {
            let _ele = this.getComponentDOM(obj);
            if (_ele) {
                _eleDom.push(_ele);
            }
        });
        return _eleDom;
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    render() {
        const style = {
            "marginLeft": `-${this.state.margin[0]}px`,
            "marginRight": `-${this.state.margin[0]}px`,
            "marginTop": `-${this.state.margin[1]}px`,
            "width": `calc(100% + ${this.state.margin[0] * 2}px)`
        };
        return (
            <div className="nb-portal">
                <div style={style}>
                    <ReactGridLayout
                        layout={this.state.layout}
                        onLayoutChange={this.onLayoutChange}
                        margin={this.state.margin}
                        {...this.props}
                    >
                        {this.generateDOM()}
                    </ReactGridLayout>
                </div>
            </div>
        );
    }
}
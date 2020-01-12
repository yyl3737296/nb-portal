import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
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
        const header = [];
        this.state = { layout, margin, header };
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
            _this.setState({ layout: items, header: res.data.header});
            
        });
    }

    getComponent(type, data) {
        if (type === 'button') {
            return (
                <NbButton {...data}></NbButton>
            )
        }
        else if (type === 'input') {
            return (
                <NbInput />
            )
        }
        else {
            return null
        }
    }

    getGuId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
        }).toUpperCase();
    }

    getComponentDOM(obj) {
        let comType = obj.type,
            layout = obj.layout,
            metaData = obj.metaData,
            guId = this.getGuId();

        return (
            <div key={guId} data-grid={{ x: layout.x, y: layout.y, w: layout.w, h: layout.h }}>
                {this.getComponent(comType, metaData)}
            </div>
        );
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
            "width": `calc(100% + ${this.state.margin[0] * 2}px)`
        };
        return (
            <div>
                <Header data={this.state.header}></Header>
                <div className="nb-portal">
                    <div style={style}>
                        <ReactGridLayout
                            onLayoutChange={this.onLayoutChange}
                            margin={this.state.margin}
                            {...this.props}
                        >
                            {this.generateDOM()}
                        </ReactGridLayout>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
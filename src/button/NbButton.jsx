import React, { Component } from 'react';
import emitter from '../evt';
import './button.css'
 
class NbButton extends Component {
  static defaultProps = {
    label: ''
  }
  constructor(props) {
    super(props);
  }
  handleClick() {
    var data = true;
    emitter.emit('nbInput11111', data);
    
  }
  render() {
    return (
    <button onClick={this.handleClick} className="nb-basic-button">{this.props.label}</button>
    );
  }
}
 
export default NbButton;

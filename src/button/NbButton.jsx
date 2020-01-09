import React, { Component } from 'react';
import './button.css'
 
class NbButton extends Component {
  static defaultProps = {
    label: ''
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <button className="nb-basic-button">{this.props.label}</button>
    );
  }
}
 
export default NbButton;

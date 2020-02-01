import React, { Component } from 'react';
import emitter from '../evt';
import './input.css'
 
class NbInput extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    emitter.addListener('nbInput11111', function (text) {
      console.log(text);
    })
  }
  render() {
 
    return (
      <input className="nb-basic-input"/>
    );
  }
}
 
export default NbInput;

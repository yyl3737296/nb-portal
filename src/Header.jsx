import React, { Component } from 'react';
 
class Header extends Component {
  static defaultProps = {
    label: ''
  }
  constructor(props) {
    super(props);
  }
  render() {
    const headStyle = {
      
    };
    if (this.props.data && typeof(this.props.data.content) == 'string') {
      return (
        <header className="nb-header" dangerouslySetInnerHTML={{__html: this.props.data}}>
        </header>
      );
    }
    else {
      return (
        <header className="nb-header">
        </header>
      );
    }
    
  }
}
 
export default Header;

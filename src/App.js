import React from 'react';
import Portal from './Portal'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './App.css'

function App() {
  let config = {
    isDraggable: true,
    isResizable: true,
    items: 12,
    margin: [15, 15],
    rowHeight: 100
  };
  /*setTimeout(function() {
    alert(2);
    config.rowHeight = 200;
  },3000);*/
  return (
    <div class="App">
      <Portal {...config}>
      </Portal>
    </div>
    
  );
}

export default App;
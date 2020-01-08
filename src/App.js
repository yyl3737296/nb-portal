import React from 'react';
import Portal from './Portal'
import './App.css'

function App() {
  let config = {
    isDraggable: false,
    isResizable: true,
    items: [
      {"x":0,"y":0,"w":2,"h":4,"id":"0", com:{
        type:'button'
      }},
      {"x":2,"y":0,"w":2,"h":2,"id":"1"},
      {"x":4,"y":0,"w":2,"h":4,"id":"2"},
      {"x":6,"y":0,"w":2,"h":4,"id":"3"},
      {"x":8,"y":0,"w":2,"h":5,"id":"4"}
    ],
    margin: [15, 15],
    rowHeight: 100
  };
  /*setTimeout(function() {
    alert(2);
    config.rowHeight = 200;
  },3000);*/
  return (
    <div className="App">
      <Portal {...config}>
      </Portal>
    </div>
    
  );
}

export default App;
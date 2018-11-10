import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { withAlert } from "react-alert";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {'queue': []}

    var socket = require('socket.io-client')('http://localhost:3333');
    socket.on('connect', function(){console.log("connected")});

    socket.on('tweet', (function(data){
      console.log("d:", data)
      this.setState({
        'queue': [...this.state.queue, data]
      })
      console.log("state updated:", this.state)
    }).bind(this));

    setInterval((function(){ 
        console.log("internal running")
        if (this.state.queue.length > 0) {
          const array = [...this.state.queue];
          const deleted = array.splice(0,1)
          this.props.alert.info(deleted[0].text)
          // this.setState({queue:array})
        }   
    }).bind(this), 1000);

    socket.on('disconnect', function(){
      console.log("done")
    });
  }

  render() {
    return (
      <div className="App">
        <MapContainer/>
        <input className="SearchField" type="text" />
      </div>
    );
  }
}

export default withAlert(App);

import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { withAlert } from "react-alert";

class App extends Component {

  constructor(props) {
    super(props)

    var socket = require('socket.io-client')('http://localhost:3333');
    socket.on('connect', function(){console.log("connected")});

    socket.on('tweet', (function(data){
      this.props.alert.info(data.text);
      console.log(data)
    }).bind(this));

    socket.on('disconnect', function(){
      console.log("done")
    });


    this.state = {markers: [{lat: 42.3357692, lng: -71.1556393, color: 'red'}, {lat: 38.826720, lng: -75.3701327, color: 'red'}]}


  }

  render() {

    return (
      <div className="App">
        <MapContainer markers={this.state.markers}/>
        <input className="SearchField" type="text" />
      </div>
    );
  }
}

export default withAlert(App);

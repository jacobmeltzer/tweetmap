import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { withAlert } from "react-alert";

class App extends Component {

  constructor(props) {
    super(props)

    this.socket = require('socket.io-client')('http://localhost:3333');
    this.socket.on('connect', function(){console.log("connected")});

    this.state = {markers: [], inputValue: 'trump'}

    this.socket.on('tweet', (function(data){
      this.props.alert.info(data.text);
      this.setState({markers: this.state.markers.concat([{lat: data.lat, lng: data.lon, color: data.color}])});
      // this.state = {markers: [{lat: data.lat, lng: data.lon}]};
    }).bind(this));

    this.socket.on('disconnect', function(){
      console.log("done")
    });


    // this.state = {markers: [{lat: 42.3357692, lng: -71.1556393, color: 'red'}, {lat: 38.826720, lng: -75.3701327, color: 'red'}]}


  }

  render() {
    return (
      <div className="App">
        <MapContainer markers={this.state.markers}/>
        <input className="SearchField" onChange={(evt) => this.updateInputValue(evt)}  type="text" />
        <button className="PauseButton" onClick={() => this.socket.emit('pause', 'now')}>Pause</button>
        <button className="ChangeTermButton" onClick={() => this.socket.emit('change', this.state.inputValue)}>Search</button>
      </div>
    );
  }

  updateInputValue(evt) {
    console.log(this.state.inputValue)
    this.setState({
      inputValue: evt.target.value
    });
  }
}

export default withAlert(App);

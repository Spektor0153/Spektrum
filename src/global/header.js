import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./header.css";

var socket;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001/"
    };

    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <header>
        
      </header>
    );
  }
}

export { Header, socket };

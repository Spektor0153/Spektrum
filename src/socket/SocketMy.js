import React, { Component } from "react";
import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://151.248.114.72:3001/");
export { socket };


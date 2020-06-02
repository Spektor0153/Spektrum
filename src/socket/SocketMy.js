import React, { Component } from "react";
import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://192.168.1.101:3001/");
export { socket };


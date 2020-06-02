import React, { Component } from "react";
import "./App.css";
import {Provider} from "react-redux";
import store from "./redux/store";
import MainLayer from './Components/MainLayer/MainLayer'
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <div className="App">
                  <MainLayer></MainLayer>

              </div>
        </Provider>
      );
  }
}

export default App;

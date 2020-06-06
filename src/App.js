import React, { Component } from "react";
import "./App.css";
import {Provider} from "react-redux";
import store from "./redux/store";
//import MainLayer from './Components/MainLayer/MainLayer'
import Settings from './Components/Settings/Settings'
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import {mobileAnalyse} from "./Components/NavHead/NavHeadAction"
import {connect} from "react-redux";
import {compose} from "redux";

class App extends Component {

  render() {
      return (
          <Provider store={store}>
              <div className="App">
                  <Settings></Settings>

              </div>
        </Provider>
      );
  }
}


export default App;

import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App'


export default class RouteConfig extends Component{
  render(){
    return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={App} />
          </Switch>
        </HashRouter>
    )
  }
}

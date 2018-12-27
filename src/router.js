import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App'
import ManagerGoodsList  from './container/managerGoodsList'
import StoreGoodsList from './container/storeGoodsList'


export default class RouteConfig extends Component{
  render(){
    return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/managerGoodsList" exact component={ManagerGoodsList} />
            <Route path="/storeGoodsList" exact component={StoreGoodsList} />
          </Switch>
        </HashRouter>
    )
  }
}

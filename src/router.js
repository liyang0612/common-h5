import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App'
import GoodsListStore from './container/GoodsListStore'


export default class RouteConfig extends Component{
  render(){
    return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/goodsListStore" exact component={GoodsListStore} />
          </Switch>
        </HashRouter>
    )
  }
}

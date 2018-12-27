import React from 'react'
import {Router, Route, Switch} from 'dva/router'
import App from './App'
import ManagerGoodsList from './container/managerGoodsList'
import StoreGoodsList from './container/storeGoodsList'

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/managerGoodsList" exact component={ManagerGoodsList}/>
        <Route path="/storeGoodsList" exact component={StoreGoodsList}/>
      </Switch>
    </Router>
  )
}

export default RouterConfig

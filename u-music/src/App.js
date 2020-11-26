import React from 'react'
// 一级路由出口
import Index from './pages'
import List from './pages/list'
import Play from './pages/play'


import {Switch,Route,Redirect}  from 'react-router-dom'
 class Home extends React.Component{
 render(){
  return (<div>
    {/* <h1>朱组件</h1> */}
    <Switch>
      <Route path='/index' component={Index}></Route>
      <Route path='/list' component={List}></Route>
      <Route path='/play' component={Play}></Route>
      <Redirect to='/index'></Redirect>
    </Switch>
  </div>)
  }
}
 export default Home
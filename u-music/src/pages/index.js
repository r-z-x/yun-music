import React from 'react'
import '../assets/css/index.css'
import home from '../views/home'
import rank from '../views/rank'
import search from '../views/search'
import{Switch,Route,Redirect,NavLink} from 'react-router-dom'
import imgUrl from '../assets/img/logo.png'
 class Home extends React.Component{
     
 render(){
    return (<div className='index'>
        <div className='header'>
            {/* <p>网易云音乐</p> */}
            <img src={imgUrl} alt=""/>
            <div className='load'>下载APP</div>
        </div>
            {/* <h1>index</h1>
             */}
             <div className='navBar'>
             <NavLink activeClassName='active' to='/index/home'>
             <span>推荐音乐</span>
             </NavLink>
             <NavLink activeClassName='active' to='/index/rank'>
             <span>热歌榜</span>
             </NavLink>
             <NavLink activeClassName='active' to='/index/search'>
             <span>搜索</span></NavLink>
             </div>
            <Switch>
                <Route path='/index/home' component={home}></Route>
                <Route path='/index/rank' component={rank}></Route>
                <Route path='/index/search' component={search}></Route>
                <Redirect to='/index/home'></Redirect>
            </Switch>
    </div>)
    }
}
 export default Home
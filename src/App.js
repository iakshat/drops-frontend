import React, {Component} from 'react';
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home/Home'
import Profile from './components/profile/Profile'
import Login from './components/auth/Login'
import SignUp from './components/auth/Signup'
import NavBar from './components/layouts/Navbar'
import SideNav from './components/layouts/Sidenav'
import Inventory from './components/inventory/Inventory'
import BloodDemand from './components/bloodDemand/BloodDemand'
import DonorRequests from './components/bloodDemand/DonorRequests'
import Logout from './components/auth/Logout'
import { connect } from 'react-redux';
import { recoverAuth } from './store/recoverAuth'
import { loginUser } from './store/authActions';
import Axios from 'axios';

Axios.interceptors.request.use(config => {
  console.log("request intercepted");
  var authHeaders = (localStorage.getItem("isLoggedIn")==="true")?({
    isLoggedIn : true,
    username : JSON.parse(localStorage.getItem("userData")).username,
    id : JSON.parse(localStorage.getItem("userData")).id,
    accessToken : JSON.parse(localStorage.getItem("userData")).accessToken
  }) : ({
    isLoggedIn : false
  });
  config.headers.authorization = JSON.stringify(authHeaders);
  console.log("request released with headers")

  return config;
})

class App extends Component {

  componentDidMount() {
    localStorage.setItem("serverURL", "https://bloodbank-backend.herokuapp.com")
    document.getElementById("loader").style.display = "none";
    recoverAuth(this.props.loginUser)
  }

  render(){

    return (
      <BrowserRouter>
        <div className="App">
          <SideNav />
          <NavBar />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/demand-blood" component={BloodDemand} />
            <Route path="/donor-requests" component={DonorRequests} />
          </div>
        </div>
      </BrowserRouter>
    );

  }


}

var mapDispatchToProps = (dispatch) => {
  return({
    loginUser : (user) => {dispatch(loginUser(user))}
  })
}

var mapStateToProps = (state) => {
  return({
    isLoggedIn : state.isLoggedIn,
    userData : state.userData
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

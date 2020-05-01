import React, { Component } from "react";
import Axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../../store/authActions'

class Login extends Component{

    state = {

    }

    handleChange = (e) => {
        var x = {};
        x[e.target.name] = e.target.value;
        this.setState(x);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var t = localStorage.getItem("serverURL")
        Axios.post(t+"/login", this.state)
            .then(res => {
                if(res.data.status === "invalid"){
                    document.getElementById("output").innerText = "Invalid Username or Password"
                }
                else if(res.data.status === "inactive"){
                    document.getElementById("output").innerText = "Acccount activation pending. Verification of certificates not complete."
                }
                else if(res.data.status === "disapproved"){
                    document.getElementById("output").innerText = "Account disapproved due to invalid certificate provided."
                }
                else{
                    document.getElementById("output").innerText = "Success!";
                    var user = res.data;
                    delete user["status"];
                    this.props.loginUser(user);
                    setTimeout(() => {this.props.history.push("/")}, 1400);
                }
            })
    }

    render() {
        return (
            <div className="container">
                <h3>Login Form</h3><br/><br/>
                <form onSubmit={this.handleSubmit}  name="form">
                    <div className="input-field">
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="red-text" id="output" /><br/>
                    <button className="btn" type="submit">Login</button>
                </form>
            </div>
        )
    }
}

var mapDispatchToProps = (dispatch) => {
    return({
        loginUser : (user) => {dispatch(loginUser(user))}
    })
}

export default connect(null, mapDispatchToProps)(Login);
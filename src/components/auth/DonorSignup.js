import React, { Component } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

class DonorForm extends Component{

    state = {

    }

    handleSubmit = (e) => {

        document.getElementById("output").innerText = "";
        e.preventDefault();
        if(!this.state.bloodGroup){
            document.getElementById("output").innerText = "Choose Bloodgroup Field";
            return;
        }
        // alert(JSON.stringify(this.state));
        if(this.state.cpassword !== this.state.password){
            document.getElementById("output").innerText = "Passwords don't match"
            this.setState({
                cpassword : "",
                password : ""
            })
            return;
        }

        var stcpy = this.state;
        delete stcpy["cpassword"];
        var userData = {
            ...stcpy,
            userType : "donor"
        }
        var t = localStorage.getItem("serverURL")
        Axios.post(t+"/signup", userData)
            .then(res => {
                if(res.data.status === "not available"){
                    document.getElementById("output").innerText = "Username not available"
                    this.setState({
                        username : ""
                    })
                }
                else if(res.data.state === "error"){
                    document.getElementById("output").innerText = "Server Error. Retry later."
                }
                else{
                    document.getElementById("output").innerText = "Success!";
                    setTimeout(() => {this.props.history.push("/login")}, 1400);
                }
            })


    }

    handleChange = (e) => {
        var x = {}
        x[e.target.name] = e.target.value;
        this.setState(x);
    }

    render() {

        return(
            <div>
                <form onSubmit={this.handleSubmit}  name="donor_form">
                    <div className="input-field">
                        <input type="text" name="name" placeholder="name" onChange={this.handleChange} required />
                        <label htmlFor="name">Full Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="Email" onChange={this.handleChange} required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} required />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="address" placeholder="Address" onChange={this.handleChange} required />
                        <label htmlFor="address">Your Full Address</label>
                    </div>
                    <div className="input-field">
                        <label>
                            <select onChange={this.handleChange} value="" name="bloodGroup" >
                                <option disabled hidden value="">Choose Blood Group</option>
                                <option value="o+">O+</option>
                                <option value="o-">O-</option>
                                <option value="a+">A+</option>
                                <option value="a-">A-</option>
                                <option value="b+">B+</option>
                                <option value="b-">B-</option>
                                <option value="ab+">AB+</option>
                                <option value="ab-">AB-</option>
                                <option value="dn">Don't Know</option>
                            </select>
                            <span>Blood Group</span>
                        </label>
                    </div><br/><br/><br/><br/><br/>
                    <div className="input-field">
                        <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleChange} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" value={this.state.cpassword} name="cpassword" placeholder="Confirm Password" onChange={this.handleChange} required />
                        <label htmlFor="cpassword">Confirm Password</label>
                    </div>
                    <div className="red-text" id="output"></div><br/><br/>
                    <button className="btn btn-large" type="submit">Make Account</button>
                </form>
            </div>
        )
    }
}

export default withRouter(DonorForm);
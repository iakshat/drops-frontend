import React, { Component } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'


class HospitalForm extends Component{

    state = {

    }

    handleSubmit = (e) => {

        e.preventDefault();
        // alert(JSON.stringify(this.state));
        if(this.state.cpassword !== this.state.password){
            document.getElementById("output").innerText = "Passwords don't match"
            this.setState({
                cpassword : "",
                password : ""
            })
        }
        var stcpy = this.state;
        delete stcpy["cpassword"]
        var file = document.getElementById("file-input").files[0];
        // var userData = {
        //     ...stcpy,
        //     userType : "hospital"
        // }
        var fd = new FormData(document.getElementById("hospital_form"));
        console.log(fd)
        // fd.append("data", userData);
        fd.append("certificate", file)
        var t = localStorage.getItem("serverURL")
        console.log(fd)
        Axios.post(t+"/signup", fd)
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

    handleFileChange = (e) => {
        document.getElementById("output").innerText = "";
        if(((e.target.files[0].size/1024)/1024) > 1)
            document.getElementById("output").innerText = "Document is Oversized. Upload a compressed file."
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}  id="hospital_form">
                    <div className="input-field">
                        <input type="text" name="name" placeholder="name" onChange={this.handleChange} />
                        <label htmlFor="name">Hospital Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                        <label htmlFor="email">Official Email</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="address" placeholder="Address" onChange={this.handleChange} />
                        <label htmlFor="address">Hospital's full Address</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="identity" placeholder="Hospital Identification Number" onChange={this.handleChange} />
                        <label htmlFor="identity">Hospital Identification Number</label>
                    </div>
                    <div className="input-field file-field">
                        <div className="btn btn-small">
                            <span>Upload Hospital Certificate</span>
                            <input type="file" id="file-input" onChange={this.handleFileChange}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                    <div className="input-field">
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="cpassword" placeholder="Confirm Password" onChange={this.handleChange} />
                        <label htmlFor="cpassword">Confirm Password</label>
                    </div>
                    <input type="text" name="userType" value="hospital" className="hide"/>
                    <div className="red-text" id="output" /><br/><br/>
                    <button className="btn btn-large" type="submit">Make Account</button>
                </form>
            </div>
        )
    }
}

export default withRouter(HospitalForm);
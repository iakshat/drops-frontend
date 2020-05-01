import React, { Component } from 'react'
import Axios from 'axios'

class Profile extends Component {

    state = {
        currState : true
    }

    componentDidMount() {
        // Get User data through axios
        var t = localStorage.getItem("serverURL")
        Axios.get(t+"/info/user")
            .then(res => {
                if(res.data.status === "success"){
                    this.setState({
                        ...res.data
                    })
                }
                else{
                    document.getElementById("output").textContent = "Network Error!"
                }
            })
    }

    enableAll = () => {
        this.setState({
            currState : false
        })
    }

    updateUser = () => {
        //Send User update through Axios
        console.log("state to update now: ",this.state)
        var t = localStorage.getItem("serverURL")
        Axios.post(t+"/update/user", this.state)
            .then(res => {
                if(res.data.status === "success"){
                    document.getElementById("output").innerText = "Success!";
                    setTimeout(() => {this.props.history.push("/");}, 1500);
                }
                else{
                    document.getElementById("output").innerText = "Invalid Query";
                    setTimeout(() => {window.location.reload()}, 1000);
                }
            })

        this.setState({
            currState : true
        })
    }

    handleChange = (e) => {
        var x = {};
        x[e.target.name] = e.target.value;
        this.setState(x)
        console.log(this.state)
    }
    handleSelectChange = (e) => {
        var x = {};
        x[e.target.name] = e.target.value;
        this.setState(x)
        console.log(this.state)
    }

    render(){
        return(
            <div className="container">
                <h3>Profile</h3>
                <form name="f">
                    <div className="input-field">
                        <span>Name</span>
                        <input type="text" defaultValue={this.state.name} disabled={this.state.currState} name="name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <span>Email</span>
                        <input type="email" defaultValue={this.state.email} disabled={this.state.currState} name="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <span>Address</span>
                        <input type="text" defaultValue={this.state.address} disabled={this.state.currState} name="address" onChange={this.handleChange} />
                    </div>
                    <div className="input-field" style={{display : (this.state.userType==="donor")?"":"none"}}>
                        <label>
                            <span>Blood Group</span><br/><br/>
                            <h6 style={{display : this.state.currState?"inline":"none"}}>{this.state.bloodGroup}</h6>
                            <select style={{display : this.state.currState?"none":"inline"}} name="bloodGroup" className="browser-default" defaultValue={this.state.bloodGroup} onClickCapture={this.handleSelectChange}>
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
                        </label>
                    </div>
                </form><br/><br/><br/><br/><br/>
                <div className="red-text" id="output" /><br/>
                <div style={{display : this.state.currState?"inline":"none"}}>
                    <button className="btn" onClick={this.enableAll}>Edit</button>
                </div>
                <div style={{display : this.state.currState?"none":"inline"}}>
                    <button className="btn" onClick={() => {window.location.reload()}}>Discard</button><span>   </span>
                    <button className="btn" onClick={this.updateUser}>Save</button>
                </div>
            </div>
        )
    }

}

export default Profile;
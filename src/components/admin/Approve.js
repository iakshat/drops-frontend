import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Approve extends Component {

    state = {
        users : null
    }

    componentDidMount() {
        var t = localStorage.getItem("serverURL");
        axios.get(t+"/approve-certificate")
            .then(res => {
                if(res.data.status === "success"){
                    document.getElementById("output").textContent = "Success!"
                    this.setState({users : res.data.users})
                    setTimeout(() => {document.getElementById("output").textContent = ""}, 1500);
                }
                else if(res.data.status === "invalid query"){
                    document.getElementById("output").textContent = "YOU ARE NOT ALLOWED TO ACCESS THIS END POINT. GET BACK TO THE SAFE ZONE"
                    setTimeout(() => {this.props.history.push("/");}, 1500);
                }
                else{
                    document.getElementById("output").textContent = "Network Errror";
                }
            })
    }

    approve = (id) => {
        var t = localStorage.getItem("serverURL");
        axios.post(t+"/approve-certificate", {userId : id, todo : "approve"})
            .then(res => {
                if(res.data.status === "success"){
                    window.location.reload();
                }
                else if(res.data.status === "invalid query"){
                    document.getElementById("output").textContent = "YOU ARE NOT ALLOWED TO ACCESS THIS END POINT. GET BACK TO THE SAFE ZONE"
                    setTimeout(() => {this.props.history.push("/");}, 1500);
                }
                else{
                    document.getElementById("output").textContent = "Could not approve!"
                }
            })
    }

    reject = (id) => {
        var t = localStorage.getItem("serverURL");
        axios.post(t+"/approve-certificate", {userId : id, todo : "reject"})
            .then(res => {
                if(res.data.status === "success"){
                    window.location.reload();
                }
                else if(res.data.status === "invalid query"){
                    document.getElementById("output").textContent = "YOU ARE NOT ALLOWED TO ACCESS THIS END POINT. GET BACK TO THE SAFE ZONE"
                    setTimeout(() => {this.props.history.push("/");}, 1500);
                }
                else{
                    document.getElementById("output").textContent = "Could not reject!"
                }
            })
    }

    render() {
        var t = localStorage.getItem("serverURL");
        var items = this.state.users?(this.state.users.length?(
            this.state.users.map(user => {
                return(
                    <div className="card col s4" key={user.id}>
                        <h6>{user.username}</h6>
                        <h6>{user.name}</h6>
                        <h6>{user.address}</h6>
                        <a href={t+"/check-certificate/"+user.username} target="_blank" rel="noopener noreferrer" className="btn btn-small right">Certificate</a>
                        <button className="btn" onClick={() => {this.approve(user.id)}}>Approve</button>
                        <button className="btn" onClick={() => {this.reject(user.id)}}>Reject</button>
                    </div>
                )
            })
        ):("No Pending Requests")):(
            "Loading..."
            )
        return(
            <div className="container">
                <h3>Admin Approve Panel</h3>
                <div className="red-text" id="output" />
                <div className="row">
                    {items}
                </div>
            </div>
        )
    }
}

export default withRouter(Approve);
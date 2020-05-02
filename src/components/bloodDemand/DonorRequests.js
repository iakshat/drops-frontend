import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'

class DonorRequest extends Component {

    state = {
        requests : null
    }

    componentDidMount() {
        var t = localStorage.getItem("serverURL")
        Axios.get(t+"/requests")
            .then(res => {
                if(res.data.status === "success"){
                    document.getElementById("output").textContent = "Data Retrieved";
                    console.log("reqs : ", res.data.requests)
                    res.data.requests.sort((a,b) => {return a.id<b.id})
                    this.setState({
                        requests : res.data.requests
                    })
                    setTimeout(() => {document.getElementById("output").textContent = ""}, 1000)
                }
                else{
                    document.getElementById("output").textContent = "Network Error";
                }
            })
    }

    deleteRequest = (id) => {
        if(window.confirm("Are you sure you want to delete the request?")){
            var t = localStorage.getItem("serverURL")
            Axios.post(t+"/delete-donor-request", {reqId : id})
                .then(res => {
                    if(res.data.status === "success"){
                        document.getElementById("output").innerText = "Success!";
                        setTimeout(() => {window.location.reload()}, 1000);
                    }
                    else if(res.data.status === "user mismatch")
                    {
                        console.log("user mismatch")
                        document.getElementById("output").innerText = "You Can't delete requests from others"
                    }
                    else{
                        document.getElementById("output").innerText = "Failed";   
                    }
                })
        }
    }

    render() {
        var ress = this.state.requests?(this.state.requests.length?(
            this.state.requests.map(req => {
                var hide = (this.props.userData.username === req.username)?(""):("hide");
                return(
                    <div className="collection-item row" key={req.id}>
                        <div className="col s1">{req.id}</div>
                        <div className="col s7">{req.name} {req.address}</div>
                        <div className="col s1 center">{req.bloodGroup.toUpperCase()}</div>
                        <div className="col s2 left red-text"><img src="/live_icon.gif" alt="LIVE" width="80px" className={(req.status==="active")?"":"hide"}></img></div>
                        <div className={"col s1 right "+hide} onClick={() => {this.deleteRequest(req.id)}}><i className="right material-icons">close</i></div>
                    </div>
                )
            })
        ):("No previous requests")) : ("Loading...")
        return(
            <div className="container">
                <h3>Previous Donation Requests</h3><br/><br/>
                <div className="red-text" id="output"></div><br/>
                <div className="collection">
                    {ress}
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return{
        userData : state.userData
    }
}

export default connect(mapStateToProps)(DonorRequest);
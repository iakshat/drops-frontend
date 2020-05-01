import React, { Component } from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class BloodDemand extends Component {

    state = {
        searchResults : null,
        searchBloodgroup : null,
        selectedBloodGroup : null,
    }

    componentDidMount() {
        window.initForms();
    }

    handleChange = (e) => {
        this.setState({selectedBloodGroup : document.getElementById("bg").value})
    }

    searchBlood = () => {
        if(!this.state.selectedBloodGroup)
            return;
        var bg = this.state.selectedBloodGroup;
        var t = localStorage.getItem("serverURL")
        Axios.post(t+"/search-blood", {bloodGroup : bg})
            .then(res => {
                if(res.data.status === "success"){
                    console.log(res.data);
                    document.getElementById("search-result").classList.remove("hide");
                    this.setState({
                        searchBloodgroup : res.data.bloodGroup,
                        searchResults : res.data.searchResults
                    })
                }
                else{
                    document.getElementById("err-log").textContent = "Error in getting Search Points";
                }
            })
    }

    createDonorRequest = () => {
        if(window.confirm("Are you sure you wanna create donor demand for blood group "+this.state.searchBloodgroup)){
            var t = localStorage.getItem("serverURL")
            Axios.post(t+"/create-donor-request", {bloodGroup : this.state.searchBloodgroup})
                .then(res => {
                    if(res.data.status === "success"){
                        document.getElementById("output").innerText = "Success!";
                        setTimeout(() => {this.props.history.push("/donor-requests")},1200);
                    }
                    else{
                        document.getElementById("output").innerText = "Failed!"
                    }
                })
        }
        else
            alert("deamand discarded")
    }

    render() {

        var results = this.state.searchResults ? (this.state.searchResults.length ? (
            this.state.searchResults.map(result => {
                return(
                    <a href={"https://www.google.com/maps/place/"+result.geometry.lat+","+result.geometry.lng} rel="noopener noreferrer" target="_blank" key={result.id}><blockquote className="collection-item">{result.address}<span className="right">{result.unitCount} units</span></blockquote></a>
                )
            })
        ) : ("No Bloodbanks available nearby with your request")) : ("Loading Results...");
        return (
            <div className="container row">
                <br/><br/>
                <div className="card medium hoverable col s12 offset-s2">
                    <h3>Blood Demand Handler</h3><br/><br/><br/>
                    <div className="card-title col s4">
                        <select value="" onChange={this.handleChange} id="bg">
                            <option disabled hidden value="">Choose Blood Group</option>
                            <option value="o+">O+</option>
                            <option value="o-">O-</option>
                            <option value="a+">A+</option>
                            <option value="a-">A-</option>
                            <option value="b+">B+</option>
                            <option value="b-">B-</option>
                            <option value="ab+">AB+</option>
                            <option value="ab-">AB-</option>
                        </select>
                        <br/><br/>
                        <div className="red-text" id="err-log" /><br/>
                        <button className="btn btn-medium truncate" onClick={this.searchBlood}>Check for Availability</button>
                    </div>
                </div>
                <div className="card col s12 offset-s2 hoverable hide" id="search-result">
                    <h4>Blood Availability in Nearby BloodBanks for {this.state.searchBloodgroup?(this.state.searchBloodgroup.toUpperCase()):("")}</h4><br/>
                    <ul className="col s8 offset-s2">
                        {results}
                    </ul>
                    <div className="red-text" id="output" />
                    <ul><li className="left">Click on results to get locations</li></ul><br/><br/><br/>
                    <button className="btn btn-medium right" onClick={this.createDonorRequest}>Create Donation Request</button><br/><br/><br/><br/><br/>
                </div>
            </div>
        )
    }
}

export default withRouter(BloodDemand);
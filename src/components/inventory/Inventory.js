import React, { Component } from 'react'
import BloodCard from './BloodGroupCard'
import Axios from 'axios'

class Inventory extends Component{

    state = {
        inventory : undefined
    }

    componentDidMount() {

        var t = localStorage.getItem("serverURL")
        Axios.get(t+"/get-inventory")
            .then(res => {
                if(res.data.status === "success"){
                    var inv = [];
                    inv.push({unitCount : res.data.inventory['o+'], bloodGroup : "o+"})
                    inv.push({unitCount : res.data.inventory['o-'], bloodGroup : "o-"})
                    inv.push({unitCount : res.data.inventory['a+'], bloodGroup : "a+"})
                    inv.push({unitCount : res.data.inventory['a-'], bloodGroup : "a-"})
                    inv.push({unitCount : res.data.inventory['b+'], bloodGroup : "b+"})
                    inv.push({unitCount : res.data.inventory['b-'], bloodGroup : "b-"})
                    inv.push({unitCount : res.data.inventory['ab+'], bloodGroup : "ab+"})
                    inv.push({unitCount : res.data.inventory['ab-'], bloodGroup : "ab-"})
                    this.setState({inventory : inv});
                }
                else if(res.data.status === "no inventory"){
                    this.setState({inventory : []})
                    document.getElementById("output").textContent = "No Inventory present for you"
                    document.getElementById("add-inv-form").classList.remove("hide");
                    document.getElementById("update-btn").classList.add("hide");
                }
                else{
                    document.getElementById("output").textContent = "Network Error!";
                }
            })

    }

    handleChange = (e) => {
        var x = {};
        x[e.target.name] = e.target.value;
        this.setState({
            newInventory : {...this.state.newInventory, ...x}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById("output").textContent = "Submitting Data..."
        var t = localStorage.getItem("serverURL")
        Axios.post(t+"/update-inventory", this.state.newInventory)
            .then(res => {
                if(res.data.status === "success"){
                    document.getElementById("output").innerText = "Success!"
                    window.location.reload();
                }
                else{
                    document.getElementById("output").innerText = "Network Error!"
                }
            })
    }

    render() {

        var bcs = this.state.inventory ? (this.state.inventory.length ? (this.state.inventory.map(bg => {
            return(<BloodCard key={bg.bloodGroup} data={bg} />)
        })) : ("")) : (
            "Loading Inventory"
        )
        return(
            <div className="container">
                <h3>Inventory</h3>
                <div className="red-text" id="output" /><br/>
                <div className="row">
                    {bcs}
                </div>
                <button className="btn btn-medium" id="update-btn" onClick={() => {document.getElementById("add-inv-form").classList.remove("hide");document.getElementById("update-btn").classList.add("hide")}}>Update Inventory</button>
                <br/><br/>
                <form id="add-inv-form" className="row hide">
                    <h5>Add Inventory :</h5>
                    <div className="input-field col s2">
                        <input name="o+" type="text" onChange={this.handleChange} />
                        <label>O+</label>
                    </div>
                    <div className="input-field col s2">
                        <input name="o-" type="text" onChange={this.handleChange} />
                        <label>O-</label>
                    </div><br/><br/><br/><br/>
                    <div className="input-field col s2">
                        <input name="b+" type="text" onChange={this.handleChange} />
                        <label>B+</label>
                    </div>
                    <div className="input-field col s2">
                        <input name="b-" type="text" onChange={this.handleChange} />
                        <label>B-</label>
                    </div><br/><br/><br/><br/>
                    <div className="input-field col s2">
                        <input name="a+" type="text" onChange={this.handleChange} />
                        <label>A+</label>
                    </div>
                    <div className="input-field col s2">
                        <input name="a-" type="text" onChange={this.handleChange} />
                        <label>A-</label>
                    </div><br/><br/><br/><br/>
                    <div className="input-field col s2">
                        <input name="ab+" type="text" onChange={this.handleChange} />
                        <label>AB+</label>
                    </div>
                    <div className="input-field col s2">
                        <input name="ab-" type="text" onChange={this.handleChange} />
                        <label>AB-</label>
                    </div><br/><br/><br/><br/><br/>
                    <button className="btn" onClick={this.handleSubmit}>Add Inventory</button>
                </form>
            </div>
        )
    }
}

export default Inventory;
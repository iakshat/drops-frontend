import React, { Component } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'

class NavBar extends Component {

    state = {
        notifs : [],
        show : false
    }

    componentDidMount(){
        window.initNavbar();
    }

    componentDidUpdate(){
        if(this.props.isLoggedIn && this.props.userData.userType === "donor"){
            var t = localStorage.getItem("serverURL")
            Axios.get(t+"/notifications")
                .then(res => {
                    if(res.data.status === "success"){
                        console.log("debug output : ",res.data.notifs);
                        if(res.data.notifs.length !== this.state.notifs.length)
                            this.setState({notifs : res.data.notifs});
                    }
                })
        }
    }

    showNotif = () => {
        this.setState({show : !this.state.show})
        if(this.state.show){
            document.getElementById("output_nav").classList.remove("hide");
        }
        else{
            document.getElementById("output_nav").classList.add("hide");
        }
    }

    render() {

        var notifs = this.state.notifs.map(n => {
            var link = "https://www.google.com/maps/place/"+n.geometry.lat+","+n.geometry.lng;
            return(
                <li onClick={()=>{window.open(link, '_blank')}} target="_blank" className="black-text"><h6>{n.name}</h6></li>
            )
        })
        var notifBtn = this.state.notifs.length? (
            <div className="right brand-logo">
                <i className="material-icons" onClick={this.showNotif}>notifications_active</i>
            </div>
        ): (null);
        return(
            <nav className="top-nav" style={{"backgroundColor" : "#e0383b"}}>
                <div className="container">
                    <div className="nav-wrapper">
                        <a className="sidenav-trigger hide-on-large-only left" data-target="slide-out" href="#!">
                            <i className="material-icons">menu</i>
                        </a>
                        <div className="center brand-logo">
                            Drops
                        </div>
                    </div>
                    {notifBtn}
                </div>
                <br/><br/>
                <div className="row black-text">
                    <div id="output_nav" className="card col s2 right small hoverable hide">
                        <h5>Donation Demands : </h5>
                        {notifs}
                        <p className="red-text">Click on blood banks name to proceed</p>
                    </div>
                </div>
            </nav>
        )
    }
}

var mapStateToProps = (state) => {
    return({
        isLoggedIn : state.isLoggedIn,
        userData : state.userData
    })
}

export default connect(mapStateToProps)(NavBar);
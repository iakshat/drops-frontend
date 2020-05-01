import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks'

class SideNav extends Component {

    componentDidMount() {

        var liBox = document.getElementById("side-nav");
        var btns = liBox.getElementsByTagName("li");
        for(var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            btn.addEventListener("click", (e) => {
                var curr = liBox.getElementsByClassName("active")[0];
                console.log(curr)
                if(curr)
                    curr.className = "";
                e.target.parentElement.className += " active";
            })
        }
    }

    render() {

        var links = (this.props.isLoggedIn)?(
            <SignedInLinks userType={this.props.userData.userType} />
        ):(
            <SignedOutLinks />
        )
        return(
            <ul className="sidenav sidenav-fixed" id="side-nav">

                <li className="logo">
                    <div className="brand-logo center">
                        <img src="/blood_logo.png" alt="Drops" width="200px" />
                    </div>
                </li>
                <li className="version center">Version : 0.0.1</li><br/>
                <li className="active"><Link to="/">Home</Link></li>
                {links}
            </ul>
        )
    }
}

var mapStateToProps = (state) => {
    return({
        isLoggedIn : state.isLoggedIn,
        userData : state.userData
    })
}

export default connect(mapStateToProps)(SideNav);
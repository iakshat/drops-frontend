import React from 'react'
import { logoutUser } from '../../store/authActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

var Logout = ({logoutUser, history}) => {
    setTimeout(() => {
        logoutUser();
        history.push("/");
    }, 500)
    return(
        <div className="container">
            <h3>Logging Out...</h3>
        </div>
    )
}

var mapDispatchToProps = (dispatch) => {
    return({
        logoutUser : () => {dispatch(logoutUser())}
    })
}

export default connect(null, mapDispatchToProps)(withRouter(Logout));
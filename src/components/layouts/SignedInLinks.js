import React from 'react';
import { Link } from 'react-router-dom';


var SignedInLinks = ({userType}) => {
    var hosp = (userType==="donor")?(null):(
        <div>
            <li className=""><Link to="/demand-blood">Demand Blood</Link></li>
            <li className=""><Link to="/donor-requests">Previous Dontaion Demands</Link></li>
        </div>
    )
    var bb = (userType==="bloodbank")?(
        <li className=""><Link to="/inventory">Inventory</Link></li>
    ):(null)
    return(
        <div>
            <li className=""><Link to="/profile">Profile</Link></li>
            {hosp}
            {bb}
            <li className=""><Link to="/logout">Logout</Link></li>
        </div>
    )
}

export default SignedInLinks;
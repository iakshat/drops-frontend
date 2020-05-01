import React from 'react';
import { Link } from 'react-router-dom';


var SignedOutLinks = () => {
    return(
        <div>
            <li className=""><Link to="/login">Login</Link></li>
            <li className=""><Link to="/signup">SignUp</Link></li>
        </div>
    )
}

export default SignedOutLinks;
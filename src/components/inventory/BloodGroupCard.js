import React, { Component } from 'react'

class BloodCard extends Component {

    render(){
        var { bloodGroup, unitCount } = this.props.data;
        // expDates.sort((a, b) => {return a>b;});
        // expDates = expDates.map(dt => {return(<p>{dt}</p>)})
        return(
            <div className="col s12 m4 center">
                <div className="card hoverable">
                    <div className="card-action activator">
                        <div className="card-image activator">
                            <img src="/blood_logo.png" alt="Loading.." className="activator" />
                            <span className="card-title activator black-text"><h1>{bloodGroup}</h1></span>
                        </div>
                        <div className="card-content activator">
                            <h4><span className="">{unitCount} units</span></h4>
                        </div>
                    </div>
                    {/* <div className="card-reveal">
                        <span className="card-title">Nearest Expiry Dates<i className="material-icons right">close</i></span>
                        <br/>
                        <p>{expDates}</p>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default BloodCard;
import React, { Component } from 'react'
import DonorForm from './DonorSignup'
import HospitalForm from './HospitalSignup'
import BloodbankForm from './BloodbankSignup'

class Signup extends Component {

    state = {
        value : null,
        formToShow : <DonorForm />
    }

    componentDidMount() {
        window.initForms();

        document.getElementById("setDonor").addEventListener("change", () => {
            this.setState({
                formToShow : <DonorForm />
            })
            console.log("sedskf");
            window.initForms();
        })
        document.getElementById("setHospital").addEventListener("change", () => {
            this.setState({
                formToShow : <HospitalForm />
            })
        })
        document.getElementById("setBloodbank").addEventListener("change", () => {
            this.setState({
                formToShow : <BloodbankForm />
            })
        })
    }

    render() {
        return(
            <div className="container">
                <h3>SignUp Form</h3><br/><br/>
                <label>
                    <input type="radio" name="type" id="setDonor" defaultChecked />
                    <span>Donor</span>
                </label>
                <label>
                    <input type="radio" name="type" id="setHospital" />
                    <span>Hospital</span>
                </label>
                <label>
                    <input type="radio" name="type" id="setBloodbank" />
                    <span>Blood Bank</span>
                </label>
                    <br/><br/><br/>
                {this.state.formToShow}
            </div>
        )
    }
}

export default Signup;
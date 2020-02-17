import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import defaultUserImg from "../images/dafault_user_img.png";
import { history } from '../helpers/history';
import { connect } from "react-redux";
import { userActions } from '../actions/userActions';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class DoctorComponent extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    bookApmnt(id){
        console.log(id);
        //history.push("/doctors/appointment");
        this.props.appointmentDoctorId(id);
        this.props.history.push("/doctors/appointment");
    }
    render(){
        return (
            <MDBCard className="doctorCard">
                <div className="row">
                    <div className="col-md-3 text-center">
                        <img src={defaultUserImg} className="imageRadius" alt="Avatar" width="50%"/>
                    </div>
                    <div className="col-md-6 docDetaildiv">
                        <div className="doctorName bold">Dr. {this.props.data.doctorName}</div>
                        <div className="doctorTag">{this.props.data.specialist}</div>
                        <div className="doctorExperience">{this.props.data.experience} Years of experience overall</div>
                        <div className="doctorHospital">{this.props.data.hospitalName}, {this.props.data.hospitalAddress}</div>
                    </div>
                    <div className="col-md-3 docappdiv">
                        Consultation Fee - {this.props.data.consultFee} Rupees <br/>
                        <MDBBtn className="loginButton" onClick={this.bookApmnt.bind(this,this.props.data.doctorId)}>Book Appointment</MDBBtn>
                    </div> 
                </div>
            </MDBCard>
        )
    }
}
function mapState(state) {
    const {authentication, registration } = state;
    const {signUperror} = registration;
    const { loggedIn, user,loginerror } = authentication;
    const signUpApiError = signUperror;
    const signInApiError = loginerror;
    return { user, loggedIn, signInApiError, signUpApiError};
  }
  
  const actionCreators = {
    appointmentDoctorId : userActions.appointmentDoctorId,
  };

  
export default compose(
    withRouter,
    connect(null, actionCreators))(DoctorComponent);
   //export default connect(null, actionCreators)(DoctorComponent);
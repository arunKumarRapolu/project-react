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
    bookApmnt(data){
        //history.push("/doctors/appointment");
        this.props.appointmentDoctor(data);
        this.props.history.push("/doctors/appointment");
    }
    render(){
        return (
            <MDBCard className="doctorCard">
                <div className="row">
                    <div className="col-md-3 text-center">
                        <img src={this.props.data.img} className="imageRadius" alt="Avatar" width="50%"/>
                    </div>
                    <div className="col-md-6 docDetaildiv">
                        <div className="doctorName bold">{this.props.data.name}</div>
                        <div className="doctorTag">{this.props.data.designation}</div>
                        <div className="doctorExperience">{this.props.data.experience} Years of experience</div>
                        <div className="doctorHospital">{this.props.data.address}</div>
                    </div>
                    <div className="col-md-3 docappdiv">
                        Consultation Fee - {this.props.data.fee} Rupees <br/>
                        <MDBBtn className="loginButton" onClick={this.bookApmnt.bind(this,this.props.data)}>Book Appointment</MDBBtn>
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
    appointmentDoctor : userActions.appointmentDoctor,
  };

  
export default compose(
    withRouter,
    connect(null, actionCreators))(DoctorComponent);
   //export default connect(null, actionCreators)(DoctorComponent);
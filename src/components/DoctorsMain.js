import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import DoctorComponent from "./DoctorComponent";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { doctorActions } from '../actions/doctorActions';

class DoctorsMain extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
    }

    componentDidMount(){
        this.props.getDoctors();
    }
    render(){
        const renderDoctors = this.props.doctorArr.map((val,key) => {
                return(
                    <DoctorComponent key={key} data={val}/>
                )
        });

        return(
            <div className="container">
            <div className="row col-12 inputBox">
                <div className="col-4 locationInput">
                    <div className="col-12 noPad ourDoctors">Our Doctors</div>
                </div> 
                <div className="col-4 searchInput ml-auto">
                    <MDBInput label="Search Doctors" outline size="sm" icon="search" />
                </div>
            </div>
            {this.props.doctorArr.length > 0 ? renderDoctors : ''}
            </div>
        )
    }
}


function mapState(state) {
    const {registration,authentication, doctorRelated } = state;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
  const doctorArr = doctorRelated.doctorsList;
    return{ auth, doctorArr};
}

const actionCreators = {
    getDoctors: doctorActions.getDoctors
  };

export default compose(withRouter,connect(mapState, actionCreators))(DoctorsMain);
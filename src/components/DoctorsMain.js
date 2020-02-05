import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import defaultUserImg from "../images/dafault_user_img.png";

class DoctorsMain extends Component {
    constructor(props){
        super(props);
    }
    render(){
        var doctorsList = [
            {
                doctorName : "Venkateshwarlu",
                specialist : "General Physician",
                experience : "15",
                hospitalName : "Citizens Hospital",
                hospitalAddress : "Nallagandla, Hyderabad",
                consultFee : "700"
            },
            {
                doctorName : "Satish",
                specialist : "Orthopedicist",
                experience : "10",
                hospitalName : "Medicover Hospitals",
                hospitalAddress : "Madhapur, Hyderabad",
                consultFee : "600"
            }
        ]
        const renderDoctors = doctorsList.map((val,key) => {
                return(
                    <MDBCard className="doctorCard">
                        <div className="col-12 row">
                            <div className="col-3 text-center">
                                <img src={defaultUserImg} className="imageRadius" alt="Avatar" width="50%"/>
                            </div>
                            <div className="col-6 docDetaildiv">
                                <div className="doctorName bold">Dr. {val.doctorName}</div>
                                <div className="doctorTag">{val.specialist}</div>
                                <div className="doctorExperience">{val.experience} Years of experience overall</div>
                                <div className="doctorHospital">{val.hospitalName}, {val.hospitalAddress}</div>
                            </div>
                            <div className="col-3 docappdiv">
                                Consultation Fee - 700 Rupees <br/>
                                <MDBBtn className="loginButton">Book Appointment</MDBBtn>
                            </div>
                        </div>
                    </MDBCard>
                )
        });
        

        return(
            <div>
            <div className="row col-12 inputBox">
                <div className="col-4 locationInput">
                    <div className="col-12 noPad ourDoctors">Our Doctors</div>
                </div> 
                <div className="col-4 searchInput ml-auto">
                    <MDBInput label="Search Doctors" outline size="sm" icon="search" />
                </div>
            </div>
            {renderDoctors}
            </div>
        )
    }
}

export default DoctorsMain
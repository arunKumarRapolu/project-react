import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import DoctorComponent from "./DoctorComponent";

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
                consultFee : "700",
                doctorId:1
            },
            {
                doctorName : "Satish",
                specialist : "Orthopedicist",
                experience : "10",
                hospitalName : "Medicover Hospitals",
                hospitalAddress : "Madhapur, Hyderabad",
                consultFee : "600",
                doctorId:2
            }
        ]
        const renderDoctors = doctorsList.map((val,key) => {
                return(
                    <DoctorComponent key={key} data={val}/>
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
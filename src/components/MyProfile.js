import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBLink, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import profile_img from "../images/profile_pi.jpg";
import profile_address from "../images/profile_address.png";
import profile_pwd from "../images/profile_pwd.png";

class MyProfile extends Component {
    render(){
        return(
            <div className="container">
                <MDBCard className="profile_pi">
                   <div className="row">
                        <div className="col-md-1">
                            <img src={profile_img} className="profile_img" width="50%"/>
                        </div>
                        <div className="col-md-5 profile_head">
                            Personal Information
                        </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">Name :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">Email :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">Mobile Number :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" />
                       </div>
                   </div>
                </MDBCard>
                <MDBCard className="profile_pi">
                   <div className="row">
                        <div className="col-md-1">
                            <img src={profile_address} className="profile_img" width="50%"/>
                        </div>
                        <div className="col-md-5 profile_head_address">
                            Adressess
                        </div>
                   </div>
                   <div className="row">
                       <div className="col-md-1"></div>
                       <div className="col-md-5">
                            <MDBCard className="profile_addressCard">
                                <div className="address_div">
                                <b>Shiva Kumar </b><br/>
                                H.No : 2-2-2 <br />
                                Street No. 1, 12th Cross <br/>
                                Gachibowli <br/>
                                Hyderabad <br />
                                500032
                                </div>
                                <div>
                                <MDBBtn color="white" className="adress_button_first">Edit</MDBBtn>
                                <MDBBtn color="white" className="adress_button">Delete</MDBBtn>
                                </div>
                            </MDBCard>
                       </div>
                       <div className="col-md-5">
                            <MDBCard className="profile_addressCard">
                            <div className="address_div">
                                <b>Shiva Kumar </b><br/>
                                H.No : 2-2-2 <br />
                                Street No. 1, 12th Cross <br/>
                                Gachibowli <br/>
                                Hyderabad <br />
                                500032
                                </div>
                                <div>
                                <MDBBtn color="white" className="adress_button_first">Edit</MDBBtn>
                                <MDBBtn color="white" className="adress_button">Delete</MDBBtn>
                                </div>
                            </MDBCard>
                       </div>
                   </div>
                   <div className="row">
                        <div className="col-md-10 text-right">
                        <MDBBtn outline>Add New</MDBBtn>
                        </div>
                   </div>
                </MDBCard>
                <MDBCard className="profile_pi">
                    <div className="row">
                        <div className="col-md-1">
                            <img src={profile_pwd} className="profile_img" width="50%"/>
                        </div>
                        <div className="col-md-5 profile_head_address">
                            Change Password
                        </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">Old Password :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">New Password :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-1"></div>
                       <div className="col-md-3 text-right profile_label">Confirm New Password :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" />
                       </div>
                   </div>
                </MDBCard>
                <div className="row">
                        <div className="col-md-12 text-right profile_footerButtons">
                        <MDBBtn>Back</MDBBtn>
                        <MDBBtn>Save</MDBBtn>
                        </div>
                   </div>
            </div>
        )
    }
}

export default MyProfile;
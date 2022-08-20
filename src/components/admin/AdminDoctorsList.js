import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput, MDBCard} from "mdbreact";
import AdminNav from "./AdminNav";
import { adminActions } from '../../actions/adminActions';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";

class AdminDoctorsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            api_err_msg:'',
            api_success_msg:'',
            doctors:[]
        }
    }
    async componentWillMount(){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.getAllDoctors(user_id);
        if(res.type == "success"){
           this.setState({doctors:res.doctors})
        }
        else{
            this.setState({api_err_msg:res.message,api_success_msg:''});
        }
    }
    goToDoctorDetail(id){
        this.props.history.push("/admin/doctor/edit/"+id)
    }
    async delteDoctor(id){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.delteDoctor(id,user_id);
        if(res.type == "success"){
            this.setState({doctors:res.doctors})
         }
         else{
             this.setState({api_err_msg:res.message,api_success_msg:''});
         }
    }
    render(){
        const renderDoctors = this.state.doctors.map((data,i) => {
            return(
                <MDBCard className="justCard">
                    <div className="row">
                        <div className="col-md-2 text-center">
                            <img src={data.img} className="imageRadius" alt="Avatar" width="50%"/>
                        </div>
                        <div className="col-md-4 docDetaildiv">
                            <div className="doctorName bold">{data.name}</div>
                            <div className="doctorTag">{data.designation}</div>
                            <div className="doctorExperience">{data.experience} Years of experience</div>
                            <div className="doctorHospital">{data.address}</div>
                        </div>
                        <div className="col-md-2 docappdiv">
                            Consultation Fee - {data.fee} Rupees <br/>
                        </div>
                        <div className="col-md-2 priceHeading">
                        <MDBBtn color="primary" onClick={this.goToDoctorDetail.bind(this,data.id)}>Edit</MDBBtn> <br/>
                    </div>
                    <div className="col-md-2 priceHeading">
                        <MDBBtn onClick={this.delteDoctor.bind(this,data.id)}>Delete</MDBBtn>
                    </div>
                    </div>
                </MDBCard>
            )
        })
        return(
            <div className="container">
                <AdminNav/>
                <div className="row"> <h4>All Doctors</h4></div>
                {this.state.api_success_msg !== '' ?<span className="successMsg"> <h5>{this.state.api_success_msg}</h5></span>:""}
                    {this.state.api_err_msg !== '' ?<span className="invalidMsg"> <h5>{this.state.api_err_msg}</h5></span>:""}
                    <div className="pharmacyList">
                {this.state.doctors.length > 0 ? renderDoctors : <div className="noProductsFound"> No Doctors Found </div> }
            </div>
            </div>
        )
    }
}

const actionCreators = {
    getAllDoctors: adminActions.getAllDoctors,
    delteDoctor: adminActions.delteDoctor
};

export default compose(
    withRouter,
    connect(null, actionCreators))(AdminDoctorsList);
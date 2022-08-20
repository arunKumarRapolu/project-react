import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";
import { adminActions } from '../../actions/adminActions';
import AdminNav from "./AdminNav";
import Dropzone from "react-dropzone";


class AdminEditDoctor extends Component{
    constructor(props) {
        super(props);
        this.state={
            doctor:{},
            api_success_msg:'',
            api_err_msg:''
        }
    }
    async componentDidMount(){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.getDoctorDetails(this.props.match.params.id,user_id);
        if(res.type == "success"){
            this.setState({doctor:res.doctor})
         }
         else{
             this.setState({api_err_msg:res.message,api_success_msg:''});
         }
    }
    setentry = (stateName, e) => {
        let doctor = this.state.doctor;
        doctor[stateName] = e.target.value
        this.setState({doctor,api_success_msg:'',api_err_msg:''});
    }
    submitform = async () => {
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.saveDoctorDetails(this.state.doctor,user_id);
        if(res.type == "success"){
            this.setState({api_err_msg:'',api_success_msg:res.message});
         }
         else{
             this.setState({api_err_msg:res.message,api_success_msg:''});
         }
    }
    render(){
        const fileSelected = async (acceptedFiles) => {
           const fileBaseString = await toBase64(acceptedFiles[0]);
           if(fileBaseString)
           {
               let doctor = this.state.doctor;
               doctor.img = fileBaseString;
               this.setState({doctor});
           }
        }

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        return(
            <div className="container">
                <AdminNav/>
                <div className="row"> <h4>Edit Doctor</h4></div>
                {this.state.api_success_msg !== '' ?<span className="successMsg"> <h5>{this.state.api_success_msg}</h5></span>:""}
                    {this.state.api_err_msg !== '' ?<span className="invalidMsg"> <h5>{this.state.api_err_msg}</h5></span>:""}
                {
                    Object.keys(this.state.doctor).length > 0 ?
                    <form>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Name :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.doctor.name} onChange={this.setentry.bind(this, 'name')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Designation :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.doctor.designation} onChange={this.setentry.bind(this, 'designation')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Qualification :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.doctor.qualification} onChange={this.setentry.bind(this, 'qualification')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Experience :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.doctor.experience} onChange={this.setentry.bind(this, 'experience')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Address :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.doctor.address} onChange={this.setentry.bind(this, 'address')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Consultation Fee :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.doctor.fee} onChange={this.setentry.bind(this, 'fee')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Doctor Image :
                        </div>
                        <div className="col-md-4">
                        
                        <Dropzone accept=".jpeg,.png,.jpg" multiple={false} onDrop={fileSelected}>
                    {({getRootProps, getInputProps}) => (
                        <div>
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <input type="button" value="click here" />
                        </div>
                        </div>
                    )}
                    </Dropzone>
                        </div>
                        <div className="col-md-4">
                            <img src={this.state.doctor.img} width="100px"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Description :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'description')}>{this.state.doctor.description}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <input type="button" onClick={this.submitform.bind(this)} value="Submit" />
                        </div>
                    </div>
                </form>
                : ''
                }
            </div>
        )
    }
}

const actionCreators = {
    getDoctorDetails: adminActions.getDoctorDetails,
    saveDoctorDetails: adminActions.saveDoctorDetails
};


export default compose(
    withRouter,
    connect(null, actionCreators))(AdminEditDoctor);
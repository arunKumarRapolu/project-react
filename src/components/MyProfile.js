import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBLink, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import profile_img from "../images/profile_pi.jpg";
import profile_address from "../images/profile_address.png";
import profile_pwd from "../images/profile_pwd.png";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { userActions } from "../actions/userActions";
import AddressModal from './AddressModal';
import EditAddressModal from './EditAddressModal';

class MyProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            isCall:false,
            showModal:false,
            name:'',
            email:'',
            mobile:'',
            old_pwd:'',
            new_pwd:'',
            cnf_new_pwd:'',
            validationErros:[],
            editAddressData:{},
            editShowModal:false
        }
    };
    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
        else if(Object.keys(this.props.auth).length > 0 && this.state.isCall === false){
            this.setState({isCall:true, name:this.props.auth.name, email:this.props.auth.email, mobile:this.props.auth.mobile},function(){
                this.props.getAddress(this.props.auth.id);
            });
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if(Object.keys(nextProps.auth).length > 0 && nextState.isCall === false){
            this.setState({isCall:true, name:nextProps.auth.name, email:nextProps.auth.email, mobile:nextProps.auth.mobile},function(){
                this.props.getAddress(nextProps.auth.id);
            });
        }
        
    }
    toggleAdressModal = () => {
        this.setState({showModal:!this.state.showModal})
    }
    editToggleAdressModal = (data) => {
        this.setState({editShowModal:!this.state.editShowModal,editAddressData:data})
    }
    changeInputs = (stateName,e) => {
        this.setState({[stateName]:e.target.value, validationErros:[]})
        this.props.clearApiError()
    }
    removeAddress = (id) => {
        this.props.removeAddress(id, this.props.auth.id);
    }
    saveChanges = () => {
        let errorArr = [];
        let proceed = true;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.name == "" || this.state.name == null){
            errorArr.push('Name should not be empty');
            proceed = false;
        }
        if(this.state.email == "" || this.state.email == null || !this.state.email.match(mailformat)){
            errorArr.push('Enter valid Email');
            proceed = false;
        }
        if(this.state.new_pwd != '' && (this.state.old_pwd == "" || this.state.old_pwd == null)){
            errorArr.push('Old password should not be empty');
            proceed = false;
        }
        if(this.state.new_pwd != "" && this.state.new_pwd.length < 8){
            errorArr.push('New Password must be minimum 8 characters');
            proceed = false;
        }
        if(this.state.new_pwd != this.state.cnf_new_pwd){
            errorArr.push('New Password and Confirm New Password are not matching');
            proceed = false;
        }
        if(!proceed){
            this.setState({validationErros:errorArr})
        }
        else{
            let data;
            if(this.state.old_pwd != '' && this.state.new_pwd != ''){
                data={
                    name:this.state.name,
                    email:this.state.email,
                    old_pwd:this.state.old_pwd,
                    new_pwd:this.state.new_pwd,
                    user_id:this.props.auth.id
                }
            }
            else{
                data={
                    name:this.state.name,
                    email:this.state.email,
                    user_id:this.props.auth.id
                }
            }
            this.props.saveProfileData(data);
        }
    }
    render(){
        const renderAdresses = this.props.myAddress.map((item,key) => {
            return(
                <div className="col-md-6" key={item.id}>
                    <MDBCard className="profile_addressCard">
                    <div className="address_div">
                        <div className="row">
                            <div className="col-md-6">
                                <span className="address_label">C/o - </span><b>{item.name}</b>
                            </div>
                            <div className="col-md-5 text-right">
                                <span><i className="fas fa-save myprofile_saveSymbl"></i>{item.saveAs}</span>
                            </div>
                        </div>
                        <span className="address_label">H.No - </span>{item.house}<br />
                        {item.street}, {item.landmark} <br/>
                        {item.area}, {item.city} <br/>
                        {item.district}, {item.state} <br />
                        <span className="address_label">Pincode - </span>{item.pin} <br/>
                        <span className="address_label">Mobile - </span>{item.mobile}
                    </div>
                    <div>
                        <MDBBtn color="white" className="adress_button_first" onClick={this.editToggleAdressModal.bind(this,item)}>Edit</MDBBtn>
                        <MDBBtn color="white" className="adress_button" onClick={this.removeAddress.bind(this,item.id)}>Delete</MDBBtn>
                    </div>
                    </MDBCard>
                </div>
            )
        });
        const renderValidationErrors = this.state.validationErros.map((data,i) => {
            return(
                <div>* {data}</div>
            )
        })
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
                            <MDBInput outline size="sm" value={this.state.name} onChange={this.changeInputs.bind(this,'name')}/>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">Email :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" value={this.state.email} onChange={this.changeInputs.bind(this,'email')}/>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">Mobile Number :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" value={this.state.mobile} disabled={true}/>
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
                        <div className="col-md-5 text-right">
                            <MDBBtn className="myprofile_add_address" onClick={this.toggleAdressModal.bind(this)}>Add new Address</MDBBtn>
                        </div>
                   </div>
                   <div className="row">
                        {this.props.myAddress.length > 0 ? renderAdresses : <div className="col-md-12"><div className="shopping_noAdressFound">No Address Found</div></div>}
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
                            <MDBInput outline size="sm" type="password" onChange={this.changeInputs.bind(this,'old_pwd')} value={this.state.old_pwd}/>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2"></div>
                       <div className="col-md-2 text-right profile_label">New Password :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" type="password" onChange={this.changeInputs.bind(this,'new_pwd')} value={this.state.new_pwd}/>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-1"></div>
                       <div className="col-md-3 text-right profile_label">Confirm New Password :</div>
                       <div className="col-md-5">
                            <MDBInput outline size="sm" type="password" onChange={this.changeInputs.bind(this,'cnf_new_pwd')} value={this.state.cnf_new_pwd}/>
                       </div>
                   </div>
                </MDBCard>
                <div className="row">
                        <div className="col-md-8 text-right profile_footerError">
                            {this.state.validationErros.length > 0 ? renderValidationErrors : null}
                            {this.props.apiError != null ? <div>* {this.props.apiError}</div> : null}
                        </div>
                        <div className="col-md-4 text-right profile_footerButtons">
                        <MDBBtn onClick={this.saveChanges.bind(this)}>Save</MDBBtn>
                        </div>
                </div>
                {/* <AddressModal show={this.state.showModal} togglefunc={this.toggleAdressModal}/> */}
                {this.state.editShowModal ? <EditAddressModal show={this.state.editShowModal} togglefunc={this.editToggleAdressModal} data={this.state.editAddressData}/> : null }
            </div>
        )
    }
}

function mapState(state) {
    const {registration,authentication } = state;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
  const myAddress = authentication.myAddresses;
  const apiError = authentication.myProfileApiError;
    return{auth, myAddress, apiError};
}

const actionCreators = {
    getAddress: userActions.getAddress,
    saveProfileData: userActions.saveProfileData,
    clearApiError: userActions.clearMyProfileApiError,
    removeAddress: userActions.removeAddress
};

export default compose(withRouter,connect(mapState, actionCreators))(MyProfile);
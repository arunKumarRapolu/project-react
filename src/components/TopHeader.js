import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from 'react-redux';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import logo from "../images/logo.jpg"

import { userActions } from '../actions/userActions';

class TopHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            modal14: false,
            signIn:true,
            login_mobile : '',
            login_mobile_valid : true,
            login_password_valid:true,
            login_password : '',
            reg_name: '',
            reg_name_valid:true,
            reg_num:'',
            reg_num_valid : true,
            reg_email:null,
            reg_email_valid :true,
            reg_pwd:null,
            reg_pwd_valid:true,
            reg_cnf_pwd:null,
            reg_cnf_pwd_valid:true,
            change_variable : false
          };
          this.handleSubmit = this.handleSubmit.bind(this);
          this.gotoSignUp = this.gotoSignUp.bind(this);
          this.toggle = this.toggle.bind(this);
    }
    
      
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
      toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.props.clearSignInErrors();
        this.props.clearSignUpErrors();
        this.setState({
          [modalNumber]: !this.state[modalNumber],
          signIn:true,
          login_mobile : '',
          login_mobile_valid : true,
          login_password_valid:true,
          login_password : '',
          reg_name: '',
          reg_name_valid:true,
          reg_num:'',
          reg_num_valid : true,
          reg_email:null,
          reg_email_valid :true,
          reg_pwd:null,
          reg_pwd_valid:true,
          reg_cnf_pwd:null,
          reg_cnf_pwd_valid:true
        });
      }
      gotoSignUp(){
        this.setState({
          login_mobile : '',
          login_mobile_valid : true,
          login_password_valid:true,
          login_password : '',
          reg_name: '',
          reg_name_valid:true,
          reg_num:'',
          reg_num_valid : true,
          reg_email:null,
          reg_email_valid :true,
          reg_pwd:null,
          reg_pwd_valid:true,
          reg_cnf_pwd:null,
          reg_cnf_pwd_valid:true,
          signIn:false
        })
      }
      gotoSignIn() {
        this.setState({
          login_mobile : '',
          login_mobile_valid : true,
          login_password_valid:true,
          login_password : '',
          reg_name: '',
          reg_name_valid:true,
          reg_num:'',
          reg_num_valid : true,
          reg_email:null,
          reg_email_valid :true,
          reg_pwd:null,
          reg_pwd_valid:true,
          reg_cnf_pwd:null,
          reg_cnf_pwd_valid:true,
          signIn:true
        });
      }
      async handleSubmit(e) {
       e.preventDefault();
      if(this.state.signIn){
        let phoneNum = this.state.login_mobile
        let phonenoreg = /^\d{10}$/;
        let proceed = true;
        if(phoneNum == '' || (phoneNum && !phoneNum.match(phonenoreg))){
          this.setState({login_mobile_valid:false})
          proceed = false;
        }
        if(this.state.login_password == ''){
          this.setState({login_password_valid:false});
          proceed = false;
        }
        
        if(proceed){
        const res = await this.props.login(phoneNum, this.state.login_password,this.toggle);
          if(res == 'success'){
            this.props.history.push(this.props.linkAfterLogin);
          }
        }
      }
      else{
        let reg_proceed = true;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonenoreg = /^\d{10}$/;
        if(this.state.reg_name == ''){
          this.setState({reg_name_valid : false});
          reg_proceed = false;
        }
        if(!this.state.reg_email || (this.state.reg_email && !this.state.reg_email.match(mailformat))){
          this.setState({reg_email_valid : false});
          reg_proceed = false;
        }
        if(this.state.reg_num == '' || (this.state.reg_num && !this.state.reg_num.match(phonenoreg))){
          this.setState({reg_num_valid:false})
          reg_proceed = false;
        }
        if(!this.state.reg_pwd || (this.state.reg_pwd.length < 8)){
          this.setState({reg_pwd_valid:false})
          reg_proceed = false;
        }
        if(this.state.reg_cnf_pwd && this.state.reg_pwd !== this.state.reg_cnf_pwd){
          this.setState({reg_cnf_pwd_valid:false})
          reg_proceed = false;
        }

        if(reg_proceed){
          var newUser = {
            name : this.state.reg_name,
            mobile : this.state.reg_num,
            email : this.state.reg_email,
            password : this.state.reg_pwd
          }
          const res = await this.props.register(newUser,this.toggle);
          if(res == 'success'){
            this.props.history.push(this.props.linkAfterLogin);
          }
        }
      }
    }
    changeHandler = event => {
      let name = event.target.name;
      let invalidEle = name+"_valid"
      this.setState({ [event.target.name]: event.target.value , [invalidEle]:true });
      if(this.state.signIn)
      this.props.clearSignInErrors()
      else
      this.props.clearSignUpErrors()
    };
    signOut = () => {
      window.localStorage.removeItem('auth');
      this.props.logout();
      this.props.history.push('/');
    }
    doctorsLink = () => {
      if(Object.keys(this.props.auth).length > 0){
        return '/doctors';
      }
      else{
        return '/';
      }
    }
    doctorsLinkClicked =() =>{
      if(Object.keys(this.props.auth).length <= 0){
        this.props.saveLinkAfterLogin('/doctors');
        this.toggle(14)();
      }
    }
    pharmacyLink = () => {
      if(Object.keys(this.props.auth).length > 0){
        return '/pharmacy';
      }
      else{
        return '/';
      }
    }
    pharmacyLinkClicked =() =>{
      if(Object.keys(this.props.auth).length <= 0){
        this.props.saveLinkAfterLogin('/pharmacy');
        this.toggle(14)();
      }
    }
    render() {
        return (
          <div>
            <MDBNavbar color="default-color" dark expand="md" className="mainHeader">
            <div className="container">
        <MDBNavbarBrand>
        <MDBNavLink to="/">
          <strong className="white-text">Navbar</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>

          <MDBNavbarNav left>
            <MDBNavItem className="pl-15" active={/^[/]doctors/.test(this.props.location.pathname)}>
              <MDBNavLink to={this.doctorsLink()} onClick={this.doctorsLinkClicked.bind(this)}>
                <div className="ft-sz-14 bold">
                Doctors
                </div>
                <div className="ft-sz-12">
                Book Appointment
                </div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="pl-15" active={/^[/]pharmacy/.test(this.props.location.pathname)}>
              <MDBNavLink to={this.pharmacyLink()} onClick={this.pharmacyLinkClicked.bind(this)}>
                <div className="ft-sz-14 bold">
                Pharmacy
                </div>
                <div className="ft-sz-12">
                Order Online
                </div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="pl-15" active={/^[/]contactUs/.test(this.props.location.pathname)}>
              <MDBNavLink to="/contactUs">
                <div className="ft-sz-14 bold">
                  Contact Us
                </div>
                <div className="ft-sz-12">
                Get in touch with Us
                </div>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
         
          {Object.keys(this.props.auth).length == 0 ?
           <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#">
                <MDBBtn className="loginButton" onClick={this.toggle(14)} >Login / SignUp</MDBBtn>
              </MDBNavLink>
            </MDBNavItem>
            </MDBNavbarNav>:
            <MDBNavbarNav right>
          <MDBNavItem>
          <MDBNavLink to="/cart">
          <MDBIcon icon="shopping-cart" className="mr-5" />
          <div className="cartCount">{this.props.cartLength}</div>
            <span>Cart</span>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem >
          <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <MDBIcon icon="user" className="mr-5" />
              <span>{this.props.auth.name}</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu className="headerDropdown">
            <MDBNavLink to="/myprofile" className="dropdownItemLink"><MDBDropdownItem className="dropdownItem">My Profile</MDBDropdownItem></MDBNavLink>
            <MDBNavLink to="/myorders" className="dropdownItemLink"><MDBDropdownItem className="dropdownItem">My Orders</MDBDropdownItem></MDBNavLink>
            <MDBNavLink to="/admin/home" className="dropdownItemLink"><MDBDropdownItem className="dropdownItem">Admin Page</MDBDropdownItem></MDBNavLink>
            <MDBNavLink to="/" className="dropdownItemLink"><MDBDropdownItem className="dropdownItem" onClick={this.signOut}>Sign Out</MDBDropdownItem></MDBNavLink>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
        </MDBNavbarNav>
          }
         
        </MDBCollapse>
        </div>
      </MDBNavbar>
      <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered modalClassName="topHeaderModal">
      <form>
      <MDBModalHeader toggle={this.toggle(14)}>{this.state.signIn ? "Sign In" : "Sign Up"}</MDBModalHeader>
      <MDBModalBody>
        {this.state.signIn ?
      <MDBRow>
        <MDBCol md="12">
            <div className="grey-text signInForm">
            {this.props.signInApiError ? <div className="text-center signInErrMsg">{this.props.signInApiError}</div> : null}
              <MDBInput
                label="Mobile number"
                icon="phone"
                className={this.state.login_mobile_valid ? "form-control" :"form-control is-invalid"}
                value={this.state.login_mobile}
                onChange={this.changeHandler.bind(this)}
                error="wrong"
                success="right"
                name="login_mobile"
              />
              <div className={this.state.login_mobile_valid ? "hide" :"show invalidMsg"}>
                Please enter valid mobile number.
              </div>
              <MDBInput
                label="Password"
                icon="lock"
                group
                type="password"
                className={this.state.login_password_valid ? "form-control" :"form-control is-invalid"}
                value={this.state.login_password}
                onChange={this.changeHandler.bind(this)}
                name="login_password"
              />
              <div className={this.state.login_password_valid ? "hide" :"show invalidMsg"}>
                Please enter password.
              </div>
            </div>
            <MDBRow>
              <MDBCol md="6">
                Not a User ? <a href="#" onClick={this.gotoSignUp}>Sign Up</a>
              </MDBCol>
              <MDBCol md="6" className="text-right">
                <a href="#">Forgot Password</a>
              </MDBCol>
            </MDBRow>
        </MDBCol>
      </MDBRow> :
      <MDBRow>
      <MDBCol md="12">
          <div className="grey-text signInForm">
          {this.props.signUpApiError ? <div className="text-center signInErrMsg">{this.props.signUpApiError}</div> : null}
            <MDBInput
              label="Your name"
              icon="user"
              type="text"
              error="wrong"
              success="right"
              className={this.state.reg_name_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.reg_name}
              onChange={this.changeHandler.bind(this)}
              name="reg_name"
            />
            <div className={this.state.reg_name_valid ? "hide" :"show invalidMsg"}>
                Please enter your name.
            </div>
            <MDBInput
              label="Contact number"
              icon="phone"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.reg_num_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.reg_num}
              onChange={this.changeHandler.bind(this)}
              name="reg_num"
            />
            <div className={this.state.reg_num_valid ? "hide" :"show invalidMsg"}>
                Please enter valid mobile number.
            </div>
            <MDBInput
              label="Your email"
              icon="envelope"
              group
              type="email"
              error="wrong"
              success="right"
              className={this.state.reg_email_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.reg_email}
              onChange={this.changeHandler.bind(this)}
              name="reg_email"
            />
            <div className={this.state.reg_email_valid ? "hide" :"show invalidMsg"}>
                Please enter valid email.
            </div>
            <MDBInput
              label="Your password"
              icon="lock"
              group
              type="password"
              className={this.state.reg_pwd_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.reg_pwd}
              onChange={this.changeHandler.bind(this)}
              name="reg_pwd"
            />
            <div className={this.state.reg_pwd_valid ? "hide" :"show invalidMsg"}>
                Please enter valid password (Password must contains 8 characters).
            </div>
             <MDBInput
              label="Confirm your password"
              icon="exclamation-triangle"
              group
              type="password"
              error="wrong"
              success="right"
              className={this.state.reg_cnf_pwd_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.reg_cnf_pwd}
              onChange={this.changeHandler.bind(this)}
              name="reg_cnf_pwd"
            />
            <div className={this.state.reg_cnf_pwd_valid ? "hide" :"show invalidMsg"}>
                Passwords mismatching
            </div>
          </div>
          <div>Already Registered ? <a href="#" onClick={this.gotoSignIn.bind(this)}>Sign In</a></div>
      </MDBCol>
    </MDBRow>
      }
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
        <MDBBtn type= "submit" color="primary" onClick={this.handleSubmit} >{this.state.signIn ? "Sign In" : "Sign Up"}</MDBBtn>
      </MDBModalFooter>
      </form>
    </MDBModal>
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} lightBackground/>
    </div>
        )
    }
}


function mapState(state) {
  const {authentication, registration } = state;
  const {signUperror} = registration;
  const {loginerror } = authentication;
  const signUpApiError = signUperror;
  const signInApiError = loginerror;
  const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  let cartLength = 0;
  if(Object.keys(regAuth).length > 0){
    auth = regAuth;
    cartLength = auth.cart.length
  }
  else if(Object.keys(signinAuth).length > 0){
    auth = signinAuth;
    cartLength = auth.cart.length
  }
  const linkAfterLogin = authentication.linkAfterLogin
  return { auth, signInApiError, signUpApiError,cartLength, linkAfterLogin};
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
  register: userActions.register,
  clearSignInErrors: userActions.clearSignInErrors,
  clearSignUpErrors: userActions.clearSignUpErrors,
  saveLinkAfterLogin: userActions.saveLinkAfterLogin
};


//export default withRouter(TopHeader);

export default compose(
  withRouter,
  connect(mapState, actionCreators)
)(TopHeader);
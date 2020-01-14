import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import {withRouter} from "react-router-dom"

class TopHeader extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            isOpen: false,
            modal14: false,
            signIn:true
          };
    }
    
      
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
      toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber],
          signIn:true
        });
      }
      gotoSignUp = () => {
        this.setState({signIn:false})
      }
      gotoSignIn = () => {
        this.setState({signIn:true})
      }
    render() {
        return (
          <div>
            <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
        <MDBNavLink to="/">
          <strong className="white-text">Navbar</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem className="pl-15" active={/^[/]doctors/.test(this.props.location.pathname)}>
              <MDBNavLink to="/doctors">
                <div className="ft-sz-14 bold">
                Doctors
                </div>
                <div className="ft-sz-12">
                Book Appointment
                </div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="pl-15" active={/^[/]pharmacy/.test(this.props.location.pathname)}>
              <MDBNavLink to="/pharmacy">
                <div className="ft-sz-14 bold">
                Pharmacy
                </div>
                <div className="ft-sz-12">
                Order Online
                </div>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBBtn className="loginButton" onClick={this.toggle(14)} >Login / SignUp</MDBBtn>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="mt-7">
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu >
                  <MDBDropdownItem className="dropdownItem" href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
      <MDBModalHeader toggle={this.toggle(14)}>{this.state.signIn ? "Sign In" : "Sign Up"}</MDBModalHeader>
      <MDBModalBody>
        {this.state.signIn ?
      <MDBRow>
        <MDBCol md="12">
          <form>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <MDBRow>
              <MDBCol md="6">
                Not a User ? <a href="#" onClick={this.gotoSignUp}>Sign Up</a>
              </MDBCol>
              <MDBCol md="6" className="text-right">
                <a href="#">Forgot Password</a>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCol>
      </MDBRow> :
      <MDBRow>
      <MDBCol md="12">
        <form>
          <div className="grey-text">
            <MDBInput
              label="Your name"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              label="Your email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              label="Confirm your email"
              icon="exclamation-triangle"
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              label="Your password"
              icon="lock"
              group
              type="password"
              validate
            />
          </div>
          <div>Already Registered ? <a href="#" onClick={this.gotoSignIn}>Sign In</a></div>
        </form>
      </MDBCol>
    </MDBRow>
      }
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
        <MDBBtn color="primary">{this.state.signIn ? "Sign In" : "Sign Up"}</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
    </div>
        )
    }
}

export default withRouter(TopHeader);
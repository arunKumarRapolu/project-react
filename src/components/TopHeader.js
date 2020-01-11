import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {withRouter} from "react-router-dom"

class TopHeader extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            isOpen: false
          };
    }
    
      
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
    render() {
        return (
            <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
        <MDBNavLink to="/">
          <strong className="white-text">Navbar</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active={() => /^[/]doctors/.test(this.location.pathname)}>
              <MDBNavLink to="/doctors">
                <div className="ft-sz-14 bold">
                Doctors
                </div>
                <div className="ft-sz-12">
                Book Appointment
                </div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
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
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
        )
    }
}

export default withRouter(TopHeader);
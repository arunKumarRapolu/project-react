import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from 'react-redux';

class AdminNav extends Component {
    render(){
        return(
            <div className="container adminHome">
                <ul>
                    <li className="dropdowna">
                        <a href="javascript:void(0)" className={(/^[/]admin[/]home/.test(this.props.location.pathname) || /^[/]admin[/]products/.test(this.props.location.pathname))? "dropbtn activate" : "dropbtn"}>Products</a>
                        <div className="dropdown-content">
                            <a><MDBNavLink className="admindropdownLink" to="/admin/home">All Products</MDBNavLink></a>
                            <a><MDBNavLink to="/admin/products/add">Add Product</MDBNavLink></a>
                        </div>
                    </li>
                    <li className="dropdowna">
                        <a href="javascript:void(0)" className={(/^[/]admin[/]doctors/.test(this.props.location.pathname))? "dropbtn activate" : "dropbtn"}>Doctors</a>
                        <div className="dropdown-content">
                            <a><MDBNavLink to="/admin/doctors">All Doctors</MDBNavLink></a>
                            <a><MDBNavLink to="/admin/doctors/add">Add Doctor</MDBNavLink></a>
                        </div>
                    </li>
                    <li className="dropdowna"><a href="javascript:void(0)" className={(/^[/]admin[/]users/.test(this.props.location.pathname))? "dropbtn activate adminnoPadding" : "dropbtn adminnoPadding"}><MDBNavLink className="adminNoDropDownLink" to="/admin/users">Users</MDBNavLink></a></li>
                    <li className="dropdowna"><a href="javascript:void(0)" className={(/^[/]admin[/]orders/.test(this.props.location.pathname))? "dropbtn activate adminnoPadding" : "dropbtn adminnoPadding"}><MDBNavLink className="adminNoDropDownLink" to="/admin/orders">Orders</MDBNavLink></a></li>
                    <li className="dropdowna"><a href="javascript:void(0)" className={(/^[/]admin[/]prescriptions/.test(this.props.location.pathname))? "dropbtn activate adminnoPadding" : "dropbtn adminnoPadding"}><MDBNavLink className="adminNoDropDownLink" to="/admin/prescriptions">Prescriptions</MDBNavLink></a></li>
                    <li className="dropdowna"><a href="javascript:void(0)" className={(/^[/]admin[/]contactUs/.test(this.props.location.pathname))? "dropbtn activate adminnoPadding" : "dropbtn adminnoPadding"}><MDBNavLink className="adminNoDropDownLink" to="/admin/contactUs">Contact Us</MDBNavLink></a></li>
                </ul>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(null, null)
  )(AdminNav);
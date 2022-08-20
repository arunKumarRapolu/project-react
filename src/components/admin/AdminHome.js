import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput, MDBCard} from "mdbreact";
import AdminNav from "./AdminNav";
import { adminActions } from '../../actions/adminActions';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";

class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            api_err_msg:'',
            api_success_msg:'',
            products:[]
        }
    }
    async componentWillMount(){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.getAllProducts(user_id);
        if(res.type == "success"){
           this.setState({products:res.products})
        }
        else{
            this.setState({api_err_msg:res.message,api_success_msg:''});
        }
    }
    goToProductDetail(id){
        this.props.history.push("/admin/product/edit/"+id)
    }
    async delteProduct(id){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.delteProduct(id,user_id);
        if(res.type == "success"){
            this.setState({products:res.products})
         }
         else{
             this.setState({api_err_msg:res.message,api_success_msg:''});
         }
    }
    render(){
        const renderPharmacy = this.state.products.map((val,key) => {
            return(
                <MDBCard className="justCard" key={val.id}>
                <div className="row">
                    <div className="col-md-2 text-center">
                        <img src={val.img} width="100%"/>
                    </div>
                    <div className="col-md-4 pharmacyNameHead">
                        <span className="pharmacyName">{val.name}</span>
                        <br /><span className="by">by </span><span className="pharmacyCompanyName">{val.company}</span>
                        <br /><span className="by">Type : </span><span className="pharmacyType">{val.type}</span>
                        <br /><span className="by">Quantity : </span><span className="pharmacySheetQuantity">{val.sheetQuantity}</span>
                    </div>
                    <div className="col-md-2 text-right priceHeading">
                        <span className="priceText">Price</span>
                        <br /><span className="pharmacyRupees">&#8377; {val.price}</span>
                    </div>
                    <div className="col-md-2 priceHeading">
                        <MDBBtn color="primary" onClick={this.goToProductDetail.bind(this,val.id)}>Edit</MDBBtn> <br/>
                    </div>
                    <div className="col-md-2 priceHeading">
                        <MDBBtn onClick={this.delteProduct.bind(this,val.id)}>Delete</MDBBtn>
                    </div>
                </div>
            </MDBCard>
            )
        });
        return (
            <div className="container">
                <AdminNav/>
                <div className="row"> <h4>All Products</h4></div>
                {this.state.api_success_msg !== '' ?<span className="successMsg"> <h5>{this.state.api_success_msg}</h5></span>:""}
                    {this.state.api_err_msg !== '' ?<span className="invalidMsg"> <h5>{this.state.api_err_msg}</h5></span>:""}
                    <div className="pharmacyList">
                {this.state.products.length > 0 ? renderPharmacy : <div className="noProductsFound"> No Products Found </div> }
            </div>
            </div>
        )
    }
}


const actionCreators = {
    getAllProducts: adminActions.getAllProducts,
    delteProduct: adminActions.delteProduct
};

export default compose(
    withRouter,
    connect(null, actionCreators))(AdminHome);
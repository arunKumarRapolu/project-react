import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import shopping_cart from "../images/shopping_cart.png";
import profile_address from "../images/profile_address.png";
import { paymentActions } from '../actions/paymentActions';

class Shopping extends Component {
    constructor(props){
        super(props);
        this.state = {
            seletedMedicine : this.props.seletedItems,
            address : [
                {
                    name:"Home",
                    fullName:"Arun",
                    door:"2-1-1",
                    street : "Road No. 2",
                    landmark : "12th cross",
                    area : "Gachibowli",
                    city: "Hyderabad",
                    dist:"Hyderabad",
                    state:"Telangana",
                    pincode:"500002"
                },
                {
                    name:"Work",
                    fullName:"Shiva Kumar",
                    door:"2-1-1",
                    street : "Road No. 2",
                    landmark : "12th cross",
                    area : "Gachibowli",
                    city: "Hyderabad",
                    dist:"Hyderabad",
                    state:"Telangana",
                    pincode:"500002"
                },
                {
                    name:"Room",
                    fullName:"Ram",
                    door:"2-1-1",
                    street : "Road No. 2",
                    landmark : "12th cross",
                    area : "Gachibowli",
                    city: "Hyderabad",
                    dist:"Hyderabad",
                    state:"Telangana",
                    pincode:"500002"
                }
            ],
            isAddressSelected: false,
            selectedAddressName : ''
        }
    }
    addresSelected = (e) => {
        if(e.target.value == null || e.target.value == ""){
            this.setState({isAddressSelected:false,selectedAddressName:''});
        }
        else{
            this.setState({isAddressSelected:true,selectedAddressName:e.target.value});
        }
        
    }
    proceedPayment = (totalAmount) =>{
        const data = {
            purpose : 'Testing Payment',
            amount : totalAmount,
            buyer_name : 'Arun',
            email : 'abc@gmail.com',
            phone: '8099242542',
            user_id: '12345',
            redirect_url: `http://localhost:4000/payment/callback?user_id=12345`,
            webhook_url: '/webhook'
        }
        this.props.requestPayment(data);
    }
    render(){
        let totalAmount = 0;
        const renderCartItems = this.state.seletedMedicine.map((item,i) => {
            totalAmount += (item.price * item.quantity);
            return(
                <div key={i}>
                <div className="row">
                    <div className="col-md-4 pharmacyNameHead">
                        <span className="pharmacyName">{item.name}</span><span className="pharmacyType">({item.type})</span>
                        <br /><span className="pharmacySheetQuantity">{item.sheetQuantity}</span>
                    </div>
                    <div className="col-md-3 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{item.price}</b> Rupees </span>
                        <span className="pharacyRupeesFoot">(Per sheet)</span>
                    </div>
                    <div className="col-md-2 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{item.quantity}</b> No(s) </span>
                    </div>
                    <div className="col-md-3 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{item.quantity * item.price} </b>Rupees</span>
                    </div>
                </div>
                <span>
                {i != this.state.seletedMedicine.length-1 ? <div className="shopping_line"></div> : ""}
                </span>
                </div>
            )
        });
        const renderAddressOptions = this.state.address.map((item,i) => {
            return(
            <option value={item.name}>{item.name}</option>
            )
        });

        const renderAddress = this.state.address.map((item,i) => {
            if(item.name == this.state.selectedAddressName){
                return(
                    <div className="address_div">
                        <span className="address_label">C/o - </span><b>{item.fullName}</b><br/>
                        <span className="address_label">H.No - </span>{item.door}<br />
                        {item.street}, {item.landmark} <br/>
                        {item.area}, {item.city} <br/>
                        {item.dist}, {item.state} <br />
                        <span className="address_label">Pincode - </span>500032
                    </div>
                )
            }
        })
        return(
            <div className="container">
                <div className="row shopping_head">
                    <div className="col-md-1">
                        <img src={shopping_cart} className="profile_img" width="50%"/>
                    </div>
                    <div className="col-md-5 profile_head_address">
                        Your Cart
                    </div>
                </div>
                <MDBCard className="doctorCard">
                    {renderCartItems}
                </MDBCard>
                <div className="row shopping_total">
                    <div className="col-md-9 text-right">
                        <span className="pharmacyName">Total Amount &nbsp;&nbsp;&nbsp;&nbsp; - </span>
                    </div>
                    <div className="col-md-3">
                        <span className="pharmacyName">{totalAmount} Rupees</span>
                    </div>
                </div>
                <div className="row shopping_head">
                    <div className="col-md-1">
                        <img src={profile_address} className="profile_img" width="50%"/>
                    </div>
                    <div className="col-md-5 profile_head_address">
                        Address
                    </div>
                </div>
                <MDBCard className="doctorCard">
                <div className="row shopping_addresSelect">
                    <div className="col-md-2 text-right">
                        <span className="pharmacyName">Delivery Address</span>
                    </div>
                    <div className="col-md-3">
                        <select className="browser-default custom-select" onChange={this.addresSelected.bind(this)}>
                        <option>Select Address</option>
                        {renderAddressOptions}
                        </select>
                    </div>
                    <div className="col-md-6 text-right">
                        <MDBBtn className="shopping_add_address">Add new Address</MDBBtn>
                    </div>
                </div>
               
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                        {
                            this.state.isAddressSelected ?
                            <MDBCard className="shopping_address_card">
                            {renderAddress}
                            </MDBCard>
                            :""
                        }
                        </div>
                    </div>
                  
                </MDBCard>
                <div className="row">
                        <div className="col-md-12 text-right profile_footerButtons">
                        <MDBBtn color="grey" >Back</MDBBtn>
                        <MDBBtn onClick={this.proceedPayment.bind(this,totalAmount)}>Proceed to Payment</MDBBtn>
                        </div>
                </div>

            </div>
        );
    }
}
function mapState(state) {
    let seletedItems = state.pharmacyRelated.selectedList;
    return{seletedItems};
}

const actionCreators = {
    requestPayment: paymentActions.payment
  };

export default compose(withRouter,connect(mapState, actionCreators))(Shopping);
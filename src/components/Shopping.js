import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import shopping_cart from "../images/shopping_cart.png";
import profile_address from "../images/profile_address.png";
import { paymentActions } from '../actions/paymentActions';
import AddressModal from './AddressModal';
import {ToastsContainer,ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { userActions } from "../actions/userActions";

class Shopping extends Component {
    constructor(props){
        super(props);
        this.state = {
            seletedMedicine : this.props.seletedItems,
            isAddressSelected: false,
            selectedAddressName : '',
            showModal:false,
            showAdressSelectError:false,
            selectedAddressId:''
        }
    }
    componentWillMount(){
        if(Object.keys(this.props.auth).length > 0 ){
            this.props.getAddress(this.props.auth.id)
        }   
    }

    componentDidMount(){
        if(Object.keys(this.props.auth).length == 0){
            ToastsStore.error("Refresh not allowed here");
            this.props.history.push('/')
        }
    }

    addresSelected = (e) => {
        let target = e.target
        if(target.value == null || target.value == ""){
            this.setState({isAddressSelected:false,selectedAddressName:'', showAdressSelectError:true, selectedAddressId:''});
        }
        else{
            let selectedAddressId = target.options[target.selectedIndex].getAttribute('data-id');
            this.setState({isAddressSelected:true,selectedAddressName:target.value, showAdressSelectError:false, selectedAddressId});
        }
        
    }
    proceedPayment = (totalAmount) =>{
        let proceed = true;
        if(!this.state.isAddressSelected){
            this.setState({showAdressSelectError: true});
            proceed = false;
        }
        if(proceed){
            let productsInfo = [];
            this.props.seletedItems.forEach(item => {
                let itemObj = {};
                itemObj.id = item.id;
                itemObj.quantity = item.quantity;
                itemObj.price = item.price;
                productsInfo.push(itemObj);
            });
                const data = {
                purpose : 'Testing Payment',
                amount : totalAmount,
                buyer_name : this.props.auth.name,
                email : this.props.auth.email,
                phone: this.props.auth.mobile,
                user_id: this.props.auth.id,
                redirect_url: `http://localhost:3000/payment`,
                webhook_url: '/webhook'
            }
            this.props.requestPayment(data);
            let shoppingDetails = {
                user_id : this.props.auth.id,
                products : productsInfo,
                address_id : this.state.selectedAddressId,
                fromCart: this.props.fromCart
            }
            localStorage.setItem('shopping', JSON.stringify(shoppingDetails));
        }
        //redirect_url: `http://localhost:4000/payment/callback?user_id=${this.props.auth.id}&products=${JSON.stringify(productsInfo)}&address=${this.state.selectedAddressId}`,
    }
    toggleAdressModal = () => {
        this.setState({showModal:!this.state.showModal})
    }
    render(){
        let totalAmount = 0;
        const renderCartItems = this.props.seletedItems.map((item,i) => {
            totalAmount += (item.price * item.quantity);
            return(
                <div key={i}>
                <div className="row">
                    <div className="col-md-2 text-center">
                        <img src={item.img} width="100%"/>
                    </div>
                    <div className="col-md-4 pharmacyNameHead">
                        <span className="pharmacyName">{item.name}</span>
                        <br /><span className="by">by </span><span className="pharmacyCompanyName">{item.company}</span>
                        <br /><span className="by">Type : </span><span className="pharmacyType">{item.type}</span>
                        <br /><span className="by">Quantity : </span><span className="pharmacySheetQuantity">{item.sheetQuantity}</span>
                    </div>
                    <div className="col-md-4 text-right priceHeading">
                        <div className="shopping_nos">{item.quantity} No(s) </div>
                    </div>
                    <div className="col-md-2 text-right priceHeading">
                        <span className="priceText">Price</span>
                        <br /><span className="pharmacyRupees">&#8377; {item.rupees}</span>
                    </div>
                </div>
                <span>
                {i != this.props.seletedItems.length-1 ? <div className="shopping_line"></div> : ""}
                </span>
                </div>
            )
        });
        const renderAddressOptions = this.props.myAddress.map((item,i) => {
            return(
            <option value={item.saveAs} key={i} data-id={item.id}>{item.saveAs}</option>
            )
        });

        const renderAddress = this.props.myAddress.map((item,i) => {
            if(item.saveAs == this.state.selectedAddressName){
                return(
                    <div className="address_div" key={item.id}>
                        <span className="address_label">C/o - </span><b>{item.name}</b><br/>
                        <span className="address_label">H.No - </span>{item.house}<br />
                        {item.street}, {item.landmark} <br/>
                        {item.area}, {item.city} <br/>
                        {item.district}, {item.state} <br />
                        <span className="address_label">Pincode - </span>{item.pin} <br/>
                        <span className="address_label">Mobile - </span>{item.mobile}
                    </div>
                )
            }
        })
        return(
            <div className="container">
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER}/>
                <div className="row shopping_head">
                    <div className="col-md-1">
                        <img src={shopping_cart} className="profile_img" width="50%"/>
                    </div>
                    <div className="col-md-5 profile_head_address">
                        Your Cart
                    </div>
                </div>
                <MDBCard className="shopping_card">
                    {renderCartItems}
                </MDBCard>
                <div className="row shopping_total">
                    <div className="col-md-10 text-right">
                        <span className="pharmacyName">Total Amount &nbsp;&nbsp;&nbsp;&nbsp; - </span>
                    </div>
                    <div className="col-md-2">
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
                        {this.props.myAddress ? renderAddressOptions : null}
                        </select>
                    </div>
                    <div className="col-md-6 text-right">
                        <MDBBtn className="shopping_add_address" onClick={this.toggleAdressModal.bind(this)}>Add new Address</MDBBtn>
                    </div>
                </div>
               
                    <div className="row">
                        {this.props.myAddress.length == 0 ? <div className="col-md-12"><div className="shopping_noAdressFound">No Address Found</div></div>
                        :
                        <>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                        {
                            this.state.isAddressSelected ?
                            <MDBCard className="shopping_address_card">
                            {this.props.myAddress ? renderAddress : null}
                            </MDBCard>
                            :""
                        }
                        </div>
                        </>
                        }
                    </div>
                  
                </MDBCard>
                <div className="row">
                        <div className="col-md-12 text-right profile_footerButtons">
                        {this.state.showAdressSelectError ? <span className="selectAdress_error">Please Select Delivery Address</span> :""}
                        <MDBBtn color="grey" >Back</MDBBtn>
                        <MDBBtn onClick={this.proceedPayment.bind(this,totalAmount)}>Proceed to Payment</MDBBtn>
                        </div>
                </div>
               <AddressModal show={this.state.showModal} togglefunc={this.toggleAdressModal}/>
            </div>
        );
    }
}
function mapState(state) {
    let seletedItems = state.pharmacyRelated.selectedList;
    let fromCart = state.pharmacyRelated.fromCart;
    const {registration,authentication } = state;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
  const myAddress = authentication.myAddresses
    return{seletedItems, auth, myAddress, fromCart};
}

const actionCreators = {
    requestPayment: paymentActions.payment,
    getAddress: userActions.getAddress
  };

export default compose(withRouter,connect(mapState, actionCreators))(Shopping);
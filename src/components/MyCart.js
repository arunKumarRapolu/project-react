import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer, MDBLink} from "mdbreact";
import test_img from "../images/test_product.jpg";
import shopping_cart from "../images/shopping_cart.png";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";
import { userActions } from '../actions/userActions';

class MyCart extends Component{
    constructor(props){
        super(props);
        this.state={
            isRemove : false,
            isCall : false
        }
    };

    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
        else if(Object.keys(this.props.auth).length > 0 ){
            this.props.getCartData({id:this.props.auth.cart})
        }   
    }

    componentWillUpdate(nextProps, nextState) {
        if(Object.keys(nextProps.auth).length > 0 && nextState.isCall === false){
            this.setState({isCall:true},function(){
                this.props.getCartData({id:nextProps.auth.cart})
            });
        }
        
    }
    
    render(){
        const quantityDecrease = (id) => {
            let cartDataCopy = Object.assign([],this.props.cartData);
            cartDataCopy.forEach(data => {
                if(data.id === id && data.quantity > 1){
                    data.quantity -= 1;
                    data.rupees = data.quantity*data.price
                }
            });
            this.props.modifyCartData(cartDataCopy);
        };
        const quantityIncrease = (id) => {
            let cartDataCopy = Object.assign([],this.props.cartData);
            cartDataCopy.forEach(data => {
                if(data.id === id ){
                    data.quantity += 1;
                    data.rupees = data.quantity*data.price
                }
            });
            this.props.modifyCartData(cartDataCopy);
        }
        const itemRemove = async (id) => {
            let presentAuth = this.props.auth;
            let idIndex = presentAuth.cart.indexOf(id);
            presentAuth.cart.splice(idIndex,1);
            let res = await this.props.removeFromCart(presentAuth, id);
            if(res == "success"){
                this.setState({isCall:false});
            }
        }
        const checkout = () => {
            // selectedList = [];
            // this.state.products.forEach((data,i) => {
            //     if(data.quantity > 0)
            //     selectedList.push(data);
            // });
            this.props.storeList(this.props.cartData, true);
            this.props.history.push("/shopping");
        }
        const renderCart = this.props.cartData.map((item,i) => {
            return(
                <MDBCard key={item.id} className="myCartCard">
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
                    <div className="col-md-2">
                        <div className="quantityEle">
                            <div className="quantityEle-child text-right">
                                <MDBBtn className="quantityChildButton" onClick={()=> quantityDecrease(item.id)}>-</MDBBtn>
                            </div>
                            <div className="quantityEle-child quantityInputDiv">
                                <input type="text" value={item.quantity} className="quantityChildInput text-center"/>
                            </div>
                            <div className="quantityEle-child">
                                <MDBBtn className="quantityChildButton" onClick={() => quantityIncrease(item.id)}>+</MDBBtn>
                            </div>
                        </div>
                        <div className="text-center mycartItemPrice">
                            <span className="pharmacyRupees">&#8377; {item.rupees}</span>
                        </div>
                    </div>
                    <div className="col-md-4 text-center mycartItemRemove">
                        <MDBBtn outline onClick={() => itemRemove(item.id)}>Remove</MDBBtn>
                    </div>
                </div>
                </MDBCard>
            )
        });
        return(
            <div className="container">
                {this.props.cartData.length > 0 ?
                <>
                <div className="row shopping_head">
                    <div className="col-md-1">
                        <img src={shopping_cart} className="profile_img" width="50%"/>
                    </div>
                    <div className="col-md-5 profile_head_address">
                        My Cart
                    </div>
                </div>
                <div className="pharmacyList">
                    {renderCart}
                </div>
                
                <div className="row">
                    <div className="col-md-12 text-right">
                        <MDBBtn onClick={()=>checkout()}>Checkout</MDBBtn>
                    </div>
                </div> 
                </>
                :
                <div className="emptyCartDiv">
                <span className="emptyaCartSpan">Your Cart is Empty</span><br/>
                <MDBLink to="/pharmacy" className="emptyCartLink">Go to Pharmacy</MDBLink>
                </div>}
            </div>
        )
    }
}

function mapState(state) {
    const {registration,authentication } = state;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  const cartData = authentication.cartData;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
    return { auth, cartData};
  }


const actionCreators = {
    storeList : userActions.saveSelectedList,
    getCartData: userActions.getCartData,
    modifyCartData: userActions.modifyCartData,
    removeFromCart: userActions.removeFromCart
};


export default compose(
    withRouter,
    connect(mapState, actionCreators))(MyCart);
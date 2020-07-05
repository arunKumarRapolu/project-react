import React, { Component } from "react";
import test_img from "../images/test_product.jpg";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";
import { userActions } from '../actions/userActions';
import { productActions } from "../actions/productActions";
import {ToastsContainer,ToastsStore, ToastsContainerPosition} from 'react-toasts';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            quantity: 0,
            showQuantityError:false,
            totalPrice:0
        }
    }

    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
    }
    
    componentDidMount(){
        //this.usage.innerHTML = this.props.productDetails.directions
        console.log(this.props.match.params.id);
        this.props.getProductDetails({id:this.props.match.params.id});
    }
    quantityChange(e) {
        const quantity = e.target.value;
        const totalPrice = e.target.value * this.props.productDetails.price;
        this.setState({showQuantityError: false, quantity, totalPrice})
    }
    render(){
        const renderQuantityOptions = () => {
            let options = ['Select',1,2,3,4,5,6,7,8,9,10];
            return options.map((data,i) => {
                return(
                    <option key={i} value={i}> {data} </option>
                )
            });
        };
        const checkout = () => {
            if(this.state.quantity == 0){
                this.setState({showQuantityError:true})
            }
            else{
                let selectedList = [];
                let detailsCopy = Object.assign({},this.props.productDetails);
                detailsCopy.quantity = this.state.quantity;
                detailsCopy.rupees = this.state.totalPrice;
                selectedList.push(detailsCopy);
                this.props.storeList(selectedList, false);
                this.props.history.push("/shopping");
            }
        }

        const addToCart = () => {
            if(this.props.auth.cart.indexOf(this.props.productDetails.id) >= 0){
                ToastsStore.warning("Product already Added");
                return;
            }
            let data = {
                productId:this.props.productDetails.id,
                userId:this.props.auth.id
            }
            this.props.addToCart(data);
        }
        
        return(
            <div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER}/>
            { Object.keys(this.props.productDetails).length > 0 ? <div className="container">
                <div className="row">
                    <div className="col-md-12 productDetailProductName">
                        {this.props.productDetails.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                       <img src={this.props.productDetails.img} width="100%"/>
                    </div>
                    <div className="col-md-6 productDetailDesc">
                        <ul>
                            <li>
                                <span className="productDetailitemHead">Company Name - </span><span className="productDetailItem">{this.props.productDetails.company}</span>
                            </li>
                            <li>
                                <span className="productDetailitemHead">Type - </span><span className="productDetailItem">{this.props.productDetails.type}</span>
                            </li>
                            <li>
                                <span className="productDetailitemHead">Quantity - </span><span className="productDetailItem">{this.props.productDetails.sheetQuantity}</span>
                            </li>
                            <li>
                                <span className="productDetailitemHead">Product Description - </span><span className="productDetailItem">{this.props.productDetails.description}</span>
                            </li>
                            <li>
                                <span className="productDetailitemHead">Composition - </span><span className="productDetailItem">{this.props.productDetails.ingradients}</span>
                            </li>
                            <li>
                                <span className="productDetailitemHead">Usage - </span><span className="productDetailItem" ref={(e) => this.usage = e}>{this.props.productDetails.directions}</span>
                            </li>
                            <li>
                               <span className="productDetailitemHead">Total Price - </span><span className="pharmacyRupees">&#8377; {this.props.productDetails.price}</span>
                            </li>
                            <li>
                                <span className="productDetailitemHead">Select Quantity - </span>
                                <select onChange={this.quantityChange.bind(this)}>
                                    {renderQuantityOptions()}
                                </select>
                                {this.state.showQuantityError ? <div className="quantityError">Please Select Quantity</div> : ""}
                            </li>
                        </ul>
                        <MDBBtn color="primary" onClick={() => this.props.history.goBack()}>Back</MDBBtn>
                        <MDBBtn onClick={() => addToCart()}>Add to Cart</MDBBtn>
                        <MDBBtn color="success" onClick={()=>checkout()}>Buy Now</MDBBtn>
                    </div>
                </div>
            </div> : null }</div>
        )
    }
}

function mapState(state) {
    const {productRelated,registration,authentication } = state;
    const productDetails = productRelated.productDetails;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
    return { productDetails, auth};
  }

const actionCreators = {
    storeList : userActions.saveSelectedList,
    getProductDetails: productActions.getProductDetails,
    addToCart: userActions.addToCart
};


export default compose(
    withRouter,
    connect(mapState, actionCreators))(ProductDetail);

import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {ToastsContainer,ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { MDBInput, MDBCarousel, MDBLink, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import warning from "../images/warning.png";

class PaymentFail extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="container">
                <MDBCard className="transaction_card">
                  <center>
                      <img src={warning} className="sucess_img" width="5%"/>
                        <div className="trans_head2">Something went wrong</div>
                        <div className="trans_head3">Please contact us @999999999 to confirm about your order</div>
                        <MDBLink to="/" className="trans_link">Go to Home</MDBLink>
                  </center>

              </MDBCard>
            </div>
        )
    }
}

export default compose(withRouter,connect(null, null))(PaymentFail);
import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {ToastsContainer,ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { MDBInput, MDBCarousel, MDBLink, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import loader from "../images/gifLoader.gif";
import { paymentActions } from "../actions/paymentActions";
import url from "url";

class PaymentSave extends Component {
    constructor(props){
        super(props);
        if (window.performance) {
            if (performance.navigation.type == 1) {
                localStorage.removeItem('shopping');
            }
          }
    }
    async componentDidMount(){
        let storageData = JSON.parse(localStorage.getItem('shopping'));
        if(storageData == null){
          this.props.history.push('/paymentFail')
        }
        else{
            let url_parts = url.parse(this.props.location.search, true);
            let urlData = url_parts.query;
            storageData.payment_id = urlData.payment_id;
            storageData.payment_request_id = urlData.payment_request_id;
            let result = await this.props.saveTransaction(storageData);
            if(result == 'success'){
                this.props.history.push('/payment_complete/?payment_id='+urlData.payment_id)
            }
            else if(result == 'fail'){
              this.props.history.push('/paymentFail')
            }
        }
    }
    

    render(){
        return(
            <div className="container">
                <MDBCard className="transaction_card">
                  <center>
                      <img src={loader} className="sucess_img" width="5%"/>
                        <div className="trans_head1">Your Transaction is proccessing </div>
                        <div className="trans_head2">Please Don't Refresh or close this page</div>
                  
                  </center>

              </MDBCard>
            </div>
        )
    }
}

const actionCreators = {
    saveTransaction: paymentActions.saveTransaction
};

export default compose(withRouter,connect(null, actionCreators))(PaymentSave);
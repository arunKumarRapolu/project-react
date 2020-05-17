import React,{ Component } from "react";
import { MDBInput, MDBCarousel, MDBLink, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import payment_success from "../images/payment-success.png";

class PaymentPass extends Component {
    constructor(props){
        super(props);
        this.state = {
            trans_id: ''
        }
    }
    componentWillMount(){
        console.log(this.props.location.search);
        let fullstring = this.props.location.search;
        let strArr = fullstring.split('=')
        console.log(strArr[1]);
        this.setState({trans_id:strArr[1]});
    }
    render(){
        return(
            <div className="container">
              <MDBCard className="transaction_card">
                  <center>
                      <img src={payment_success} className="sucess_img" width="5%"/>
                        <div className="trans_head1">Transaction was successful</div>
                        <div className="trans_head3">Your Transaction number is <b>{this.state.trans_id}</b></div>
                        <div className="trans_head2">Thank you for shopping with us and Your order has been placed successfully !</div>
                        <MDBLink to="/" className="trans_link">Go to Home</MDBLink>
                  
                  </center>

              </MDBCard>
            </div>
        )
    }
}

export default PaymentPass;
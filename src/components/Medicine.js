import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";

class Medicine extends Component {
    render() {
        return(
            <MDBCard className="doctorCard">
                <div className="row">
                    <div className="col-md-4 pharmacyNameHead">
                        <span className="pharmacyName">{this.props.data.name}</span><span className="pharmacyType">({this.props.data.type})</span>
                        <br /><span className="pharmacySheetQuantity">{this.props.data.sheetQuantity}</span>
                    </div>
                    <div className="col-md-3 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{this.props.data.price}</b> Rupees </span>
                        <span className="pharacyRupeesFoot">(Per sheet)</span>
                    </div>
                    <div className="col-md-3">
                        <span className="pharmacySelectQuantity">Select Quantity</span><br/>
                        <div className="quantityEle">
                            <div className="quantityEle-child text-right">
                                <MDBBtn className="quantityChildButton" onClick={()=>this.props.quantityDecrease()}>-</MDBBtn>
                            </div>
                            <div className="quantityEle-child quantityInputDiv">
                                <input type="number" min={0} value={this.props.data.quantity} className="quantityChildInput text-center"/>
                            </div>
                            <div className="quantityEle-child">
                                <MDBBtn className="quantityChildButton" onClick={() => this.props.quantityIncrease()}>+</MDBBtn>
                            </div>
                        </div>
                    </div>
                    {this.props.data.rupees ?
                    <div className="col-md-2 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{this.props.data.rupees} </b>Rupees</span>
                    </div>:""}
                </div>
            </MDBCard>
        )
    }
}

export default Medicine;
import React,{ Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";

class OrdersList extends Component {
    render(){
        let serviceDateTime = new Date(this.props.data.orderTime).toLocaleTimeString({},
            {hour12:true,hour:'numeric',minute:'numeric'}
          );
        let months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let serviceDate = new Date(this.props.data.orderTime).getDate()+"-"+months[new Date(this.props.data.orderTime).getMonth()]+"-"+new Date(this.props.data.orderTime).getFullYear();
        console.log(serviceDate);
        return(
            <MDBCard className="myOrdersCard">
                <div className="myOrderFirstRow">
                <div className="row">
                    <div className="col-md-3">
                        <span className="myOrderDateSpan">Date</span> : <span className="myOrderDateSpan1">{serviceDate}</span><br/>
                        <span className="myOrderDateSpan">Time</span> : <span className="myOrderDateSpan1">{serviceDateTime}</span>
                    </div>
                    <div className="col-md-2 text-center">
                        <span className="myOrdersAddressHeading">Address</span><br/>
                        <span className="myOrdersAddressValue">{this.props.data.addressInfo.saveAs}</span>
                    </div>
                    <div className="col-md-2 text-center">
                        <span className="myOrdersAddressHeading">Status</span><br/>
                        <span className="myOrdersAddressValue">{this.props.data.status}</span>
                    </div>
                    <div className="col-md-5 text-right">
                        <span className="myOrderDateSpan">Order ID</span> : <span className="myOrderDateSpan1">{this.props.data.orderId}</span><br/>
                        <span className="myOrderDateSpan">Transaction ID</span> : <span className="myOrderDateSpan1">{this.props.data.payment_id}</span>
                    </div>
                </div>
                </div>
                <div className="row">
                    <div className="col-md-2 text-center">
                        <img src={this.props.data.productInfo.img} width="100%"/>
                    </div>
                    <div className="col-md-4 pharmacyNameHead">
                        <span className="pharmacyName">{this.props.data.productInfo.name}</span>
                        <br /><span className="by">by </span><span className="pharmacyCompanyName">{this.props.data.productInfo.company}</span>
                        <br /><span className="by">Type : </span><span className="pharmacyType">{this.props.data.productInfo.type}</span>
                        <br /><span className="by">Quantity : </span><span className="pharmacySheetQuantity">{this.props.data.productInfo.sheetQuantity}</span>
                    </div>
                    <div className="col-md-2 text-center myOrderProductmarginTop">
                        <span className="myOrdersAddressHeading">Quantity</span><br/>
                        <span className="myOrdersAddressValue">{this.props.data.quantity} No(s)</span>
                    </div>
                    <div className="col-md-2 text-right myOrderProductmarginTop">
                        <span className="myOrdersAddressHeading">Price</span><br/>
                        <span className="myOrdersAddressValue">&#8377; {this.props.data.quantity * this.props.data.price}</span>
                    </div>
                    
                </div>
            </MDBCard>
        )
    }
};

export default OrdersList;
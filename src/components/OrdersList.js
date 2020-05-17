import React,{ Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";

class OrdersList extends Component {
    render(){
        const renderList = this.props.data.map((order, i) => {
            return(
                <MDBCard className="doctorCard">
                <div className="row">
                    <div className="col-md-4 pharmacyNameHead">
                        <span className="pharmacyName">{order.name}</span><span className="pharmacyType">({order.type})</span>
                        <br /><span className="pharmacySheetQuantity">{order.sheetQuantity}</span>
                    </div>
                    <div className="col-md-3 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{order.price}</b> Rupees </span>
                        <span className="pharacyRupeesFoot">(Per sheet)</span>
                    </div>
                    <div className="col-md-2 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{order.quantity}</b> No(s) </span>
                    </div>
                    <div className="col-md-3 pharmacyRupeesHead">
                        <span className="pharmacyRupees"><b>{order.quantity * order.price} </b>Rupees</span>
                    </div>
                </div>
            </MDBCard>
            
            )
        });
        return(
            <div>
                {renderList}
            </div>
            
        )
    }
};

export default OrdersList;
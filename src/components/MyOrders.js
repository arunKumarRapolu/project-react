import React,{ Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import OrdersList from "./OrdersList";

class MyOrders extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[
                {
                    date:"10/5/2020",
                    orders:[
                        {
                            id:1,
                            name:"Paracetomol",
                            type:"Tablet",
                            sheetQuantity:"10 Tablets per sheet",
                            price:20,
                            quantity:1
        
                        },
                        {
                            id:2,
                            name:"Combiflame",
                            type:"Tablet",
                            sheetQuantity:"10 Tablets per sheet",
                            price:30,
                            quantity:2
                        }
                    ]
                },
                {
                    date:"11/5/2020",
                    orders:[
                        {
                            id:3,
                            name:"Ascoril",
                            type:"Syrup",
                            sheetQuantity:"100 ml",
                            price:80,
                            quantity:1
                        },
                        {
                            id:4,
                            name:"Paracetomol",
                            type:"Tablet",
                            sheetQuantity:"10 Tablets per sheet",
                            price:20,
                            quantity:2
        
                        },
                        {
                            id:5,
                            name:"Combiflame",
                            type:"Tablet",
                            sheetQuantity:"10 Tablets per sheet",
                            price:30,
                            quantity:3
                        }
                    ]
                }
            ]
        }
    }
    render(){
        const renderMyorders = this.state.list.map((item,i) => {
            return(
                <div>
                <div className="myOrderDate">{item.date}</div>
                <OrdersList data={item.orders} key={i} />
                </div>
            )
        })
        return(
            <div className="container">
            <div className="row col-12 inputBox">
                <div className="col-4 locationInput">
                    <div className="col-12 noPad ourDoctors">My Orders</div>
                </div> 
                <div className="col-4 searchInput ml-auto">
                    <MDBInput label="Search Pharmacy" outline size="sm" icon="search" />
                </div>
            </div>
            <div className="pharmacyList">
            {renderMyorders}
            </div>
                <div className="row">
                        <div className="col-md-12 text-right ">
                        <MDBBtn>Back</MDBBtn>
                        </div>
                </div>
            </div>
        )
    }
}

export default MyOrders
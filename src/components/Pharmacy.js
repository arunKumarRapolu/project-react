import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import Medicine from "./Medicine";
import BottomFooter from "./BottomFooter";
import {withRouter} from "react-router-dom";
import { userActions } from '../actions/userActions';
import {compose} from "redux";
import { connect } from "react-redux";

class Pharmacy extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[
                {
                    id:1,
                    name:"Paracetomol",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:20,
                    quantity:0

                },
                {
                    id:2,
                    name:"Combiflame",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:30,
                    quantity:0
                },
                {
                    id:3,
                    name:"Ascoril",
                    type:"Syrup",
                    sheetQuantity:"100 ml",
                    price:80,
                    quantity:0
                },
                {
                    id:4,
                    name:"Paracetomol",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:20,
                    quantity:0

                },
                {
                    id:5,
                    name:"Combiflame",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:30,
                    quantity:0
                },
                {
                    id:6,
                    name:"Ascoril",
                    type:"Syrup",
                    sheetQuantity:"100 ml",
                    price:80,
                    quantity:0
                },
                {
                    id:7,
                    name:"Paracetomol",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:20,
                    quantity:0

                },
                {
                    id:8,
                    name:"Combiflame",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:30,
                    quantity:0
                },
                {
                    id:9,
                    name:"Ascoril",
                    type:"Syrup",
                    sheetQuantity:"100 ml",
                    price:80,
                    quantity:0
                },
                {
                    id:10,
                    name:"Paracetomol",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:20,
                    quantity:0

                },
                {
                    id:11,
                    name:"Combiflame",
                    type:"Tablet",
                    sheetQuantity:"10 Tablets per sheet",
                    price:30,
                    quantity:0
                },
                {
                    id:12,
                    name:"Ascoril",
                    type:"Syrup",
                    sheetQuantity:"100 ml",
                    price:80,
                    quantity:0
                }
            ],
            atLeastOneSelected : false
        }
    }
    quantityIncrease = (id) => {
        let atLeastOneSelected = false;
        this.state.list.forEach(data => {
            if(data.id === id){
                data.quantity += 1;
                data.rupees = data.quantity*data.price
            }
            if(data.quantity > 0)
            atLeastOneSelected = true;
        });
        this.setState({list:this.state.list,atLeastOneSelected:atLeastOneSelected})
    }
    
    quantityDecrease = (id) => {
        let atLeastOneSelected = false;
        this.state.list.forEach(data => {
            if(data.id === id && data.quantity > 0){
                data.quantity -= 1;
                data.rupees = data.quantity*data.price
            }
            if(data.quantity > 0)
            atLeastOneSelected = true;
        });
        this.setState({list:this.state.list,atLeastOneSelected:atLeastOneSelected})
    }

    proccedClicked = () =>{
        let selectedList = [];
        this.state.list.forEach((data,i) => {
            if(data.quantity > 0)
            selectedList.push(data);
        });
        this.props.storeList(selectedList);
        this.props.history.push("/shopping");

    }
   
    render(){
        const buttons = [
            {
                name:"Proceed",
                type:"Secondary",
                click:this.proccedClicked,
                enable:this.state.atLeastOneSelected
            }
        ]
        const renderPharmacy = this.state.list.map((val,key) => {
            return(
                <Medicine key={key} data={val} quantityIncrease={() => this.quantityIncrease(val.id)} quantityDecrease={() => this.quantityDecrease(val.id)}/>
            )
        });
        return(
            <div>
            <div className="container">
            <div className="row col-12 inputBox">
                <div className="col-4 locationInput">
                    <div className="col-12 noPad ourDoctors">Select your medicine</div>
                </div> 
                <div className="col-4 searchInput ml-auto">
                    <MDBInput label="Search Pharmacy" outline size="sm" icon="search" />
                </div>
            </div>
            <div className="pharmacyList">
            {renderPharmacy}
            </div>
            <div className="row">
                    <div className="col-md-12 text-right profile_footerButtons">
                    <MDBBtn disabled={!this.state.atLeastOneSelected} onClick={this.proccedClicked.bind(this)}>Proceed to Checkout</MDBBtn>
                    </div>
                </div>
            </div>
            {/* <BottomFooter buttons={buttons}/> */}
                
            </div>
        );
    }
}

const actionCreators = {
    storeList : userActions.saveSelectedList,
};

export default compose(
    withRouter,
    connect(null, actionCreators))(Pharmacy);
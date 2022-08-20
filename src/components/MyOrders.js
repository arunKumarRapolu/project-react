import React,{ Component } from "react";
import { MDBInput, MDBLink, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import OrdersList from "./OrdersList";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { userActions } from "../actions/userActions";


class MyOrders extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCall:false
        }
    }
    
    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
        else if(Object.keys(this.props.auth).length > 0 ){
            this.props.getMyOrders(this.props.auth.id)
        }   
    }

    componentWillUpdate(nextProps, nextState) {
        if(Object.keys(nextProps.auth).length > 0 && nextState.isCall === false){
            this.setState({isCall:true},function(){
                this.props.getMyOrders(nextProps.auth.id)
            });
        }
        
    }
    goBack(){
        this.props.history.push('/');
    }
    render(){
        const renderMyorders = this.props.myOders.map((item,i) => {
            return(
                <OrdersList data={item} key={i} />
            )
        })
        return(
            <div className="container">
            <div className="row col-12 inputBox">
                <div className="col-4 locationInput">
                    <div className="col-12 noPad ourDoctors">My Orders</div>
                </div> 
            </div>
            <div className="pharmacyList">
            {this.props.myOders.length > 0 ? renderMyorders :
                <div className="emptyCartDiv">
                <span className="emptyaCartSpan">No Orders Found</span><br/>
                <MDBLink to="/pharmacy" className="emptyCartLink">Go to Pharmacy</MDBLink>
                </div>
            }
            </div>
                <div className="row">
                        <div className="col-md-12 text-right ">
                        <MDBBtn onClick={this.goBack.bind(this)}>Back</MDBBtn>
                        </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    const {registration,authentication } = state;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
  const myOders = authentication.myOders
    return{auth, myOders};
}

const actionCreators = {
    getMyOrders: userActions.getMyOrders
};

export default compose(withRouter,connect(mapState, actionCreators))(MyOrders);
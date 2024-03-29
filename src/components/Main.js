import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import TopHeader from "./TopHeader";
import BottomFooter from "./BottomFooter";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import {userActions} from "../actions/userActions";

class Main extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        if(localStorage.getItem('auth')){
            let auth = JSON.parse(localStorage.getItem('auth'));
            this.props.getUserDetails(auth.mobile, auth.password);
        }
    }
    componentDidUpdate(){
        // if (document.getElementsByClassName('loaderSpinner')[0].style.display = 'none') {
        //     document.getElementsByClassName('modal')[0].style.zindex = '1024';
        //   }
        //   else{
        //     document.getElementsByClassName('modal')[0].style.zindex = '700';
        //   }
    }
    render() {
        return (
            <LoadingOverlay active={this.props.showLoader} className="loaderSpinner" spinner styles={{"z-index":"2000"}}>
                <TopHeader />
                {this.props.children}
                {/* <BottomFooter className="bottomFooter "/> */}
            </LoadingOverlay>
        )
    }
}

function mapState(state) {
    const {loader } = state;
    const showLoader = loader.loader
    return { showLoader};
}
const actionCreators = {
    getUserDetails: userActions.getUserDetails,
  };
export default compose(
    withRouter,
    connect(mapState, actionCreators)
  )(Main);
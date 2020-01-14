import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import TopHeader from "./TopHeader";
import BottomFooter from "./BottomFooter";

class Main extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <MDBContainer className="container">
                <TopHeader />
                {this.props.children}
                <BottomFooter />
                </MDBContainer>
            </div>
        )
    }
}

export default Main;
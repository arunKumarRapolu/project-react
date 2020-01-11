import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import TopHeader from "./TopHeader";

class Main extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <TopHeader />
                <MDBContainer>
                    {this.props.children}
                </MDBContainer>
            </div>
        )
    }
}

export default Main;
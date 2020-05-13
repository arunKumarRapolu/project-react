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
                <TopHeader />
                {this.props.children}
                {/* <BottomFooter className="bottomFooter "/> */}
            </div>
        )
    }
}

export default Main;
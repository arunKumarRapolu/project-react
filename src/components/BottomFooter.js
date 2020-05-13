import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class BottomFooter extends Component {
    render() {
        return (
            <MDBFooter className="font-small pt-4 mt-4 mbfoot">
      <div className="text-center">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
        )
    }
}
export default BottomFooter;
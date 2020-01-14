import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class BottomFooter extends Component {
    render() {
        return (
            <MDBFooter className="font-small pt-4 mt-4 mbfoot">
      <MDBContainer fluid className="text-center">
       
            <h5 className="title"><b>Quick Links</b></h5>
              <div><a href="#!">About Us</a></div>
              <div><a href="#!">Contact Us</a></div>
              <div><a href="#!">Careers</a></div>
         
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
        )
    }
}
export default BottomFooter;
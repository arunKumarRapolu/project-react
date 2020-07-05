import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from 'react-redux';
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import { userActions } from "../actions/userActions";

class ContactUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            name_valid: true,
            email:'',
            email_valid: true,
            mobile:'',
            mobile_valid: true,
            message:'',
            message_valid: true,
            show_success_message : false,
            show_failure_message: false
        }
    }

    changeHandler = event => {
        let name = event.target.name;
        let invalidEle = name+"_valid"
        this.setState({ [event.target.name]: event.target.value , [invalidEle]:true, show_failure_message: false, show_success_message: false});
    };
    handleSubmit = async(e) => {
        e.preventDefault();
        let phonenoreg = /^\d{10}$/;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let proceed = true;
        let name = this.state.name;
        let phoneNum = this.state.mobile;
        let message = this.state.message;
        if(name == ''){
            this.setState({name_valid: false});
            proceed = false;
        }
        if(phoneNum == '' || (phoneNum && !phoneNum.match(phonenoreg))){
          this.setState({mobile_valid:false})
          proceed = false;
        }
        if(message == ''){
          this.setState({message_valid:false});
          proceed = false;
        }
        if(!this.state.email || (this.state.email && !this.state.email.match(mailformat))){
            this.setState({email_valid : false});
            proceed = false;
        }
        if(proceed){
            let data = {
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
                message: this.state.message
            }
        const res = await this.props.submitContactUs(data);
          if(res == 'success'){
            this.setState({show_success_message: true, name:'', mobile:'', email:'', message:''});
          }
          else if(res == 'fail'){
            this.setState({show_failure_message: true, name:'', mobile:'', email:'', message:''});
          }
        }
    }
    render(){

        return(
            <div className="container contactUsContainer">
                <div className="row">
                    <div className="col-md-5">
                        <MDBCard className="contactUsCard">
                            {this.state.show_success_message ? <div className="contactUsSubmitSuccess">Your message submitted successfully !</div> : null }
                            {this.state.show_failure_message ? <div className="contactUsSubmitFail">Something went wrong. Please try again later</div> : null }
                            <div className="contactUsHeading">
                                Contact Us
                            </div>
                            <form>
                            <div className="contactUsInput">
                                <MDBInput
                                    label="Name"
                                    icon="user"
                                    className={this.state.name_valid ? "form-control" :"form-control is-invalid"}
                                    value={this.state.name}
                                    onChange={this.changeHandler.bind(this)}
                                    error="wrong"
                                    success="right"
                                    name="name"
                                />
                            </div>
                            <div className={this.state.name_valid ? "hide" :"show invalidMsg"}>
                                Please enter Name.
                            </div>
                            <div className="contactUsInput">
                                <MDBInput
                                    label="Email"
                                    icon="envelope"
                                    className={this.state.email_valid ? "form-control" :"form-control is-invalid"}
                                    value={this.state.email}
                                    onChange={this.changeHandler.bind(this)}
                                    error="wrong"
                                    success="right"
                                    name="email"
                                />
                            </div>
                            <div className={this.state.email_valid ? "hide" :"show invalidMsg"}>
                                Please enter valid Email.
                            </div>
                            <div className="contactUsInput">
                                <MDBInput
                                    label="Contact Number"
                                    icon="phone"
                                    className={this.state.mobile_valid ? "form-control" :"form-control is-invalid"}
                                    value={this.state.mobile}
                                    onChange={this.changeHandler.bind(this)}
                                    error="wrong"message
                                    success="right"
                                    name="mobile"
                                />
                            </div>
                            <div className={this.state.mobile_valid ? "hide" :"show invalidMsg"}>
                                Please enter valid Contact Number.
                            </div>
                            <div className="contactUsInput">
                                <textarea className="contactUsTextArea" name="message" onChange={this.changeHandler.bind(this)} rows={5} placeholder="Type your message here.." value={this.state.message} />
                            </div>
                            <div className={this.state.message_valid ? "hide" :"show invalidMsg"}>
                                Please enter Message.
                            </div>
                            <div className="contactUsSubmit">
                                <MDBBtn type= "submit" onClick={this.handleSubmit.bind(this)} >{"Submit"}</MDBBtn>
                            </div>
                            </form>
                        </MDBCard>
                    </div>
                    <div className="col-md-7">
                        <div className="contactUsTextMainDiv">
                            <p>
                            <b>What is Lorem Ipsum?</b>
                            <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


  const actionCreators = {
    submitContactUs: userActions.submitContactUs
  };

export default compose(
    withRouter,
    connect(null, actionCreators)
  )(ContactUs);
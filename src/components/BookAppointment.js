import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";
import { history } from '../helpers/history';
import { MDBBtn,MDBInput,MDBModal,MDBModalHeader,MDBModalBody,MDBModalFooter} from "mdbreact";
import defaultUserImg from "../images/dafault_user_img.png";

class BookAppointment extends Component {
    constructor(props){
        super(props);
        this.state={
            isselectedDate:false,
            radioSelected:null,
            radioSelectedVal:null,
            modal14:false,
            selectedDate:null,
            showSlotError:false,
            availableSlots:[
                {id:1,time:"10:00 AM"},
                {id:2,time:"10:30 AM"},
                {id:3,time:"11:00 AM"},
                {id:4,time:"11:30 AM"},
                {id:5,time:"12:00 PM"},
                {id:6,time:"12:30 PM"},
                {id:7,time:"01:30 PM"},
                {id:8,time:"02:30 PM"},
                {id:8,time:"03:00 PM"}
            ],
            doctorDetails : {
                "doctorName" : "Venkateshwarlu",
                "specialist" : "General Physician",
                "experience" : "15",
                "hospitalName" : "Citizens Hospital",
                "hospitalAddress" : "Nallagandla, Hyderabad",
                "consultFee" : "700",
                "prId": 7,
                "doctorId":1 
            }
        }
    }
    componentDidMount(){
       // if(!this.props.appointmentDoctorId)
        //history.goBack();
    }
    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber],
        });
    }
    BookAppointment(){
        if(this.state.radioSelected != null)
        this.toggle(14)();
        else
        this.setState({showSlotError:true});
    }
    slotSelected(id,evt){
        this.setState({radioSelected : id, radioSelectedVal:evt.target.value,showSlotError:false});
    }
    dateSelected(evt){
        if(evt.target.value == 0)
        this.setState({isselectedDate:false})
        else
        this.setState({isselectedDate:true, selectedDate:evt.target.value})
    }
    gotoMain(){
        this.props.history.push("/");
    }
    render() {
        let todayDate = new Date();
        let nums = [1,2,3,4,5,6];
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const renderDateOptions = nums.map((val,key) => {
            const nex = new Date(todayDate);
            nex.setDate(nex.getDate() + val);
            let fullDateName = monthNames[nex.getMonth()]+" "+nex.getDate()+" , "+nex.getFullYear();
            return(
                <option value={fullDateName} key={key}>{fullDateName}</option>
            )
        });
        var availableSlots = this.state.availableSlots.map((val,key) => {
            let idN = "radio"+key;
            return(
                <div key={key} className="col-md-3">
                    <div className="form-check">
                    <input data-test="input" type="radio" className="slotRadio" id={idN} value={val.time} onChange={this.slotSelected.bind(this,key)} checked={this.state.radioSelected == key ? true:false} />
                        <label className="slotRadioLabel" for={idN} data-error="" data-success="" id="">{val.time}</label>
                    </div>
                </div>
            )
        });
        return(
            <div>
            <div className="row">
                <div className="col-md-12 noPad ourDoctors">Book Appointment</div>
            </div>
            <div className="row">
                <div className="col-md-3 text-center">
                    <img src={defaultUserImg} className="imageRadius" alt="Avatar" width="50%" />
                </div>
                <div className="col-md-6 docDetaildiv">
                    <div className="doctorName bold">Dr. {this.state.doctorDetails.doctorName}</div>
                    <div className="doctorTag">{this.state.doctorDetails.specialist}</div>
                    <div className="doctorExperience">{this.state.doctorDetails.experience} Years of experience overall</div>
                    <div className="doctorHospital">{this.state.doctorDetails.hospitalName}, {this.state.doctorDetails.hospitalAddress}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <select className="browser-default custom-select dateDropdown" onChange={this.dateSelected.bind(this)}>
                        <option value={0} key="0">Select Date</option>
                        {renderDateOptions}
                    </select>
                </div>
                <div className="col-md-6 text-right">
                    Consultation Fee - {this.state.doctorDetails.consultFee} Rupees
                </div>
            </div>
            {this.state.isselectedDate ? 
            <div>
                <div className="row">
                    <div className="col-md-12 noPad ourDoctors">Available Slots</div>
                </div>
                <div className="row">
                        {availableSlots}
                </div>
                {this.state.showSlotError ?
                <div className="row bookApmntErr">
                    *Please select Slot
                </div>:""}
                <div className="row text-center">
                <MDBBtn className="bookApmntBtn" onClick={this.BookAppointment.bind(this)} >Book Appointment</MDBBtn>
                </div>
            </div>:""}
            <MDBModal isOpen={this.state.modal14} centered>
                <MDBModalHeader >Confirmed !</MDBModalHeader>
                <MDBModalBody>
                    <p>
                        Thank You for booking with Company Name
                    </p>
                    <p>Your Booking with Dr.{this.state.doctorDetails.doctorName} is confirmed on <br/>
                    {this.state.selectedDate} at {this.state.radioSelectedVal}</p>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.gotoMain.bind(this,14)}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            </div>
        )
    }
}
function mapState(state) {
    const {bookingRelated } = state;
    const {appointmentDoctorId} = bookingRelated;
   
    return {appointmentDoctorId};
  }
  
 
//export default BookAppointment;
export default compose(
    withRouter,
    connect(mapState, null))(BookAppointment);
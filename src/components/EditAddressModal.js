import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { userActions } from '../actions/userActions';

class EditAddressModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            name_valid:true,
            hNo:'',
            hNo_valid:true,
            street:'',
            street_valid:true,
            landmark:'',
            landmark_valid:true,
            area:'',
            area_valid:true,
            city:'',
            city_valid:true,
            district:'',
            district_valid:true,
            state:'',
            state_valid:true,
            pin:'',
            pin_valid:true,
            saveAs:'',
            saveAs_valid:true,
            mobile:'',
            mobile_valid:true
        }
    }
    componentDidMount(){
        const data = this.props.data;
        this.setState({name:data.name,hNo:data.house,street:data.street,landmark:data.landmark,area:data.area,city:data.city,district:data.district,state:data.state,saveAs:data.saveAs,mobile:data.mobile,pin:data.pin});
    }
    changeHandler = event => {
        let name = event.target.name;
        let invalidEle = name+"_valid"
        this.setState({ [event.target.name]: event.target.value , [invalidEle]:true });
      };
    selectState = event => {
      this.setState({ state: event.target.value , state_valid:true });
    }
    saveAddress = async(e) => {
      e.preventDefault();
      let stateObj = Object.assign({}, this.state);
      let isProceed = true;
      let phonenoreg = /^\d{10}$/;
      let pincodereg = /^[1-9][0-9]{5}$/;
      if(this.state.name == null || this.state.name == ''){
        stateObj.name_valid = false;
        isProceed = false;
      }
      if(this.state.mobile == null || this.state.mobile == '' || !this.state.mobile.toString().match(phonenoreg)){
        stateObj.mobile_valid = false;
        isProceed = false;
      }
      if(this.state.hNo == null || this.state.hNo == ''){
        stateObj.hNo_valid = false;
        isProceed = false;
      }
      if(this.state.street == null || this.state.street == ''){
        stateObj.street_valid = false;
        isProceed = false;
      }
      if(this.state.area == null || this.state.area == ''){
        stateObj.area_valid = false;
        isProceed = false;
      }
      if(this.state.city == null || this.state.city == ''){
        stateObj.city_valid = false;
        isProceed = false;
      }
      if(this.state.district == null || this.state.district == ''){
        stateObj.district_valid = false;
        isProceed = false;
      }
      if(this.state.state == null || this.state.state == ''){
        stateObj.state_valid = false;
        isProceed = false;
      }
      if(this.state.pin == null || this.state.pin == '' || !this.state.pin.toString().match(pincodereg)){
        stateObj.pin_valid = false;
        isProceed = false;
      }
      if(this.state.saveAs == null || this.state.saveAs == ''){
        stateObj.saveAs_valid = false;
        isProceed = false;
      }
      if(isProceed){
        let address = {
          name:this.state.name,
          mobile:this.state.mobile,
          user_id: this.props.auth.id,
          house:this.state.hNo,
          street:this.state.street,
          landmark:this.state.landmark,
          area:this.state.area,
          city:this.state.city,
          district:this.state.district,
          state:this.state.state,
          pin:this.state.pin,
          status:'Active',
          saveAs:this.state.saveAs,
          id:this.props.data.id
        }
        let saved = await this.props.editAddress(address);
        if(saved == "success"){
          this.props.togglefunc({});
        }
      }
      else{
        this.setState(stateObj);
      }

    }
    render(){
        let allStates = [ "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
                "Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
                "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh",
                "West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Lakshadweep",
                "Puducherry"]
        const renderStateOptions = allStates.map((val,key) => {
            return(
            <option selected={this.state.state == val} value={val} key={key}>{val} - India</option>
            )
        })
        return(
            <MDBModal isOpen={this.props.show} centered modalClassName="topHeaderModal">
      <form>
      <MDBModalHeader>Change Address</MDBModalHeader>
      <MDBModalBody>
      <MDBRow>
      <MDBCol md="12">
          <div className="grey-text signInForm">
            <MDBInput
              label="Name *"
              icon="user"
              type="text"
              error="wrong"
              success="right"
              className={this.state.name_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.name}
              onChange={this.changeHandler.bind(this)}
              name="name"
            />
            <div className={this.state.name_valid ? "hide" :"show invalidMsg"}>
                Please enter Name.
            </div>
            <MDBInput
              label="Contact number *"
              icon="phone"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.mobile_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.mobile}
              onChange={this.changeHandler.bind(this)}
              name="mobile"
            />
            <div className={this.state.mobile_valid ? "hide" :"show invalidMsg"}>
                Please enter valid Contact number.
            </div>
            <MDBInput
              label="H.No *"
              icon="home"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.hNo_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.hNo}
              onChange={this.changeHandler.bind(this)}
              name="hNo"
            />
            <div className={this.state.hNo_valid ? "hide" :"show invalidMsg"}>
                Please enter valid House Number.
            </div>
            <MDBInput
              label="Street/Road No *"
              icon="road"
              group
              type="text"
              className={this.state.street_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.street}
              onChange={this.changeHandler.bind(this)}
              name="street"
            />
            <div className={this.state.street_valid ? "hide" :"show invalidMsg"}>
                Please enter Street (or) Road Number.
            </div>
             <MDBInput
              label="Landmark"
              icon="landmark"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.landmark_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.landmark}
              onChange={this.changeHandler.bind(this)}
              name="landmark"
            />
            <div className={this.state.landmark_valid ? "hide" :"show invalidMsg"}>
                Please enter Landmark.
            </div>
            <MDBInput
              label="Area *"
              icon="map-marker"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.area_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.area}
              onChange={this.changeHandler.bind(this)}
              name="area"
            />
            <div className={this.state.area_valid ? "hide" :"show invalidMsg"}>
                Please enter Area.
            </div>
            <MDBInput
              label="City *"
              icon="city"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.city_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.city}
              onChange={this.changeHandler.bind(this)}
              name="city"
            />
            <div className={this.state.city_valid ? "hide" :"show invalidMsg"}>
                Please enter City.
            </div>
            <MDBInput
              label="District *"
              icon="map-marked"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.district_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.district}
              onChange={this.changeHandler.bind(this)}
              name="district"
            />
            <div className={this.state.district_valid ? "hide" :"show invalidMsg"}>
                Please enter District.
            </div>
            <i className="fas fa-globe-americas adressStateIcon"></i>
            <select className="adress_state" onChange={this.selectState.bind(this)}>
                <option value=""> ----- Select State -----</option>
                {renderStateOptions}
            </select>
            <div className={this.state.state_valid ? "hide" :"show invalidMsg"}>
                Please select State.
            </div>
            <MDBInput
              label="Pincode *"
              icon="map-pin"
              group
              type="number"
              error="wrong"
              success="right"
              className={this.state.pin_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.pin}
              onChange={this.changeHandler.bind(this)}
              name="pin"
            />
            <div className={this.state.pin_valid ? "hide" :"show invalidMsg"}>
                Please enter Pincode.
            </div>
            <MDBInput
              label="Save As * (Ex- Home, Work, etc...)"
              icon="save"
              group
              type="text"
              error="wrong"
              success="right"
              className={this.state.saveAs_valid ? "form-control" :"form-control is-invalid"}
              value={this.state.saveAs}
              onChange={this.changeHandler.bind(this)}
              name="saveAs"
            />
            <div className={this.state.saveAs_valid ? "hide" :"show invalidMsg"}>
                Please enter Save As.
            </div>
          </div>
          
      </MDBCol>
    </MDBRow>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={this.props.togglefunc}>Close</MDBBtn>
        <MDBBtn type= "submit" color="primary" onClick={this.saveAddress.bind(this)} >Save Address</MDBBtn>
      </MDBModalFooter>
      </form>
    </MDBModal>
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
  return { auth};
}

const actionCreators = {
    editAddress : userActions.editAddress
};

export default compose(withRouter,connect(mapState, actionCreators))(EditAddressModal);
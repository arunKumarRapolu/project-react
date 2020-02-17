import React, { Component } from "react";
import $ from "jquery";
import DoctorComponent from "./DoctorComponent";

class FindDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFirstSelect:false,
            firstSelectedVal:0,
            isSecondSelect:false,
            options: [
                {
                    "areaId":1,
                    "areaName":"Head",
                    "problems":[
                        {
                            "prId":1,
                            "prName":"Headache"
                        },
                        {
                            "prId":2,
                            "prName":"Eyes"
                        },
                        {
                            "prId":3,
                            "prName":"Nose"
                        },
                    ]
                },
                {
                    "areaId":2,
                    "areaName":"Stomach",
                    "problems":[
                        {
                            "prId":4,
                            "prName":"Stomach pain"
                        },
                        {
                            "prId":5,
                            "prName":"Gastric problems"
                        },
                        {
                            "prId":6,
                            "prName":"Back pain"
                        },
                    ]
                },
                {
                    "areaId":3,
                    "areaName":"Leg",
                    "problems":[
                        {
                            "prId":7,
                            "prName":"Knee pain"
                        },
                        {
                            "prId":8,
                            "prName":"Leg pain"
                        },
                        {
                            "prId":9,
                            "prName":"Leg Broken"
                        },
                    ]
                }
              ],
              yourDoctors:[
                {
                    "doctorName" : "Venkateshwarlu",
                    "specialist" : "General Physician",
                    "experience" : "15",
                    "hospitalName" : "Citizens Hospital",
                    "hospitalAddress" : "Nallagandla, Hyderabad",
                    "consultFee" : "700",
                    "prId": 7,
                    "doctorId":1 
                },
                {
                    "doctorName" : "Satish",
                    "specialist" : "Orthopedicist",
                    "experience" : "10",
                    "hospitalName" : "Medicover Hospitals",
                    "hospitalAddress" : "Madhapur, Hyderabad",
                    "consultFee" : "600",
                    "prId": 7,
                    "doctorId":2
                }
              ]
        }
    }
    firstSelected(val){
        if(val.target.value != 0)
        this.setState({firstSelectedVal:val.target.value,isFirstSelect:true});
        else
        this.setState({firstSelectedVal:val.target.value,isFirstSelect:false,isSecondSelect:false})
    }
    secondSelected(val){
        if(val.target.value != 0)
        this.setState({isSecondSelect:true});
        else
        this.setState({isSecondSelect:false})
    }
    render(){
        var that = this;
        const renderFirstSelectOptions = this.state.options.map((val,key) => {
            return(
                <option value={val.areaId} key={val.areaId}>{val.areaName}</option>
            )
        });
        const renderSecondSelectOptions = this.state.options.map((val,key) => {
            if(val.areaId == that.state.firstSelectedVal){
                return val.problems.map((val1,key1) => {
                    return(
                        <option value={val1.prId} key={val1.prId}>{val1.prName}</option>
                    )
                });
            }
        });
        const renderDoctors = this.state.yourDoctors.map((val,key) => {
            return(
                <DoctorComponent key={key} data={val}/>
            )
        });
        return(
            <div>
            <div className="row">
                <div className="col-md-12 noPad ourDoctors">Find your Doctor</div>
            </div>
            <div className="row">
                <select className="browser-default custom-select findDoctorDropdown" onChange={this.firstSelected.bind(this)}>
                <option value={0} key="0">Choose Area</option>
                {renderFirstSelectOptions}
                </select>
            </div>
            <div className="row">
                <select className="browser-default custom-select findDoctorDropdown" onChange={this.secondSelected.bind(this)} disabled={!this.state.isFirstSelect}>
                <option value={0} key="0">Choose Problem</option>
                {this.state.isFirstSelect ? renderSecondSelectOptions : null}
                </select>
            </div>
             {this.state.isFirstSelect && this.state.isSecondSelect ?
            <div className="row">
                <div className="col-md-12 noPad ourDoctors text-center">Your Doctors</div>
                <div className="col-md-12"> {this.state.yourDoctors ? renderDoctors : null} </div>
            </div>:
            <div className="row">
                <div className="selectDropdownMessage text-center bold">
                 Oh no! <br/>
                    Select {!this.state.isFirstSelect && !this.state.isSecondSelect ? "Area and Problem" : 
                    !this.state.isSecondSelect ? "Problem" :""
                } to find your doctor
                </div>
            </div>}
        </div>
        )
    }
}
export default FindDoctor;
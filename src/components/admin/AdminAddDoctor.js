import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { adminActions } from '../../actions/adminActions';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect, shallowEqual } from "react-redux";
import AdminNav from "./AdminNav";

class AdminAddDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            designation:'',
            qualification:'',
            experience:'',
            address:'',
            description:'',
            img:'',
            fee:'',
            api_err_msg:'',
            api_success_msg:''
        }
    }
    submitform = async () => {
        let data = {
            name:this.state.name,
            designation:this.state.designation,
            qualification:this.state.qualification,
            experience:this.state.experience,
            description:this.state.description,
            address:this.state.address,
            fee:this.state.fee,
            status:'Active',
            img:this.state.img,
            user_id:JSON.parse(localStorage.getItem('auth')).id
        }
        let res = await this.props.addDoctor(data);
        if(res.type == "success"){
            this.setState({name:'',designation:'',qualification:'',experience:'',img:'',address:'',fee:'',api_err_msg:'',api_success_msg:res.message});
            document.querySelectorAll('textarea').forEach((item)=>{
                item.value = '';
            })
        }
        else{
            this.setState({api_err_msg:res.message,api_success_msg:''});
        }
    }
    setentry = (stateName, e) => {
        this.setState({[stateName]:e.target.value,api_success_msg:'',api_err_msg:''});
    }
    render(){

        const fileSelected = async (acceptedFiles) => {
            //this.setState({seletedFile : acceptedFiles[0]});
           const fileBaseString = await toBase64(acceptedFiles[0]);
           if(fileBaseString)
            this.setState({img : fileBaseString});
           // this.setState({seletedFile : acceptedFiles[0]});
        }

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        return(
            <div className="container">
                <AdminNav/>
                <div className="row"> <h4>Add Doctor</h4></div>
                {this.state.api_success_msg !== '' ?<span className="successMsg"> <h5>{this.state.api_success_msg}</h5></span>:""}
                    {this.state.api_err_msg !== '' ?<span className="invalidMsg"> <h5>{this.state.api_err_msg}</h5></span>:""}
                <form>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Name :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.name} onChange={this.setentry.bind(this, 'name')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Designation :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.designation} onChange={this.setentry.bind(this, 'designation')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Qualification :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.qualification} onChange={this.setentry.bind(this, 'qualification')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Experience :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.experience} onChange={this.setentry.bind(this, 'experience')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Address :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.address} onChange={this.setentry.bind(this, 'address')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Consultation Fee :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.fee} onChange={this.setentry.bind(this, 'fee')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Doctor Image :
                        </div>
                        <div className="col-md-4">
                        
                        <Dropzone accept=".jpeg,.png,.jpg" multiple={false} onDrop={fileSelected}>
                    {({getRootProps, getInputProps}) => (
                        <div>
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <input type="button" value="click here" />
                        </div>
                        </div>
                    )}
                    </Dropzone>
                        </div>
                        <div className="col-md-4">
                            <img src={this.state.img} width="100px"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Description :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'description')}>{this.state.description}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <input type="button" onClick={this.submitform.bind(this)} value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const actionCreators = {
    addDoctor : adminActions.addDoctor
};

export default compose(
    withRouter,
    connect(null, actionCreators))(AdminAddDoctor);
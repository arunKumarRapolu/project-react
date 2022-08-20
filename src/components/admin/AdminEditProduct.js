import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, 
    MDBModalFooter,MDBRow, MDBCol, MDBInput} from "mdbreact";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";
import { adminActions } from '../../actions/adminActions';
import AdminNav from "./AdminNav";
import Dropzone from "react-dropzone";


class AdminEditProduct extends Component{
    constructor(props) {
        super(props);
        this.state={
            product:{},
            api_success_msg:'',
            api_err_msg:''
        }
    }
    async componentDidMount(){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.getProductDetails(this.props.match.params.id,user_id);
        if(res.type == "success"){
            this.setState({product:res.product})
         }
         else{
             this.setState({api_err_msg:res.message,api_success_msg:''});
         }
    }
    setentry = (stateName, e) => {
        let product = this.state.product;
        product[stateName] = e.target.value
        this.setState({product,api_success_msg:'',api_err_msg:''});
    }
    submitform = async () => {
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.saveProductDetails(this.state.product,user_id);
        if(res.type == "success"){
            this.setState({api_err_msg:'',api_success_msg:res.message});
         }
         else{
             this.setState({api_err_msg:res.message,api_success_msg:''});
         }
    }
    render(){
        const fileSelected = async (acceptedFiles) => {
            //this.setState({seletedFile : acceptedFiles[0]});
           const fileBaseString = await toBase64(acceptedFiles[0]);
           if(fileBaseString)
           {
               let product = this.state.product;
               product.img = fileBaseString;
               this.setState({product});
           }
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
                <div className="row"> <h4>Edit Product</h4></div>
                {this.state.api_success_msg !== '' ?<span className="successMsg"> <h5>{this.state.api_success_msg}</h5></span>:""}
                    {this.state.api_err_msg !== '' ?<span className="invalidMsg"> <h5>{this.state.api_err_msg}</h5></span>:""}
                {
                    Object.keys(this.state.product).length > 0 ?
                    <form>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Name :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.product.name} onChange={this.setentry.bind(this, 'name')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Type :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.product.type} onChange={this.setentry.bind(this, 'type')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Sheet Quantity :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.product.sheetQuantity} onChange={this.setentry.bind(this, 'sheetQuantity')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Price :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.product.price} onChange={this.setentry.bind(this, 'price')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Company :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.product.company} onChange={this.setentry.bind(this, 'company')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Image :
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
                            <img src={this.state.product.img} width="100px"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Description :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'description')}>{this.state.product.description}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Ingradients :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'ingradients')}>{this.state.product.ingradients}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Directions :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'directions')}>{this.state.product.directions}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <input type="button" onClick={this.submitform.bind(this)} value="Submit" />
                        </div>
                    </div>
                </form>
                : ''
                }
            </div>
        )
    }
}

const actionCreators = {
    getProductDetails: adminActions.getProductDetails,
    saveProductDetails: adminActions.saveProductDetails
};


export default compose(
    withRouter,
    connect(null, actionCreators))(AdminEditProduct);
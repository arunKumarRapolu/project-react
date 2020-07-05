import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer} from "mdbreact";
import Medicine from "./Medicine";
import BottomFooter from "./BottomFooter";
import {withRouter} from "react-router-dom";
import { userActions } from '../actions/userActions';
import { uploadActions } from '../actions/uploadActions';
import {compose} from "redux";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import test_img from "../images/test_product.jpg";
import { productActions } from "../actions/productActions";

class Pharmacy extends Component{
    constructor(props){
        super(props);
        this.state={
            atLeastOneSelected : false,
            seletedFile:null,
            selectedFileBase64:null,
            searchCompany:'',
            searchProduct:'',
            searchType:'',
            uploadError:false,
            showUploadSuccessMessage: false,
            showUploadFailMessage: false
        }
    }
    quantityIncrease = (id) => {
        let atLeastOneSelected = false;
        this.state.list.forEach(data => {
            if(data.id === id){
                data.quantity += 1;
                data.rupees = data.quantity*data.price
            }
            if(data.quantity > 0)
            atLeastOneSelected = true;
        });
        this.setState({list:this.state.list,atLeastOneSelected:atLeastOneSelected})
    }

    componentDidMount(){
        this.props.getProductList();
    }

    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
    }
    
    quantityDecrease = (id) => {
        let atLeastOneSelected = false;
        this.state.list.forEach(data => {
            if(data.id === id && data.quantity > 0){
                data.quantity -= 1;
                data.rupees = data.quantity*data.price
            }
            if(data.quantity > 0)
            atLeastOneSelected = true;
        });
        this.setState({list:this.state.list,atLeastOneSelected:atLeastOneSelected})
    }

    proccedClicked = () =>{
        let selectedList = [];
        this.state.list.forEach((data,i) => {
            if(data.quantity > 0)
            selectedList.push(data);
        });
        this.props.storeList(selectedList);
        this.props.history.push("/shopping");

    }

    render(){
        const buttons = [
            {
                name:"Proceed",
                type:"Secondary",
                click:this.proccedClicked,
                enable:this.state.atLeastOneSelected
            }
        ]
        const renderPharmacy = this.props.products.map((val,key) => {
            return(
                <Medicine key={key} data={val}/>
            )
        });

        const renderTypeOptions = () => {
            const unique = [...new Set(this.props.productsCopy.map(item => item.type))];
            return unique.map((item,i) => {
                return(
                <option value={item} key={i}>{item}</option>
                )
            })
        }

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const fileSelected = async (acceptedFiles) => {
            //this.setState({seletedFile : acceptedFiles[0]});
           const fileBaseString = await toBase64(acceptedFiles[0]);
           if(fileBaseString)
            this.setState({seletedFile : acceptedFiles[0], selectedFileBase64:fileBaseString, showUploadFailMessage:false, showUploadSuccessMessage: false, uploadError:false});
           // this.setState({seletedFile : acceptedFiles[0]});
        }
        const prescription_upload = async() => {
            if(this.state.seletedFile == null){
                this.setState({uploadError: true});
                return;
            }
            let imageObj = {
                imageName: "base-image-" + Date.now(),
                imageData: this.state.selectedFileBase64.toString()
              };
          //  let imageObj={a:"Arun"}
            const result = await this.props.upload(imageObj, this.state.seletedFile, this.props.auth);
            if(result){
                if(result == "success")
                this.setState({showUploadSuccessMessage:true, seletedFile:null, selectedFileBase64:null});
                else if(result == "fail")
                this.setState({showUploadFailMessage:true, seletedFile:null, selectedFileBase64:null})
            }
        }
        const searchCompany = (e) => {
            this.setState({searchCompany:e.target.value});
            this.props.serachProduct(e.target.value,this.state.searchType,this.state.searchProduct);
        }
        const searchType = (e) => {
            this.setState({searchType:e.target.value});
            this.props.serachProduct(this.state.searchCompany,e.target.value,this.state.searchProduct);
        }
        const searchName = (e) => {
            this.setState({searchProduct:e.target.value});
            this.props.serachProduct(this.state.searchCompany,this.state.searchType,e.target.value);
        }
        return(
            <div>
            <div className="container">
                <div className="row">
                    {/* <div className="col-md-12 text-right">
                        <MDBBtn onClick={()=>this.props.upload()}>Upload</MDBBtn>
                    </div> */}
                    <div className="prescription_dropzone">
                    <Dropzone accept=".jpeg,.png,.jpg,.pdf" multiple={false} onDrop={fileSelected}>
                    {({getRootProps, getInputProps}) => (
                        <div>
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {this.state.showUploadSuccessMessage ? <div className="successMsg">File Uploaded Successfully</div>:null}
                        {this.state.showUploadFailMessage ? <div className="errorMsg">Something went wrong while uploading. Please try again later</div>:null}
                        <p className="prescription_desc">Already have Prescription ? <br/> Click here to Upload Your Prescription. We will get back to you shortly
                        </p>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                {this.state.seletedFile ?
                                <div>
                                <span className="prescription_dropzone_files">Files</span>
                                <ul>
                                    <li>
                                    <span className="prescription_dropzone_filelist">{this.state.seletedFile.path} - {this.state.seletedFile.size} bytes</span>
                                    </li>
                                </ul> </div>: this.state.uploadError ? <div className="uploadFileErrMsg"> Please Select valid file </div> : ""}
                            </div>
                            <div className="col-md-6">
                                <MDBBtn outline onClick={()=>prescription_upload()}>Upload</MDBBtn>
                            </div>
                        </div>
                        </div>
                    )}
                    </Dropzone>
                    </div>
                </div>
            <div className="row  inputBox">
                <div className="col-md-4 locationInput">
                    <div className="col-12 noPad ourDoctors">Our Products</div>
                </div> 
            </div>
            <div className="row">
                <div className="col-md-4">
                    <MDBInput label="Search Company" outline size="sm" icon="search" onChange={(e) => searchCompany(e)}/>
                </div>
                <div className="col-md-4">
                    <select className="browser-default custom-select" onChange={(e) => searchType(e)}>
                    <option value=''>Select Type</option>
                    {this.props.productsCopy.length > 0 ? renderTypeOptions() : null }
                    </select>
                </div>
                <div className="col-md-4">
                    <MDBInput label="Search Product" outline size="sm" icon="search" onChange={(e) => searchName(e)}/>
                </div>
            </div>
            <div className="pharmacyList">
                {this.props.products.length > 0 ? renderPharmacy : <div className="noProductsFound"> No Products Found </div> }
            </div>
                {/* <div className="row">
                    <div className="col-md-12 text-right profile_footerButtons">
                    <MDBBtn disabled={!this.state.atLeastOneSelected} onClick={this.proccedClicked.bind(this)}>Proceed to Checkout</MDBBtn>
                    </div>
                </div> */}
            </div>
            {/* <BottomFooter buttons={buttons}/> */}
                
            </div>
        );
    }
}

function mapState(state) {
    const {productRelated,registration,authentication } = state;
    const products = productRelated.products;
    const productsCopy = productRelated.productsCopy;
    const regAuth = registration.auth;
  const signinAuth = authentication.auth;
  let auth = {};
  if(Object.keys(regAuth).length > 0)
  auth = regAuth;
  else if(Object.keys(signinAuth).length > 0)
  auth = signinAuth;
  else if(localStorage.getItem('auth'))
  auth = JSON.parse(localStorage.getItem('auth'));
  else
  auth = {}
    return { products, productsCopy, auth};
  }

const actionCreators = {
    storeList : userActions.saveSelectedList,
    upload : uploadActions.upload,
    getProductList : productActions.getProducts,
    serachProduct: productActions.serachProduct,
};

export default compose(
    withRouter,
    connect(mapState, actionCreators))(Pharmacy);
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { productActions } from '../../actions/productActions';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect, shallowEqual } from "react-redux";
import AdminNav from "./AdminNav";

class AdminAddProduct extends Component {
    constructor(props){
        super();
        this.state = {
            name : '',
            type: '',
            sheetQuantity:'',
            price:'',
            company:'',
            img: '',
            description:'',
            ingradients:'',
            directions:''
        }
    }
    submitform = async () => {
        let res = await this.props.addProduct(this.state);
        if(res == "success"){
            this.setState({name:'',type:'',sheetQuantity:'',price:'',company:'',img:'',description:'',ingradients:'',directions:''});
            document.querySelectorAll('textarea').forEach((item)=>{
                item.value = '';
            })
        }
    }
    // shouldComponentUpdate(nextPros, nextState){
    //     return shallowEqual(this,nextPros)
    // }
    // componentDidUpdate(){
    //     if(this.props.addSuccess != "" )
    //     this.setState({name:""});
    // }
    componentWillMount(){
        if(!localStorage.getItem('auth')){
            this.props.history.push('/');
        }
    }
    setentry = (stateName, e) => {
        this.setState({[stateName]:e.target.value});
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
        return (

            <div className="container">
                <AdminNav/>
                <div className="row"> <h4>Add Product</h4></div>
                    {this.props.addSuccess !== '' ?<span className="successMsg"> <h5>{this.props.addSuccess}</h5></span>:""}
                    {this.props.addFaill !== '' ?<span className="invalidMsg"> <h5>{this.props.addFaill}</h5></span>:""}
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
                        Type :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.type} onChange={this.setentry.bind(this, 'type')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Sheet Quantity :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.sheetQuantity} onChange={this.setentry.bind(this, 'sheetQuantity')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Price :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.price} onChange={this.setentry.bind(this, 'price')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Company :
                        </div>
                        <div className="col-md-8">
                        <input type="text" value={this.state.company} onChange={this.setentry.bind(this, 'company')}/>
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
                        <div className="col-md-4 text-right">
                        Ingradients :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'ingradients')}>{this.state.ingradients}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        Directions :
                        </div>
                        <div className="col-md-8">
                            <textarea cols={100} rows={10} onChange={this.setentry.bind(this, 'directions')}>{this.state.directions}</textarea>
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

function mapState(state) {
    const {productRelated} = state;
    const addSuccess = productRelated.successMsg;
    const addFaill = productRelated.errMsg;
    return {addSuccess, addFaill};
  }


const actionCreators = {
    addProduct : productActions.addProduct
};

export default compose(
    withRouter,
    connect(mapState, actionCreators))(AdminAddProduct);
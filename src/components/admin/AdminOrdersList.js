import React, { Component } from "react";
import AdminNav from "./AdminNav";
import { adminActions } from '../../actions/adminActions';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { connect } from "react-redux";

class AdminOrdersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            api_err_msg:'',
            api_success_msg:'',
            orders:[]
        }
    }
    async componentWillMount(){
        let user_id = JSON.parse(localStorage.getItem('auth')).id
        let res = await this.props.getAllOrders(user_id);
        if(res.type == "success"){
           this.setState({orders:res.orders})
        }
        else{
            this.setState({api_err_msg:res.message,api_success_msg:''});
        }
    }
    goToOrderDetail(id){
        this.props.history.push("/admin/order/edit/"+id)
        // var iframe = "<iframe width='100%' height='100%' src='" + id + "'></iframe>"
        // var x = window.open();
        // x.document.open();
        // x.document.write(iframe);
        // x.document.close();
    }
    base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64); // Comment this if not using base64
        const bytes = new Uint8Array(binaryString.length);
        return bytes.map((byte, i) => binaryString.charCodeAt(i));
      }
    render(){
        let months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const renderTable = this.state.orders.map((data,i) => {
            let serviceDateTime = new Date(data.orderTime).toLocaleTimeString({},{hour12:true,hour:'numeric',minute:'numeric'});
            let serviceDate = new Date(data.orderTime).getDate()+"-"+months[new Date(data.orderTime).getMonth()]+"-"+new Date(data.orderTime).getFullYear();
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{serviceDate}</td>
                    <td>{serviceDateTime}</td>
                    <td>{data.productInfo.name}</td>
                    <td>{data.userInfo.name}</td>
                    <td>{data.status}</td>
                    <td><a className="linkColor" onClick={this.goToOrderDetail.bind(this,data.productInfo.img)}>Details</a></td>
                </tr>
            )
        })
        return(
            <div className="container">
                <AdminNav/>
                <div className="row"> <h4>All Orders</h4></div>
                {this.state.api_success_msg !== '' ?<span className="successMsg"> <h5>{this.state.api_success_msg}</h5></span>:""}
                    {this.state.api_err_msg !== '' ?<span className="invalidMsg"> <h5>{this.state.api_err_msg}</h5></span>:""}
                    <div className="pharmacyList">
                {this.state.orders.length > 0 ? 
                <table className="adminTable">
                    <tr>
                        <th>S.No.</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Product Name</th>
                        <th>Ordered By</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {renderTable}

                </table> :
                <div className="noProductsFound"> No Orders Found </div> }
            </div>
            </div>
        )
    }
}

const actionCreators = {
    getAllOrders: adminActions.getAllOrders
};

export default compose(
    withRouter,
    connect(null, actionCreators))(AdminOrdersList);

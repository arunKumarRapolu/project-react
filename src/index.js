import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import { history } from './helpers/history';
import Main from "./components/Main";
import HomePage from "./components/HomePage";
import DoctorsMain from "./components/DoctorsMain";
import BookAppointment from "./components/BookAppointment";
import Pharmacy from "./components/Pharmacy";
import MyProfile from "./components/MyProfile";
import MyOrders from "./components/MyOrders";
import Shopping from "./components/Shopping";
import PaymentPass from "./components/PaymentPass";
import ContactUs from "./components/ContactUs";
import ProductDetail from "./components/ProductDetail";
import MyCart from "./components/MyCart";
import ScrollToTop from "./components/ScrollTop";
import PageNotFound from "./components/PageNotFound";
import AdminAddProduct from "./components/admin/AdminAddProduct";
import PaymentSave from "./components/PaymentSave";
import PaymentFail from "./components/PaymentFail";
import AdminHome from "./components/admin/AdminHome";
import AdminAddDoctor from "./components/admin/AdminAddDoctor";
import AdminDoctorsList from "./components/admin/AdminDoctorsList";
import AdminUsersList from "./components/admin/AdminUsersList";
import AdminOrdersList from "./components/admin/AdminOrdersList";
import AdminPrescriptionList from "./components/admin/AdminPrescriptionList";
import AdminContactUsList from "./components/admin/AdminContactUsList";

class App extends React.Component {
    render(){
        const NotFoundRedirect = () => <Redirect to='/not-found' />
        return (
            <BrowserRouter history={history}>
                <ScrollToTop>
                <Switch>
                    <Main>
                        <Route exact path="/" render={() => <HomePage/>} />
                        <Route exact path="/doctors" render={(routeProps) => <DoctorsMain {...routeProps}/>}/>
                        <Route exact path="/contactUs" component={ContactUs} />
                        <Route exact path="/doctors/appointment" render={(routeProps) => <BookAppointment {...routeProps}/>}/>
                        <Route exact path="/pharmacy" component={Pharmacy} />
                        <Route exact path="/myprofile" component={MyProfile} />
                        <Route exact path="/myorders" component={MyOrders} />
                        <Route exact path="/shopping" component={Shopping} />
                        <Route exact path="/payment_complete" component={PaymentPass} />
                        <Route exact path="/productDetail/:id" component={ProductDetail} />
                        <Route exact path="/cart" component={MyCart} />
                        <Route exact path='/not-found' component={PageNotFound} />
                        <Route exact path='/admin/products/add' component={AdminAddProduct}/>
                        <Route exact path='/payment' component={PaymentSave}/>
                        <Route exact path='/paymentFail' component={PaymentFail}/>
                        <Route exact path='/admin/home' component={AdminHome}/>
                        <Route exact path='/admin/doctors/add' component={AdminAddDoctor}/>
                        <Route exact path='/admin/doctors' component={AdminDoctorsList}/>
                        <Route exact path='/admin/users' component={AdminUsersList}/>
                        <Route exact path='/admin/orders' component={AdminOrdersList}/>
                        <Route exact path='/admin/prescriptions' component={AdminPrescriptionList}/>
                        <Route exact path='/admin/contactUs' component={AdminContactUsList}/>
                        {/* <Route exact path="*" component={NotFoundRedirect} /> */}
                    </Main>
                </Switch>
                </ScrollToTop>
            </BrowserRouter>
        );
    }
}

ReactDOM.render( 
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));

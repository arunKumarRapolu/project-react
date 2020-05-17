import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Router} from "react-router-dom"
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
import FindDoctor from "./components/FindDoctor";
import BookAppointment from "./components/BookAppointment";
import Pharmacy from "./components/Pharmacy";
import MyProfile from "./components/MyProfile";
import MyOrders from "./components/MyOrders";
import Shopping from "./components/Shopping";
import PaymentPass from "./components/PaymentPass";

class App extends React.Component {
    render(){
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Main>
                        <Route exact path="/" component={HomePage} /> 
                        <Route exact path="/doctors" render={(routeProps) => <DoctorsMain {...routeProps}/>}/>
                        <Route exact path="/finddoctor" component={FindDoctor} />
                        <Route exact path="/doctors/appointment" render={(routeProps) => <BookAppointment {...routeProps}/>}/>
                        <Route exact path="/pharmacy" component={Pharmacy} />
                        <Route exact path="/myprofile" component={MyProfile} />
                        <Route exact path="/myorders" component={MyOrders} />
                        <Route exact path="/shopping" component={Shopping} />
                        <Route exact path="/payment_complete" component={PaymentPass} />
                    </Main>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render( 
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));

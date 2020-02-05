import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import Main from "./components/Main";
import HomePage from "./components/HomePage";
import DoctorsMain from "./components/DoctorsMain";

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Main>
                        <Route exact path="/" component={HomePage} /> 
                        <Route exact path="/doctors" component={DoctorsMain} /> 
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

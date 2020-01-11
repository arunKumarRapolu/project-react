import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import Main from "./components/Main";
import HomePage from "./components/HomePage";

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Main>
                        <Route exact path="/" component={HomePage} /> 
                    </Main>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render( <App /> , document.getElementById('root'));

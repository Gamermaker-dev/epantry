import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from "axios";

// import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
  

class App extends Component {
    constructor(props) {
        super(props);

        // create interceptors
        axios.interceptors.request.use((config) => {
            const csrfToken = this.props.cookieService.getCookie('csrftoken');
            config.headers['X-CSRFToken'] = csrfToken;

            return config;
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home {...this.props} />
                    </Route>
                    <Route exact path="/about">
                        <About {...this.props} />
                    </Route>
                    <Route exact path="/contact">
                        <Contact {...this.props} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from "axios";

import RefuelHeader from "./components/RefuelHeader";
import RefuelFooter from "./components/RefuelFooter";

// import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
  

class App extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            isAuthenticated: this.props.securityService.isUserAuthenticated(),
            user: null,
        }
        
        const logged_in = this.props.cookieService.getCookie("logged_in");
        if (logged_in) {
            this.getUser();
        }
    }

    login(username, password) {
        this.props.securityService.login(username, password)
            .then((res) => {
                this.setState({isAuthenticated: res});
            });
    }

    logout() {
        this.props.securityService.logout()
            .then((res) => {
                this.setState({isAuthenticated: res});
            });
    }

    getUser() {
        const id = window.localStorage.getItem("user");
        if (id) {
            this.props.userService.fetchUserInfo(id)
                .then((user) => {
                    this.setState({user: user});
                });
        }
    }

    render() {
        return (
            <div>
                <RefuelHeader
                  userAuthenticated={this.state.isAuthenticated}
                  logout={this.logout}
                 {...this.props}></RefuelHeader>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home 
                            userAuthenticated={this.state.isAuthenticated}
                            login={this.login}
                            user={this.state.user}
                            {...this.props} />
                        </Route>
                        <Route exact path="/about">
                            <About {...this.props} />
                        </Route>
                        <Route exact path="/contact">
                            <Contact {...this.props} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile user={this.state.user}
                            {...this.props} />
                        </Route>
                        <Route exact path="/pantry-admin">
                            <Admin {...this.props} />
                        </Route>
                    </Switch>
                </Router>
                <RefuelFooter {...this.props}></RefuelFooter>
            </div>
        );
    }
}

export default App;
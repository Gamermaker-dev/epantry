import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useParams,
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
import ModelPage from "./pages/ModelPage";
import UserModelPage from "./pages/ModelPages/UserModelPage";
import GroupModelPage from "./pages/ModelPages/GroupModelPage";
  

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
                this.getUser();
            });
    }

    logout() {
        this.props.securityService.logout()
            .then((res) => {
                this.setState({isAuthenticated: res});
                window.location.href = 'http://localhost:8000';
            });
    }

    getUser() {
        const id = window.localStorage.getItem("user");
        if (id) {
            this.props.userService.get(id)
                .then((user) => {
                    this.setState({user: user});
                });
        }
    }

    render() {
        // setup paths for breadcrumb for each page
        const homePath = [
            {url: '/', name: 'Home', active: false}
        ];

        const aboutPath = homePath.slice().concat([{url: '/about', name: 'About', active: false}]);
        const contactPath = homePath.slice().concat([{url: '/contact', name: 'Contact', active: false}]);
        const pantryPath = homePath.slice().concat([{url: '/pantry', name: 'Pantry', active: false}]);
        const profilePath = homePath.slice().concat([{url: '/profile', name: 'Profile', active: false}]);
        const adminPath = homePath.slice().concat([{url: '/pantry-admin', name: 'Admin', active: false}]);
        const categoryPath = adminPath.slice().concat([{url: '/category/', name: 'Category', active: false}]);
        const colorPath = adminPath.slice().concat([{url: '/color/', name: 'Color', active: false}]);
        const groupPath = adminPath.slice().concat([{url: '/group/', name: 'Group', active: false}]);
        const userPath = adminPath.slice().concat([{url: '/user/', name: 'User', active: false}]);

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
                            path={homePath}
                            {...this.props} />
                        </Route>
                        <Route exact path="/about">
                            <About path={aboutPath} {...this.props} />
                        </Route>
                        <Route exact path="/contact">
                            <Contact path={contactPath} {...this.props} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile user={this.state.user} path={profilePath}
                            {...this.props} />
                        </Route>
                        <Route exact path="/pantry-admin">
                            <Admin path={adminPath} {...this.props} />
                        </Route>
                        <Route exact path="/pantry-admin/category/:id" children={<ModelWithParams path={categoryPath} modelName='category' modelService={this.props.categoryService} {...this.props} />} />
                        <Route exact path="/pantry-admin/color/:id" children={<ModelWithParams path={colorPath} modelName='color' modelService={this.props.colorService} {...this.props} />} />
                        <Route exact path="/pantry-admin/group/:id" children={<ModelWithParams path={groupPath} modelName='group' modelService={this.props.groupService} {...this.props} />} />
                        <Route exact path="/pantry-admin/user/:id" children={<ModelWithParams path={userPath} modelName='user' modelService={this.props.userService} {...this.props} />} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
                <RefuelFooter {...this.props}></RefuelFooter>
            </div>
        );
    }
}

function ModelWithParams(props) {
    let { id } = useParams();

    let el =  (
        <ModelPage id={id} {...props} />
    );

    if (props.modelName === 'user') {
        el = (
            <UserModelPage id={id} {...props} />
        );
    } else if (props.modelName === 'group') {
        el = (
            <GroupModelPage id={id} {...props} />
        );
    }

    return  el;
}

export default App;
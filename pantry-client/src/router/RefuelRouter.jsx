import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useParams,
    useHistory,
  } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

// import Pages
import Home from "../pages/Home";
import Pantry from "../pages/Pantry";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import ModelPage from "../pages/ModelPage";
import UserModelPage from "../pages/ModelPages/UserModelPage";
import GroupModelPage from "../pages/ModelPages/GroupModelPage";
import VerseModelPage from "../pages/ModelPages/VerseModelPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

export function RefuelRouter(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <RefuelRoute page={
                        <Home {...props} />
                    } />
                </Route>
                <Route exact path="/about">
                    <RefuelRoute page={
                        <About {...props} />
                    } />
                </Route>
                <Route exact path="/contact">
                    <RefuelRoute page={
                        <Contact {...props} />
                    } />
                </Route>
                <Route exact path="/pantry">
                    <RefuelRoute page={
                        <Pantry {...props} />
                    } />
                </Route>
                <Route exact path="/profile">
                    <RefuelRoute page={
                        <Profile {...props} />
                    } />
                </Route>
                <Route exact path="/forgotpassword">
                    <RefuelRoute page={
                        <ForgotPassword {...props} />
                    } />
                </Route>
                <Route exact path="/resetpassword">
                    <RefuelRoute page={
                        <ResetPassword {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin">
                    <RefuelRoute page={
                        <Admin {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/category/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='category' modelService={props.categoryService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/clothes/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='clothes' modelService={props.clothesService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/color/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='color' modelService={props.colorService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/condition/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='condition' modelService={props.conditionService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/gender/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='gender' modelService={props.genderService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/group/:id">
                    <RefuelRoute page={
                        <GroupModelPage modelName='group' modelService={props.groupService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/permission/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='permission' modelService={props.permissionService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/school/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='school' modelService={props.schoolService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/size/:id">
                    <RefuelRoute page={
                        <ModelPage modelName='size' modelService={props.sizeService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/user/:id">
                    <RefuelRoute page={
                        <UserModelPage modelName='user' modelService={props.userService} {...props} />
                    } />
                </Route>
                <Route exact path="/pantry-admin/verse/:id">
                    <RefuelRoute page={
                        <VerseModelPage modelName='verse' modelService={props.verseService} {...props} />
                    } />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export function RefuelRoute(props) {
    let params = useParams();
    let query = useQuery();
    let history = useHistory();

    let page = props.page;

    page = React.cloneElement(page, {router: history});

    if (props.useParams)
        page = React.cloneElement(page, {params: params});
    
    if (props.useQuery)
        page = React.cloneElement(page, {queryParams: query});

    return page;
}
import React, { Component } from "react";
import RefuelNavbar from "./RefuelNavbar";

export default class RefuelHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RefuelNavbar 
                userAuthenticated={this.props.userAuthenticated}
                securityService={this.props.securityService}
                currency={this.props.currency}
                logout={this.props.logout}
            ></RefuelNavbar>
        );
    }
}
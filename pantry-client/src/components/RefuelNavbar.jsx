import React, { Component } from "react";
import {
    Navbar
} from "react-bulma-components";

export default class RefuelNavbar extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        if (this.props.userAuthenticated) {
            return (
                <Navbar
                    fixed='top'
                    color='refuel'
                    active={true}
                >
                    <Navbar.Brand>
                        <Navbar.Item renderAs="a" href="/">
                            <img src="/img/ReFuel.png" />
                        </Navbar.Item>
                    </Navbar.Brand>
                    <Navbar.Menu>
                        <Navbar.Container>
                            <Navbar.Item href="/">
                                Home
                            </Navbar.Item>
                            <Navbar.Item href="/pantry">
                                Pantry
                            </Navbar.Item>
                            <Navbar.Item href="/pantry-admin">
                                Admin
                            </Navbar.Item>
                            <Navbar.Item href="/about">
                                About
                            </Navbar.Item>
                            <Navbar.Item href="/contact">
                                Contact Us
                            </Navbar.Item>
                        </Navbar.Container>
                        <Navbar.Container align="right">
                            <Navbar.Item href="/profile">
                                Profile
                            </Navbar.Item>
                            <Navbar.Item href="#"
                                        onClick={this.props.logout}>
                                Logout
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>
            );
        } else {
            return (
                <Navbar
                    fixed='top'
                    color='refuel'
                    active={true}
                >
                    <Navbar.Brand>
                        <Navbar.Item renderAs="a" href="https://lmbc.org/refuel">
                            <img src="/img/ReFuel.png" />
                        </Navbar.Item>
                    </Navbar.Brand>
                    <Navbar.Menu>
                        <Navbar.Container>
                            <Navbar.Item href="/">
                                Home
                            </Navbar.Item>
                            <Navbar.Item href="#">
                                Pantry
                            </Navbar.Item>
                            <Navbar.Item href="/about">
                                About
                            </Navbar.Item>
                            <Navbar.Item href="/contact">
                                Contact Us
                            </Navbar.Item>
                        </Navbar.Container>
                        <Navbar.Container align="right">
                            <Navbar.Item href="#">
                                Sign Up
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>
            );
        }
    }
}
import { toast } from "bulma-toast";
import React, { Component } from "react";
import { Columns, Container, Section, Form, Button, } from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelLoadBar from "../components/RefuelLoadBar";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
        this.state = {
            user: {},
        };
    }

    signUp(newUser) {
        this.props.userService.signUp(this.state.user)
            .then(() => {
                toast({
                    message: 'Registration successful! Please verify your email address to login.',
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                })
                this.props.router.push('/home');
            });
    }

    render() {
        return (
            <div>
                <RefuelBanner title="New User Registration" />
                <RefuelBreadcrumbs location={this.props.router.location} />
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column>
                                <form>
                                    <Form.Field>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.user.username}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newuser = prevState.user;
                                                        newuser.username = e.target.value;
                                                        return newuser;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.user.first_name}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newuser = prevState.user;
                                                        newuser.first_name = e.target.value;
                                                        return newuser;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.user.last_name}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newuser = prevState.user;
                                                        newuser.last_name = e.target.value;
                                                        return newuser;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.user.email}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newuser = prevState.user;
                                                        newuser.email = e.target.value;
                                                        return newuser;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color="refuel"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.signUp(this.state.user);
                                                }}
                                            >Register</Button>
                                        </Form.Control>
                                    </Form.Field>
                                </form>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        );
    }
}
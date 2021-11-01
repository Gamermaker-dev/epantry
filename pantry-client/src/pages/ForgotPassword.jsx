import React, { Component } from "react";
import { Button, Columns, Container, Form, Section, } from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.sendResetEmail = this.sendResetEmail.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = {
            email: undefined,
            emailSent: false,
        };

        this.props.path[1].active = true;
    }

    sendResetEmail(email) {
        this.props.securityService.sendResetEmail(email)
            .then((res) => {
                this.setState({ emailSent: true });
            });
    }

    renderForm() {
        return (
            <form>
                <Form.Field>
                    <Form.Label>Email</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type="email"
                            color="refuel"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Control>
                        <Button
                            color="refuel"
                            onClick={(e) => {
                                e.preventDefault();
                                this.sendResetEmail(this.state.email);
                            }}
                        >Send</Button>
                    </Form.Control>
                </Form.Field>
            </form>
        );
    }

    render() {
        return (
            <div>
                <RefuelBanner title="Forgot Password" />
                <RefuelBreadcrumbs path={this.props.path} />
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column>
                                { this.state.emailSent ? (<span>Thank you! Please check your email for the reset link.</span>) : this.renderForm() }
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        );
    }
}
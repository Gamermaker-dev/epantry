import React, { Component } from "react";
import { Columns, Container, Section, } from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelPasswordForm from "../components/RefuelPasswordForm";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        if (!this.props.token) {
            this.props.history.push('/home'); // redirect if no token
        }

        this.resetPassword = this.resetPassword.bind(this);
        this.state = {
            token: this.props.token,
        };

        this.props.path[1].active = true;
    }

    resetPassword(passwordObj) {
        this.props.securityService.changePassword(passwordObj)
            .then((res) => {
                this.props.history.push('/home');
            });
    }

    render() {
        return (
            <div>
                <RefuelBanner title="Reset Password" />
                <RefuelBreadcrumbs path={this.props.path} />
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column>
                                <RefuelPasswordForm requireOldPassword={false} changePassword={this.resetPassword} />
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        );
    }
}
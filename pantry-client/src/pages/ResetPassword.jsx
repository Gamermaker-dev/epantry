import { toast } from "bulma-toast";
import React, { Component } from "react";
import { Columns, Container, Section, } from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelLoadBar from "../components/RefuelLoadBar";
import RefuelPasswordForm from "../components/RefuelPasswordForm";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        if (!this.props.token) {
            this.props.router.push('/home'); // redirect if no token
        }

        this.resetPassword = this.resetPassword.bind(this);
        this.validateToken = this.validateToken.bind(this);
        this.state = {
            token: this.props.token,
            valid: false,
        };

        this.validateToken(this.props.token);
    }

    resetPassword(passwordObj) {
        this.props.securityService.changePassword(this.state.token, passwordObj.newPassword)
            .then(() => {
                toast({
                    message: 'Password change successful!',
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                })
                this.props.router.push('/home');
            });
    }

    validateToken(token) {
        this.props.securityService.validateToken(token)
            .then(() => {
                this.setState({ valid: true });
            });
    }

    render() {
        return this.state.valid ? (
            <div>
                <RefuelBanner title="Reset Password" />
                <RefuelBreadcrumbs location={this.props.router.location} />
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
        ) : (
            <RefuelLoadBar />
        );
    }
}
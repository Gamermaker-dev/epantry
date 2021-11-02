import React, { Component } from "react";
import { Button, Form } from "react-bulma-components";

export default class RefuelPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.renderOldPassword = this.renderOldPassword.bind(this);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        };
    }

    renderOldPassword() {
        return (
            <Form.Field>
                <Form.Label>Old Password</Form.Label>
                <Form.Control>
                    <Form.Input color="refuel" value={this.state.oldPassword} type="password" onChange={(e) => this.setState({ oldPassword: e.target.value })} />
                </Form.Control>
            </Form.Field>
        );
    }

    render() {
        return (
            <form>
                {this.props.requireOldPassword ? this.renderOldPassword() : null }
                <Form.Field>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control>
                        <Form.Input color="refuel" value={this.state.newPassword} type="password" onChange={(e) => this.setState({ newPassword: e.target.value })} />
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control>
                        <Form.Input color="refuel" value={this.state.newPasswordConfirm} type="password" onChange={(e) => this.setState({ newPasswordConfirm: e.target.value })} />
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Control>
                        <Button
                            color="refuel"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.changePassword(this.state, this.props.requireOldPassword);
                            }}
                        >Change Password</Button>
                    </Form.Control>
                </Form.Field>
            </form>
        );
    }
}
import React, { Component } from "react";
import {
    Section,
    Container,
    Columns,
    Form,
    Button
} from "react-bulma-components";

export default class Home extends Component {
    constructor(props) {
       super(props);
       this.state = {
           username: '',
           password: ''
       };
    }

    render() {
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column
                            size="half"
                            offset="one-quarter"
                        >
                            <form>
                                <Form.Field>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control>
                                        <Form.Input
                                            color="refuel"
                                            value={this.state.username}
                                            type="text"
                                            onChange={(e) => {
                                                return this.setState({ username: e.target.value });
                                            }}
                                        />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control>
                                        <Form.Input
                                            color="refuel"
                                            value={this.state.password}
                                            type="password"
                                            onChange={(e) => {
                                                return this.setState({ password: e.target.value });
                                            }}
                                        />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Control>
                                        <Button
                                            color="refuel"
                                            onChange={null}
                                            onClick={ (e) => {
                                                e.preventDefault();
                                                this.props.userLogin(this.state.username, this.state.password)
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </Form.Control>
                                </Form.Field>
                            </form>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }
}
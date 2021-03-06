import React, { Component } from "react";
import {
    Section,
    Container,
    Columns,
    Form,
    Button,
} from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelLoadBar from "../components/RefuelLoadBar";

export default class Home extends Component {
    constructor(props) {
       super(props);
       this.updateUser = this.updateUser.bind(this);
       this.state = {
           user: {}
       };
       
       const id = window.localStorage.getItem("user");
       this.props.userService.get(id)
        .then((user) => {
            this.setState({ user: user });
        });
    }

    updateUser(updatedUser) {
        this.props.userService.update(updatedUser)
            .then((user) => {
                this.setState(prevState => {
                    const newUser = prevState.user;
                    newUser.id = user.id;
                    newUser.username = user.username;
                    newUser.first_name = user.first_name;
                    newUser.last_name = user.last_name;
                    newUser.email = user.email;
                    return {user: newUser}
                });
            });
    }

    render() {
        let body = [
            <RefuelBanner
                title="Edit Profile"
            ></RefuelBanner>,
            <RefuelBreadcrumbs location={this.props.router.location} />,
        ];

        let section = [];
        
        if (this.state.user.id) {
            section = [
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
                                                value={this.state.user.username}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newUser = prevState.user;
                                                        newUser.username = e.target.value;
                                                        return {user: newUser};
                                                    });
                                                }}
                                            />
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
                                                        const newUser = prevState.user;
                                                        newUser.first_name = e.target.value;
                                                        return {user: newUser};
                                                    });
                                                }}
                                            />
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
                                                        const newUser = prevState.user;
                                                        newUser.last_name = e.target.value;
                                                        return {user: newUser};
                                                    });
                                                }}
                                            />
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
                                                        const newUser = prevState.user;
                                                        newUser.email = e.target.value;
                                                        return {user: newUser};
                                                    });
                                                }}
                                            />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color="refuel"
                                                onClick={ (e) => {
                                                    e.preventDefault();
                                                    this.updateUser(this.state.user);
                                                }}
                                            >
                                                Update
                                            </Button>
                                        </Form.Control>
                                    </Form.Field>
                                </form>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            ];
        } else {
            section = [
                <RefuelLoadBar />
            ]
        }

        body.push(section);

        return (<div>{body}</div>);
    }
}
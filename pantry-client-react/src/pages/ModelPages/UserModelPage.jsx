import React, { Component } from "react";
import { Section, Container, Columns, Form, Button, } from "react-bulma-components";
import RefuelBanner from "../../components/RefuelBanner";
import RefuelBreadcrumbs from "../../components/RefuelBreadcrumbs";
import RefuelToggleSwitch from "../../components/RefuelBulmaComponents/RefuelToggleSwitch";

export default class UserModelPage extends Component {
    constructor(props) {
        super(props);
        this.getModel = this.getModel.bind(this);
        this.createModel = this.createModel.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.state = {
            model: {
                is_active: true, // make true by default for new categories
                wallet: {}, // create blank wallet object
            },
            allGroups: [],
        };

        this.modelId = this.props.id;

        this.props.path[1].url += '#user';
        this.props.path[2].url += this.modelId;
        this.props.path[2].active = true;

        this.getModel(this.modelId);
        this.getGroups();
    }

    getModel(id) {
        if (id === 'new') return;

        this.props.modelService.get(id)
            .then((model) => {
                this.setState({ model: model});
            });
    }

    getGroups() {
        this.props.groupService.get()
            .then((groups) => {
                this.setState({ allGroups: groups });
            });
    }

    createModel(newUser) {
        this.props.modelService.create(newUser)
            .then((model) => {
                window.location.href = `http://localhost:8000${this.props.path[1].url}`;
            });
    }

    updateModel(updatedUser) {
        this.props.modelService.update(updatedUser)
            .then((model) => {
                this.setState({ model: model });
            });
    }

    render() {
        const id = this.modelId;
        
        return (
            <div>
                <RefuelBanner title={id === 'new' ? `Create ${this.props.modelName}` : `Update ${this.props.modelName}`} /> 
                <RefuelBreadcrumbs path={this.props.path} />
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
                                                value={this.state.model.username}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.username = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.model.first_name}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.first_name = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.model.last_name}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.last_name = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.model.email}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.email = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Groups</Form.Label>
                                        <Form.Control>
                                            <Form.Select
                                                color="refuel"
                                                value={this.state.model.groups}
                                                multiple={true}
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newGroups = [];
                                                        const options = e.target.options;
                                                        const newmodel = prevState.model;
                                                        for (let i = 0; i < options.length; i++) {
                                                            if (options[i].selected) {
                                                                newGroups.push(parseInt(options[i].value))
                                                            }
                                                        }
                                                        newmodel.groups = newGroups;
                                                        return newmodel;
                                                    });
                                                }}
                                            >
                                                {this.state.allGroups.map((g) => (
                                                    <option value={g.id}>{g.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Control>
                                            <RefuelToggleSwitch
                                                checked={this.state.model.is_active}
                                                id="isActive"
                                                color="refuel"
                                                onChange={() => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.is_active = !newmodel.is_active;
                                                        return newmodel;
                                                    });
                                                }}
                                            />
                                            <Form.Label for="isActive">Is Active?</Form.Label>
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Control>
                                            <RefuelToggleSwitch 
                                                checked={this.state.model.is_superuser}
                                                id="isSuperuser"
                                                color="refuel"
                                                onChange={() => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.is_superuser = !newmodel.is_superuser;
                                                        return newmodel;
                                                    });
                                                }}
                                            />
                                            <Form.Label>Is Superuser?</Form.Label>
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Control>
                                            <RefuelToggleSwitch 
                                                checked={this.state.model.is_staff}
                                                id="isStaff"
                                                color="refuel"
                                                onChange={() => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.is_staff = !newmodel.is_staff;
                                                        return newmodel;
                                                    });
                                                }}
                                            />
                                            <Form.Label>Is Staff?</Form.Label>
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Date Joined</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                readOnly={true}
                                                disabled={true}
                                                value={new Date(this.state.model.date_joined).toLocaleString()}
                                                type="text" />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Last Login</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                readOnly={true}
                                                disabled={true}
                                                value={new Date(this.state.model.last_login).toLocaleString()}
                                                type="text" />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.model.wallet.currency}
                                                type="number"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.wallet.currency = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Last Refill Date</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                readOnly={true}
                                                disabled={true}
                                                value={new Date(this.state.model.wallet.last_refill_date).toLocaleString()}
                                                type="text" />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color="refuel"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (id === 'new') {
                                                        this.createModel(this.state.model);
                                                    } else {
                                                        this.updateModel(this.state.model);
                                                    }
                                                }}
                                            >{id === 'new' ? 'Create' : 'Update'} {this.props.modelName}</Button>
                                        </Form.Control>
                                    </Form.Field>
                                </form>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        )
    }
}
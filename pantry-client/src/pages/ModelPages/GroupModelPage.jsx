import React, { Component } from "react";
import { Section, Container, Columns, Form, Button, } from "react-bulma-components";
import RefuelBanner from "../../components/RefuelBanner";
import RefuelBreadcrumbs from "../../components/RefuelBreadcrumbs";

export default class GroupModelPage extends Component {
    constructor(props) {
        super(props);
        this.getModel = this.getModel.bind(this);
        this.createModel = this.createModel.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.state = {
            model: { },
            allPermissions: [],
        };

        this.modelId = this.props.id;

        this.props.path[1].url += '#group';
        this.props.path[2].url += this.modelId;
        this.props.path[2].active = true;

        this.getModel(this.modelId);
        this.getPermissions();
    }

    getModel(id) {
        if (id === 'new') return;

        this.props.modelService.get(id)
            .then((model) => {
                this.setState({ model: model });
            });
    }

    getPermissions() {
        this.props.permissionService.get()
            .then((permissions) => {
                this.setState({ allPermissions: permissions })
            })
    }

    createModel(newGroup) {
        this.props.modelService.create(newGroup)
            .then((model) => {
                window.location.href = `http://localhost:8000/pantry-admin/${this.props.modelName}/${model.id}`;
            });
    }

    updateModel(updatedGroup) {
        this.props.modelService.update(updatedGroup)
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
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.model.name}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.name = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Permissions</Form.Label>
                                        <Form.Control>
                                            <Form.Select
                                                color="refuel"
                                                value={this.state.model.permissions}
                                                multiple={true}
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newPermissions = [];
                                                        const options = e.target.options;
                                                        const newmodel = prevState.model;
                                                        for (let i = 0; i < options.length; i++) {
                                                            if (options[i].selected) {
                                                                newPermissions.push(parseInt(options[i].value))
                                                            }
                                                        }
                                                        newmodel.permissions = newPermissions;
                                                        return newmodel;
                                                    });
                                                }}
                                            >
                                                {this.state.allPermissions.map((p) => (
                                                    <option value={p.id}>{p.name}</option>
                                                ))}
                                            </Form.Select>
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
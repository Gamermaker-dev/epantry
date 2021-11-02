import React, { Component } from "react";
import { Section, Container, Columns, Form, Button, } from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelToggleSwitch from "../components/RefuelBulmaComponents/RefuelToggleSwitch";

export default class ModelPage extends Component {
    constructor(props) {
        super(props);
        this.getModel = this.getModel.bind(this);
        this.createModel = this.createModel.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.state = {
            model: {
                is_active: true, // make true by default for new categories
            },
        };

        this.modelId = this.props.id;
        
        this.props.path[1].url += `#${this.props.modelName}`;
        this.props.path[2].url += this.modelId;
        this.props.path[2].active = true;

        this.getModel(this.modelId);
    }

    getModel(id) {
        if (id === 'new') return;

        this.props.modelService.get(id)
            .then((model) => {
                this.setState({ model: model});
            });
    }

    createModel(name, active) {
        this.props.modelService.create({name: name, is_active: active})
            .then((model) => {
                window.location.href = `http://localhost:8000${this.props.path[1].url}`;
            });
    }

    updateModel(id, name, active) {
        this.props.modelService.update({id: id, name: name, is_active: active})
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
                                        <Form.Control>
                                            <RefuelToggleSwitch 
                                                id="isActive"
                                                color="refuel"
                                                checked={this.state.model.is_active}
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
                                            <Button
                                                color="refuel"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (id === 'new') {
                                                        this.createModel(this.state.model.name, this.state.model.is_active);
                                                    } else {
                                                        this.updateModel(this.state.model.id, this.state.model.name, this.state.model.is_active);
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
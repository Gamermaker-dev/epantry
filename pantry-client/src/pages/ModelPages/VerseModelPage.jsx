import React, { Component } from "react";
import { Section, Container, Columns, Form, Button, } from "react-bulma-components";
import RefuelBanner from "../../components/RefuelBanner";
import RefuelBreadcrumbs from "../../components/RefuelBreadcrumbs";

export default class VerseModelPage extends Component {
    constructor(props) {
        super(props);
        this.getModel = this.getModel.bind(this);
        this.createModel = this.createModel.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.state = {
            model: { },
        };

        this.modelId = this.props.id;

        this.props.path[1].url += '#verse';
        this.props.path[2].url += this.modelId;
        this.props.path[2].active = true;

        this.getModel(this.modelId);
    }

    getModel(id) {
        if (id === 'new') return;

        this.props.modelService.get(id)
            .then((model) => {
                this.setState({ model: model });
            });
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
                                        <Form.Label>Verse</Form.Label>
                                        <Form.Control>
                                            <Form.Input
                                                color="refuel"
                                                value={this.state.model.verse}
                                                type="text"
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.verse = e.target.value;
                                                        return newmodel;
                                                    });
                                                }} />
                                        </Form.Control>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Label>Passage</Form.Label>
                                        <Form.Control>
                                            <Form.Textarea
                                                color="refuel"
                                                value={this.state.model.passage}
                                                size="medium"
                                                placeholder="Bible Scripture goes here..."
                                                onChange={(e) => {
                                                    return this.setState(prevState => {
                                                        const newmodel = prevState.model;
                                                        newmodel.passage = e.target.value;
                                                        return newmodel;
                                                    });
                                                }}
                                            />
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
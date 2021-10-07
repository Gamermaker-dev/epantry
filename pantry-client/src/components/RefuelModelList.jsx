import React, { Component } from "react";
import {
    Table,
    Progress,
} from "react-bulma-components";

export default class RefuelModelList extends Component {
    constructor(props) {
        super(props);
        this.loadModels = this.loadModels.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.state = {
            models: null,
        }

        // kick things off by loading the models
        this.loadModels(this.props.modelService);
    }

    loadModels(service) {
        service.get()
            .then((models) => {
                this.setState(prevState => {
                    return {models: models};
                });
            })
            .catch((err) => {
                this.setState(prevState => {
                    return {models: null };
                });
            });
    }

    renderTable() {
        const tbody = [];

        for (let i = 0; i < this.state.models.length; i++) {
            tbody.push(<td>this.models[i].name</td>);
            tbody.push(<td>this.models[i].is_active</td>);
        }

        return (
            <Table size="fullwidth" bordered={true}>
                <thead>
                    <th>Name</th>
                    <th>Is Active?</th>
                </thead>
                {tbody}
            </Table>
        )
    }

    render() {
        let elements = {};
        if (this.state.models === null) {
            elements = (
                <Progress max="100" size="large" color="refuel" />
            );
        } else {
            elements = this.renderTable();
        }

        return elements;
    }


}
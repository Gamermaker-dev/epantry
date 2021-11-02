import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Table,
    Icon,
} from "react-bulma-components";
import RefuelLoadBar from "./RefuelLoadBar";

export default class RefuelModelList extends Component {
    constructor(props) {
        super(props);
        this.deleteModel = this.deleteModel.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.state = {
            service: this.props.modelService,
        }
    }

    deleteModel(id) {
        this.state.service.delete(id)
            .then((res) => {
                this.props.loadModels(this.props.activeTab);
                return res;
            });
    }

    renderTable() {
        const tbody = [];

        for (let i = 0; i < this.props.models.length; i++) {
            tbody.push(<tr>
                <td><a href={`/pantry-admin/color/${this.props.models[i].id}`}>{this.props.models[i].name}</a></td>
                <td>{this.props.models[i].is_active ? 'Yes' : 'No'}</td>
                <td><a href={`/pantry-admin/color/${this.props.models[i].id}`}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faEdit} /></Icon></a></td>
                <td><a onClick={() => this.deleteModel(this.props.models[i].id)}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faTrash} /></Icon></a></td>
            </tr>);
        }

        return (
            <Table size="fullwidth" bordered={true}>
                <thead>
                    <th>Name</th>
                    <th>Is Active?</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </Table>
        )
    }

    render() {
        let elements = {};

        if (this.props.models === null) {
            elements = (
                <RefuelLoadBar />
            );
        } else {
            elements = this.renderTable();
        }

        return elements;
    }


}
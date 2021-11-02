import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Table,
    Progress,
    Icon,
} from "react-bulma-components";
import RefuelModelList from "../RefuelModelList";

export default class RefuelGroupList extends RefuelModelList {
    constructor(props) {
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }

    renderTable() {
        const tbody = [];

        for (let i = 0; i < this.props.models.length; i++) {
            tbody.push(
                    <tr>
                        <td><a href={`/pantry-admin/group/${this.props.models[i].id}`}>{this.props.models[i].name}</a></td>
                        <td><a href={`/pantry-admin/group/${this.props.models[i].id}`}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faEdit} /></Icon></a></td>
                        <td><a onClick={() => this.deleteModel(this.props.models[i].id)}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faTrash} /></Icon></a></td>
                    </tr>
                );
        }

        return (
            <Table size="fullwidth" bordered={true}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
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
                <Progress max="100" size="large" color="refuel" />
            );
        } else {
            elements = this.renderTable();
        }

        return elements;
    }


}
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Table,
    Icon,
} from "react-bulma-components";
import RefuelModelList from "../RefuelModelList";
import RefuelLoadBar from "../RefuelLoadBar";

export default class RefuelUserList extends RefuelModelList {
    constructor(props) {
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }

    renderTable() {
        const tbody = [];

        for (let i = 0; i < this.props.models.length; i++) {
            tbody.push(<tr>
                <td><a href={`/pantry-admin/user/${this.props.models[i].id}`}>{this.props.models[i].username}</a></td>
                <td>{this.props.models[i].first_name}</td>
                <td>{this.props.models[i].last_name}</td>
                <td>{this.props.models[i].is_active ? 'Yes' : 'No'}</td>
                <td><a href={`/pantry-admin/user/${this.props.models[i].id}`}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faEdit} /></Icon></a></td>
                <td><a onClick={() => this.deleteModel(this.props.models[i].id)}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faTrash} /></Icon></a></td>
            </tr>);
        }

        return (
            <Table size="fullwidth" bordered={true}>
                <thead>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
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
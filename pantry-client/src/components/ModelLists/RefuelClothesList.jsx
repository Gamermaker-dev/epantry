import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Table,
    Icon,
    Image,
} from "react-bulma-components";
import RefuelModelList from "../RefuelModelList";
import RefuelLoadBar from "../RefuelLoadBar";

export default class RefuelClothesList extends RefuelModelList {
    constructor(props) {
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }

    renderTable() {
        const tbody = [];

        for (let i = 0; i < this.props.models.length; i++) {
            tbody.push(
                    <tr>
                        <td><a href={`/pantry-admin/clothes/${this.props.models[i].id}`}><Image src={this.props.models[i].image} /></a></td>
                        <td>{this.props.models[i].category}</td>
                        <td>{this.props.models[i].size}</td>
                        <td>{this.props.models[i].gender}</td>
                        <td>{this.props.models[i].color}</td>
                        <td>{this.props.models[i].condition}</td>
                        <td>{this.props.models[i].brand}</td>
                        <td>{this.props.models[i].inventory_date}</td>
                        <td>{this.props.models[i].description}</td>
                        <td><a href={`/pantry-admin/clothes/${this.props.models[i].id}`}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faEdit} /></Icon></a></td>
                        <td><a onClick={() => this.deleteModel(this.props.models[i].id)}><Icon color="refuel" size="medium"><FontAwesomeIcon icon={faTrash} /></Icon></a></td>
                    </tr>
                );
        }

        return (
            <Table size="fullwidth" bordered={true}>
                <thead>
                    <tr>
                        <th>Clothing</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Gender</th>
                        <th>Color</th>
                        <th>Condition</th>
                        <th>Brand</th>
                        <th>Inventory Date</th>
                        <th>Description</th>
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
                <RefuelLoadBar />
            );
        } else {
            elements = this.renderTable();
        }

        return elements;
    }


}
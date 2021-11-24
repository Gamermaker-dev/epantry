import React, { Component } from "react";
import { Box, Breadcrumb } from "react-bulma-components";
import { capitalize } from "../utils/capitalize";

export default class RefuelBreadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.location = this.props.location;

        this.state = {
            breadcrumbs: this.location.pathname.split("/"),
        };
    }

    isCrumbActive() {
        // Test to see if crumb is current path
    }

    getCrumbName() {
        // get name for crumb
    }

    render() {
        return (
            <Box>
                <Breadcrumb>
                    {this.state.breadcrumbs.map((path) => (
                        <Breadcrumb.Item active={path.active}>
                            <a href={path.url}>{path.name}</a>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </Box>
        );
    }
}
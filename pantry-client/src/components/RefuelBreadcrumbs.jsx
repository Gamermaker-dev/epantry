import React, { Component } from "react";
import { Box, Breadcrumb } from "react-bulma-components";

export default class RefuelBreadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.paths = this.props.path;
    }

    render() {
        return (
            <Box>
                <Breadcrumb>
                    {this.paths.map((path) => (
                        <Breadcrumb.Item active={path.active}>
                            <a href={path.url}>{path.name}</a>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </Box>
        );
    }
}
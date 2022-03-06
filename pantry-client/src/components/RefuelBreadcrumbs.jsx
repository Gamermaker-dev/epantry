import React, { Component } from "react";
import { Box, Breadcrumb } from "react-bulma-components";
import { capitalize } from "../utils/capitalize";

export default class RefuelBreadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.location = this.props.location;
        this.getCrumbName = this.getCrumbName.bind(this);
        this.getCrumbUrl = this.getCrumbUrl.bind(this);

        this.state = {
            breadcrumbs: this.location.pathname.split("/"),
        };

        // this is kind of bad, but it'll have to do. We want to ignore the first element of the array.
        if (this.location.pathname === '/') {
            this.state.breadcrumbs.shift(); // shift removes the first element of the array
        }
    }

    getCrumbUrl(index, paths) {
        // get url for crumb
        let url = '';

        for (let i = 0; i <= index; i++) {
            url = url + '/' + paths[i];
        }

        return url;
    }

    getCrumbName(path) {
        // get name for crumb
        if (path === '') {
            return 'Home';
        }

        return capitalize(path);
    }

    render() {
        return (
            <Box>
                <Breadcrumb>
                    {this.state.breadcrumbs.map((path, i, paths) => (
                        <Breadcrumb.Item active={(i === paths.length - 1)}>
                            <a href={this.getCrumbUrl(i, paths)}>{this.getCrumbName(path)}</a>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </Box>
        );
    }
}
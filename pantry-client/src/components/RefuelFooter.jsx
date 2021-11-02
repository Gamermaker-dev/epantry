import React, { Component } from "react";
import {
    Footer,
    Content,
    Container,
    Columns
} from "react-bulma-components";

export default class RefuelHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer
                backgroundColor="refuel"
                className="has-text-light"
            >
                <Container>
                    <Columns>
                        <Columns.Column
                            size="2"
                        >
                            <a href="https://lmbc.org/refuel"><img src="/img/ReFuel-logo.png" /></a>
                        </Columns.Column>
                        <Columns.Column
                            size="2"
                        >
                            <ul>
                                <li><strong>Service Times</strong></li>
                                <li>9:30 AM - 10:30 AM</li>
                            </ul>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Footer>
        );
    }
}
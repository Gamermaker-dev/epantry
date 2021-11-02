import React, { Component } from "react";
import {
    Hero,
    Container
} from "react-bulma-components";

export default class RefuelBanner extends Component {
    constructor(props) {
       super(props);
    }

    render() {
        return (
            <Hero
                color="refuel-grey"
            >
                <Hero.Body>
                    <Container>
                    <h1 class="title">
                        {this.props.title}
                    </h1>
                    <h2 class="subtitle">
                        {this.props.subtitle}
                    </h2>
                    </Container>
                </Hero.Body>
            </Hero>
        );
    }
}
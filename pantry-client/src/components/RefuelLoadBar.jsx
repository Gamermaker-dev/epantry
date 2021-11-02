import React, { Component } from "react";
import { Section, Container, Progress } from "react-bulma-components";

export default class RefuelLoadBar extends Component {
    render() {
        return (
            <Section>
                <Container>
                    <Progress max="100" size="large" color="refuel" />
                </Container>
            </Section>
        );
    }
}
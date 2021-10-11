import React, { Component } from "react";
import {
    Block,
    Button,
    Container,
    Columns,
    Notification,
    Section,
} from "react-bulma-components";

export default class RefuelError extends Component {
    constructor(props) {
        super(props);
        this.renderErrors = this.renderErrors.bind(this);
    }

    renderErrors() {
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <Block>
                                <Notification color="danger">
                                    <ul>
                                        {this.props.errors.map(error => {
                                            return <li>{error.field}: {error.message.map(mes => { return <span> {mes} </span> })}</li>
                                        })}
                                    </ul>
                                    <Button remove onClick={this.props.removeErrors} />
                                </Notification>
                            </Block>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }

    render() {
        let el = <div id="validation-errors">{ this.props.errors.length > 0 ? this.renderErrors() : ''}</div>

        return el;
    }
}
import React, { Component } from "react";
import {
    Section,
    Container,
    Columns,
    Level
} from "react-bulma-components";
import RefuelHeader from "../components/RefuelHeader";
import RefuelBanner from "../components/RefuelBanner";
import RefuelLogin from "../components/RefuelLogin";
import RefuelFooter from "../components/RefuelFooter";

export default class Home extends Component {
    constructor(props) {
       super(props);
       this.state = {
           users: 0,
           clothes: 0,
           orders: 0,
       };
    }

    render() {
        let body = [
            <RefuelHeader userAuthenticated={this.props.securityService.userAuthenticated}></RefuelHeader>,
            <RefuelBanner
                title="ReFuel ePantry"
                subtitle="Loving People Safely"
            ></RefuelBanner>,
        ];

        let section = [
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <Level>
                                <Level.Item
                                    textAlign="center"
                                >
                                    <div>
                                        <p class="heading">Users</p>
                                        <p class="title">{this.state.users}</p>
                                    </div>
                                </Level.Item>
                                <Level.Item
                                    textAlign="center"
                                >
                                    <div>
                                        <p class="heading">Items of Clothing</p>
                                        <p class="title">{this.state.clothes}</p>
                                    </div>
                                </Level.Item>
                                <Level.Item
                                    textAlign="center"
                                >
                                    <div>
                                        <p class="heading">Orders Fulfilled</p>
                                        <p class="title">{this.state.orders}</p>
                                    </div>
                                </Level.Item>
                            </Level>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        ];

        body.push(section);
        if (this.props.securityService.userAuthenticated === undefined) {
            body.push(<RefuelLogin {...this.props}></RefuelLogin>);
        } else {
            body.push(
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column>
                                <span>Welcome back!</span>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            );
        }

        body.push(<RefuelFooter></RefuelFooter>);

        return (<div>{body}</div>);
    }
}
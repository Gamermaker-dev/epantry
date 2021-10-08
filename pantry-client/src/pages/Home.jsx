import React, { Component } from "react";
import {
    Section,
    Container,
    Columns,
    Level
} from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelLogin from "../components/RefuelLogin";

export default class Home extends Component {
    constructor(props) {
       super(props);
       this.state = {
           users: 0,
           clothes: 0,
           orders: 0,
       };

       this.props.path[0].active = true;
    }

    render() {
        let body = [
            <RefuelBanner
                title="ReFuel ePantry"
                subtitle="Loving People Safely"
            ></RefuelBanner>,
            <RefuelBreadcrumbs path={this.props.path} />
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
        if (!this.props.userAuthenticated) {
            body.push(<RefuelLogin {...this.props}
                userLogin={this.props.login}
            ></RefuelLogin>);
        } else {
            body.push(
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column>
                                <span>Welcome back, {this.props.user ? this.props.user.first_name : ''} {this.props.user ? this.props.user.last_name : ''}!</span>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            );
        }

        return (<div>{body}</div>);
    }
}
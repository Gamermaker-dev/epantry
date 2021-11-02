import React, { Component } from "react";
import {
    Section,
    Container,
    Columns,
} from "react-bulma-components";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelLogin from "../components/RefuelLogin";
import RefuelVerseOfTheDay from "../components/RefuelVerseOfTheDay";

export default class Home extends Component {
    constructor(props) {
       super(props);

       this.props.path[0].active = true;
    }

    render() {
        let body = [
            <RefuelBanner
                title="ReFuel ePantry"
                subtitle="Loving People Safely"
            ></RefuelBanner>,
            <RefuelBreadcrumbs path={this.props.path} />,
            <RefuelVerseOfTheDay />,
        ];

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
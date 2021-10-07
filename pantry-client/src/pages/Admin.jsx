import React, { Component } from "react";
import { Section, Columns, Container, Tabs, Button, } from "react-bulma-components";
import { withRouter } from "react-router";
import RefuelBanner from "../components/RefuelBanner";
import RefuelModelList from "../components/RefuelModelList";

class AdminWithoutRouter extends Component {
    constructor(props) {
        super(props);
        this.renderTabs = this.renderTabs.bind(this);
        this.renderModelList = this.renderModelList.bind(this);
        this.state = {
            activeTab: 'color'
        }
    }

    renderTabs() {
        let tabs = [];

        tabs.push(<Tabs size="medium">
            <Tabs.Tab 
                href="#colors"
                active={this.state.activeTab === 'color'}
                onClick={() => { this.setState({ activeTab: 'color' })}}
            >
                Color
            </Tabs.Tab>
        </Tabs>);

        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            {tabs}
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }

    renderModelList(service) {
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <RefuelModelList modelService={service} />
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }

    render() {
        let service = {};
        let createUrl = '/pantry-admin';
        let bannerTitle = '';
        let bannerSubtitle = 'Create. Edit. Delete.';
        let buttonName = '';
        const activeTab = this.state.activeTab;
        

        switch (activeTab) {
            case 'color':
                service = this.props.colorService;
                createUrl += '/color/new';
                bannerTitle = 'Manage Colors';
                buttonName = 'Color';
                break;
            default:
                break;
        }

        return (
            <div>
                <RefuelBanner title={bannerTitle} subtitle={bannerSubtitle}></RefuelBanner>
                {this.renderTabs()}
                {this.renderModelList(service)}
                <Section>
                    <Container>
                        <Button color="refuel" renderAs="a" href={createUrl}>New {buttonName}</Button>
                    </Container>
                </Section>
            </div>
        );
    }
}

const Admin = withRouter(AdminWithoutRouter);
export default Admin;
import React, { Component } from "react";
import { Section, Columns, Container, Tabs, Button, } from "react-bulma-components";
import { withRouter } from "react-router";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";

import RefuelModelList from "../components/RefuelModelList";
import RefuelUserList from "../components/ModelLists/RefuelUserList";
import RefuelGroupList from "../components/ModelLists/RefuelGroupList";

class AdminWithoutRouter extends Component {
    constructor(props) {
        super(props);
        this.renderTabs = this.renderTabs.bind(this);
        this.renderModelList = this.renderModelList.bind(this);
        this.loadModels = this.loadModels.bind(this);
        this.changeTab = this.changeTab.bind(this);

        let tab = window.location.href.split('#').length === 2 ? window.location.href.split('#')[1] : 'category';

        this.state = {
            activeTab: tab,
            models: null,
        }

        switch (this.state.activeTab) {
            case 'category':
                this.modelService = this.props.categoryService;
                break;
            case 'color':
                this.modelService = this.props.colorService;
                break;
            case 'group':
                this.modelService = this.props.groupService;
                break;
            case 'user':
                this.modelService = this.props.userService;
                break;
            default:
                break;
        }
        this.props.path[1].active = true;

        // kick things off by loading the models        
        this.loadModels(this.state.activeTab);
    }

    loadModels(tab) {
        this.modelService.get()
            .then((models) => {
                this.setState(prevState => {
                    return {models: models, activeTab: tab};
                });
            })
            .catch((err) => {
                this.setState(prevState => {
                    return {models: null, activeTab: tab };
                });
            });
    }

    changeTab(tab, service) {
        this.modelService = service;
        this.loadModels(tab);
    }

    renderTabs() {
        let tabs = [];

        tabs.push(<Tabs size="medium">
            <Tabs.Tab 
                href="#category"
                active={this.state.activeTab === 'category'}
                onClick={() => this.changeTab('category', this.props.categoryService)}
            >
                Category
            </Tabs.Tab>
            <Tabs.Tab 
                href="#color"
                active={this.state.activeTab === 'color'}
                onClick={() => this.changeTab('color', this.props.colorService)}
            >
                Color
            </Tabs.Tab>
            <Tabs.Tab 
                href="#group"
                active={this.state.activeTab === 'group'}
                onClick={() => this.changeTab('group', this.props.groupService)}
            >
                Group
            </Tabs.Tab>
            <Tabs.Tab 
                href="#user"
                active={this.state.activeTab === 'user'}
                onClick={() => this.changeTab('user', this.props.userService)}
            >
                User
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

    renderModelList() {
        let modelList = <RefuelModelList modelService={this.state.modelService} models={this.state.models} loadModels={this.loadModels} />;

        if (this.state.activeTab === 'user') {
            modelList = <RefuelUserList modelService={this.state.modelService} models={this.state.models} loadModels={this.loadModels} />;
        } else if (this.state.activeTab === 'group') {
            modelList = <RefuelGroupList modelService={this.state.modelService} models={this.state.models} loadModels={this.loadModels} />;
        }
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            {modelList}
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }

    render() {
        let createUrl = '/pantry-admin';
        let bannerTitle = '';
        let bannerSubtitle = 'Create. Edit. Delete.';
        let buttonName = '';
        const activeTab = this.state.activeTab;
        

        switch (activeTab) {
            case 'category':
                createUrl += '/category/new';
                bannerTitle = 'Manage Categories';
                buttonName = 'Category';
                break;
            case 'color':
                createUrl += '/color/new';
                bannerTitle = 'Manage Colors';
                buttonName = 'Color';
                break;
            case 'group':
                createUrl += '/group/new';
                bannerTitle = 'Manage Groups';
                buttonName = 'Group';
                break;
            case 'user':
                createUrl += '/user/new';
                bannerTitle = 'Manage Users';
                buttonName = 'User';
                break;
            default:
                break;
        }

        return (
            <div>
                <RefuelBanner title={bannerTitle} subtitle={bannerSubtitle}></RefuelBanner>
                <RefuelBreadcrumbs path={this.props.path} />
                {this.renderTabs()}
                {this.renderModelList()}
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
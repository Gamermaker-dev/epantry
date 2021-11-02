import React, { Component } from "react";
import { Section, Columns, Container, Tabs, Button, } from "react-bulma-components";
import { withRouter } from "react-router";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";

import RefuelModelList from "../components/RefuelModelList";
import RefuelUserList from "../components/ModelLists/RefuelUserList";
import RefuelGroupList from "../components/ModelLists/RefuelGroupList";
import RefuelVerseList from "../components/ModelLists/RefuelVerseList";

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
            case 'condition':
                this.modelService = this.props.conditionService;
                break;
            case 'gender':
                this.modelService = this.props.genderService;
                break;
            case 'group':
                this.modelService = this.props.groupService;
                break;
            case 'school':
                this.modelService = this.props.schoolService;
                break;
            case 'size':
                this.modelService = this.props.sizeService;
                break;
            case 'user':
                this.modelService = this.props.userService;
                break;
            case 'verse':
                this.modelService = this.props.verseService;
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
                href="#condition"
                active={this.state.activeTab === 'condition'}
                onClick={() => this.changeTab('condition', this.props.conditionService)}
            >
                Condition
            </Tabs.Tab>
            <Tabs.Tab 
                href="#gender"
                active={this.state.activeTab === 'gender'}
                onClick={() => this.changeTab('gender', this.props.genderService)}
            >
                Gender
            </Tabs.Tab>
            <Tabs.Tab 
                href="#group"
                active={this.state.activeTab === 'group'}
                onClick={() => this.changeTab('group', this.props.groupService)}
            >
                Group
            </Tabs.Tab>
            <Tabs.Tab 
                href="#school"
                active={this.state.activeTab === 'school'}
                onClick={() => this.changeTab('school', this.props.schoolService)}
            >
                School
            </Tabs.Tab>
            <Tabs.Tab 
                href="#size"
                active={this.state.activeTab === 'size'}
                onClick={() => this.changeTab('size', this.props.sizeService)}
            >
                Size
            </Tabs.Tab>
            <Tabs.Tab 
                href="#user"
                active={this.state.activeTab === 'user'}
                onClick={() => this.changeTab('user', this.props.userService)}
            >
                User
            </Tabs.Tab>
            <Tabs.Tab 
                href="#verse"
                active={this.state.activeTab === 'verse'}
                onClick={() => this.changeTab('verse', this.props.verseService)}
            >
                Verse
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

    renderModelList(createUrl, buttonName) {
        let modelList = <RefuelModelList modelService={this.modelService} models={this.state.models} loadModels={this.loadModels} activeTab={this.state.activeTab} />;

        if (this.state.activeTab === 'user') {
            modelList = <RefuelUserList modelService={this.modelService} models={this.state.models} loadModels={this.loadModels} activeTab={this.state.activeTab} />;
        } else if (this.state.activeTab === 'group') {
            modelList = <RefuelGroupList modelService={this.modelService} models={this.state.models} loadModels={this.loadModels} activeTab={this.state.activeTab} />;
        } else if (this.state.activeTab === 'verse') {
            modelList = <RefuelVerseList modelService={this.modelService} models={this.state.models} loadModels={this.loadModels} activeTab={this.state.activeTab} />;
        }
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column size="one-third">
                            <Button color="refuel" renderAs="a" href={createUrl}>New {buttonName}</Button>
                        </Columns.Column>
                    </Columns>
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
            case 'condition':
                createUrl += '/condition/new';
                bannerTitle = 'Manage Conditions';
                buttonName = 'Condition';
                break;
            case 'gender':
                createUrl += '/gender/new';
                bannerTitle = 'Manage Genders';
                buttonName = 'Gender';
                break;
            case 'group':
                createUrl += '/group/new';
                bannerTitle = 'Manage Groups';
                buttonName = 'Group';
                break;
            case 'school':
                createUrl += '/school/new';
                bannerTitle = 'Manage Schools';
                buttonName = 'School';
                break;
            case 'size':
                createUrl += '/size/new';
                bannerTitle = 'Manage Sizes';
                buttonName = 'Size';
                break;
            case 'user':
                createUrl += '/user/new';
                bannerTitle = 'Manage Users';
                buttonName = 'User';
                break;
            case 'verse':
                createUrl += '/verse/new';
                bannerTitle = 'Manage Verses';
                buttonName = 'Verse';
                break;
            default:
                break;
        }

        return (
            <div>
                <RefuelBanner title={bannerTitle} subtitle={bannerSubtitle}></RefuelBanner>
                <RefuelBreadcrumbs path={this.props.path} />
                {this.renderTabs()}
                {this.renderModelList(createUrl, buttonName)}
            </div>
        );
    }
}

const Admin = withRouter(AdminWithoutRouter);
export default Admin;
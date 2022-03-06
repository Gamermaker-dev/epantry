import React, { Component } from "react";
import { Section, Container, Columns, } from "react-bulma-components";
import { withRouter } from "react-router";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";
import RefuelClothingCard from "../components/RefuelClothingCard";
import RefuelLoadBar from "../components/RefuelLoadBar";

class Pantry extends Component {
    constructor(props) {
        super(props);
        this.loadClothes = this.loadClothes.bind(this);
        this.renderCards = this.renderCards.bind(this);
        this.state = {
            loading: true,
            clothes: [],
        };

        this.loadClothes();
    }

    loadClothes() {
        this.props.clothesService.get()
            .then((clothes) => {
                this.setState({ loading: false, clothes: clothes});
            });
    }

    renderCards() {
        let el = [];

        this.state.clothes.map((c) => {
            el.push(
                <Columns.Column size="one-fifth">
                    <RefuelClothingCard clothing={c} />
                </Columns.Column>
            );
        });

        return el;
    }

    render() {
        return this.state.loading ? <RefuelLoadBar /> : (
            <div>
                <RefuelBanner title="Pantry" subtitle="Everything Is Free" />
                <RefuelBreadcrumbs location={this.props.router.location} />
                <Section>
                    <Container>
                        <Columns multiline={true}>
                            {this.renderCards()}
                        </Columns>
                    </Container>
                </Section>  
            </div>
        );
    }
}

export default Pantry = withRouter(Pantry);
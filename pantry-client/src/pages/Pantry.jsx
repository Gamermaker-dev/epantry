import React, { Component } from "react";
import { Section, Container, Columns, } from "react-bulma-components";
import RefuelClothingCard from "../components/RefuelClothingCard";
import RefuelLoadBar from "../components/RefuelLoadBar";

export default class Pantry extends Component {
    constructor(props) {
        super(props);
        this.loadClothes = this.loadClothes.bind(this);
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

    render() {
        return this.state.loading ? <RefuelLoadBar /> : (
            <Section>
                <Container>
                    <Columns multiline={true}>
                        {this.state.clothes.map((c, i) => {
                            <Columns.Column size="one-fifth">
                                <RefuelClothingCard clothing={c} />
                            </Columns.Column>
                        })}
                    </Columns>
                </Container>
            </Section>  
        );
    }
}
import React, { Component } from "react";
import { Button, Card, Media, Image, Heading, Content, } from "react-bulma-components";

export default class RefuelClothingCard extends Component {
    constructor(props) {
        super(props);
        this.renderFooter = this.renderFooter.bind(this);

        this.state = {
            id: this.props.clothing.id,
            image: this.props.clothing.image,
            brand: this.props.clothing.brand,
            gender: this.props.clothing.gender_details ? this.props.clothing.gender_details.name : '',
            size: this.props.clothing.size_details ? this.props.clothing.size_details.name : '',
            color: this.props.clothing.color_details ? this.props.clothing.color_details.name : '',
            description: this.props.clothing.description,
            price: this.props.clothing.price,
            hasUser: this.props.clothing.user ? true : false,
        };
    }



    addToCart(id) {
        this.props.clothesService.addToCart(id)
            .then((clothing) => {
                this.setState({ hasUser: true });
            })
    }

    renderFooter() {
        if (this.props.hasUser) {
            return (
                <Button
                    color="refuel-grey"
                    disabled={true}
                >Unavailable</Button>
            );
        } else {
            return (
                <Button 
                    color="refuel"
                    onClick={ (e) => {
                        e.preventDefault();
                        this.props.addToCart(this.state.id);
                    }}
                >{this.state.price} RFP</Button>
            );
        }
    }


    render() {
        return (
            <Card style={{ width: 300, margin: 'auto' }}>
                <Card.Image
                    size="4by3"
                    src={this.state.image}
                />
                <Card.Content>
                    <Media>
                        <Media.Item>
                            <p class="title is-4">{ this.state.brand }</p>
                            <p class="subtitle is-6">{ this.state.gender } - { this.state.size } - { this.state.color }</p>
                        </Media.Item>
                    </Media>
                    <Content>
                        { this.state.description }
                    </Content>
                    <Card.Footer>
                        <Card.Footer.Item>
                            {this.renderFooter()}
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card.Content>
            </Card>
        );
    }
}
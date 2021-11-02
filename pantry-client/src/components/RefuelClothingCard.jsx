import React, { Component } from "react";
import { Button, Card, Media, Image, Heading, Content, } from "react-bulma-components";

export default class RefuelClothingCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ width: 300, margin: 'auto' }}>
                <Card.Image
                    size="4by3"
                    src={this.props.clothing.image}
                />
                <Card.Content>
                    <Media>
                        <Media.Content>
                            <p class="title is-4">{ this.props.clothing.brand }</p>
                            <p class="subtitle is-6">{ this.props.clothing.gender } - { this.props.clothing.size.name } - { this.props.clothing.color }</p>
                        </Media.Content>
                    </Media>
                    <Content>
                        { this.props.clothing.description }
                    </Content>
                    <Card.Footer>
                        <Card.Footer.Item>
                            <Button 
                                onClick={ (e) => {
                                    e.preventDefault();
                                    this.props.addToCart(this.props.clothing.id);
                                }}
                            >Add to Cart</Button>
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card.Content>
            </Card>
        );
    }
}
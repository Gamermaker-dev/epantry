import React, { Component } from "react";
import {
    Section,
    Container,
    Columns
} from "react-bulma-components";
import RefuelHeader from "../components/RefuelHeader";
import RefuelBanner from "../components/RefuelBanner";
import RefuelBreadcrumbs from "../components/RefuelBreadcrumbs";

export default class About extends Component {
    constructor(props) {
       super(props);
    }

    render() {
        return (
            <div>
                <RefuelBanner
                    title="About ePantry"
                >
                </RefuelBanner>
                <RefuelBreadcrumbs location={this.props.router.location} />
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column
                                size="half"
                                offset="one-quarter"
                            >
                                <p> ReFuel ePantry is a chance to bring the help a clothing pantry provides to a wider audience in the safest way possible.<hr/> 
                                </p>
                            </Columns.Column>
                        </Columns>
                        <Columns>
                            <Columns.Column
                                size="3"
                            >
                                <p><strong>How does it work?</strong><br/> 
                                    
                                    Simple! Much like the average online retailer, you can place items in your cart and "reserve" the clothes.
                                    Placing an item in your cart "reserves" the item, but don't wait too long!
                                    To be fair to everyone and ensure anyone who needs the resource can use it, there will be a time limit to "order" the clothes.
                                </p>           
                            </Columns.Column>
                            <Columns.Column
                                size="3"
                            >
                                <p>
                                    <strong> What is Refuel?</strong><br/> 
                                    Refuel is the youth group of Lewis Mermorial Babtist Chruch where grades 6-12 can come and hangout and learn about Jesus
                                </p>
                            </Columns.Column>
                            <Columns.Column
                                size="6"
                            >
                                <p><strong>How does ordering work?</strong><br/>
                                    Once you login into your account you will be able to order clothes. 
                                    You will given a monthly "allowance" on how many items you can order.
                                    Once the amount is up, you must wait til next month to order more items.
                                    After ordering, please get in touch with your school's guidance counselour to pick up the clothes.
                                </p>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        );
    }
}
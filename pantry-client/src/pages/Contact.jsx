import React, { Component } from "react";
import {
    Section,
    Container,
    Columns
} from "react-bulma-components";
import RefuelHeader from "../components/RefuelHeader";
import RefuelBanner from "../components/RefuelBanner";

export default class Contact extends Component {
    constructor(props) {
       super(props);
    }

    render() {
        return (
            <div>
                <RefuelBanner
                    title="Contact Us"
                >
                </RefuelBanner>
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column
                                size="half"
                                offset="one-quarter"
                            >
                                <p>
                                    <strong>Here is where you can contact us!</strong>
                                    
                                    <br/>Matt McClay - (304) 208-4543

                                    <br/>Matt McClay - m.mcclay@lmbc.org
                            
                                    <br/>Lewis Memorial Baptist Church - (304) 736-7676
                                
                                    <br/>Teen Hotline - (304) 208-8044

                                    <br/>Lewis Memorial Baptist Church <a class="is-primary" href="https://lmbc.org/">@RefuelStudents</a>
                            
                                    <br/>YouTube <a class="is-primary" href="https://www.youtube.com/channel/UCl3aOoPR3TvtjSW1WR29kPA">@RefuelStudents</a>

                                    <br/>Instagram <a class="is-primary" href="https://www.instagram.com/refuelstudents/">@RefuelStudents</a>

                                    <br/>Facebook <a class="is-primary" href="https://www.facebook.com/refuelwv/?hc_ref=ARRBzvmwYLUp0t97mXS5VxJn9fUFSzJrImOWW_8uzd4p8KUFzxihDGB-E48DfMFCHkA&ref=nf_target&__tn__=kC-R">@RefuelStudents</a>
                                    
                                    <br/>Twitter <a class="is-primary" href="https://twitter.com/refuelstudents?lang=en">@RefuelStudents</a>
                                </p> 
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        );
    }
}
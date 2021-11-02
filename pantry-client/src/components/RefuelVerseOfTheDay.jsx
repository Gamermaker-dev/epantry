import React, { Component } from "react";
import axios from "axios";
import {
    Section,
    Container,
    Columns,
    Message,
} from "react-bulma-components";

// based on tutorial here: https://docs.api.bible/tutorials/verse-of-the-day
export default class RefuelVerseOfTheDay extends Component {
    constructor(props) {
        super(props);
        this.getVerseOfTheDay = this.getVerseOfTheDay.bind(this);
        this.state = {
            verse: '',
            verseRef: '',
        };

        this.VERSES = [
        `JER.29.11`,
        `PSA.23`,
        `1COR.4.4-8`,
        `PHP.4.13`,
        `JHN.3.16`,
        `ROM.8.28`,
        `ISA.41.10`,
        `PSA.46.1`,
        `GAL.5.22-23`,
        `HEB.11.1`,
        `2TI.1.7`,
        `1COR.10.13`,
        `PRO.22.6`,
        `ISA.40.31`,
        `JOS.1.9`,
        `HEB.12.2`,
        `MAT.11.28`,
        `ROM.10.9-10`,
        `PHP.2.3-4`,
        `MAT.5.43-44`,
        ];

        this.verseIndex = Math.floor(Math.random() * this.VERSES.length);
        this.verseID = this.VERSES[this.verseIndex];

        this.getVerseOfTheDay().then((data) => {
            this.setState({ verseRef: data.verse, verse: data.passage });
        });
    }

    getVerseOfTheDay() {
        return axios.get(`/verseoftheday/`)
            .then((res) => {
                return res.data;
            });
/*        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
      
          xhr.addEventListener(`readystatechange`, function () {
            if (this.readyState === this.DONE) {
              const { data, meta } = JSON.parse(this.responseText);
      
              resolve(data);
            }
          });
      
          xhr.open(
            `GET`,
            `https://api.scripture.api.bible/v1/bibles/${this.BIBLE_ID}/search?query=${verseID}`
          );
          xhr.setRequestHeader(`api-key`, this.API_KEY);
      
          xhr.onerror = () => reject(xhr.statusText);
      
          xhr.send();
        });*/
      }



    render() {
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <Message size="medium" color="refuel">
                                <Message.Header>
                                    <span><i>{this.state.verseRef}</i></span>
                                </Message.Header>
                                <Message.Body>
                                    <p>{this.state.verse}</p>
                                </Message.Body>
                            </Message>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        )
    }
}


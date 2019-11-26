import {
  Header,
  Icon,
  Container,
  Card,
  Accordion,
  Segment
} from "semantic-ui-react";
import React, { Component } from "react";
import Conversion from "./conversion";
import Rates from "./rates";
import moment from "moment";

class Home extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    console.log("Cookies: ", this.props);
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Container text>
        <Header as="h2" icon textAlign="center">
          <Icon circular color="violet" inverted name="currency" />
          Currency Converter
          <Header.Subheader>Know your current rates</Header.Subheader>
        </Header>
        <Segment.Group>
          <Segment>
            <Accordion fluid styled>
              <Accordion.Title
                active={false}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Convert Currency
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Conversion />
              </Accordion.Content>
            </Accordion>
          </Segment>
          <Segment>
            <Card fluid color="blue">
              <Card.Content>
                <Card.Header>
                  Currency Rates as of{" "}
                  {moment().format("MMMM Do YYYY, h:mm:ss a")}
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Rates />
              </Card.Content>
            </Card>
          </Segment>
        </Segment.Group>
        <style jsx>{``}</style>
      </Container>
    );
  }
}

export default Home;

import {
  Header,
  Icon,
  Container,
  Card,
  Accordion,
  Segment,
  Label
} from "semantic-ui-react";
import React, { Component } from "react";
import Conversion from "./conversion";
import Rates from "./rates";
import moment from "moment";

class Home extends Component {
  state = { activeIndex: -1 };

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
      <div className="main">
        <Container text className="main">
          <Header as="h2" icon textAlign="center">
            <Icon circular color="violet" inverted name="currency" />
            Currency Converter
            <Header.Subheader>Know your current rates</Header.Subheader>
          </Header>
          <Segment.Group>
            <Segment>
              <Card fluid color="violet">
                <Card.Content>
                  <Card.Header>
                    <Icon name="dropdown" size="small" />
                    <Label
                      size="large"
                      pointing="left"
                      color="violet"
                      content="Convert Currency"
                    />
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Conversion />
                </Card.Content>
              </Card>
            </Segment>
            <Segment>
              <Accordion fluid>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" />
                  <Label
                    size="large"
                    pointing="left"
                    color="violet"
                    content={
                      "Currency Rates as of " +
                      moment().format("MMMM Do YYYY, h:mm:ss a")
                    }
                  />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <Rates />
                </Accordion.Content>
              </Accordion>
            </Segment>
          </Segment.Group>
        </Container>
        <style jsx>{`
          .main {
            padding: 7em;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;

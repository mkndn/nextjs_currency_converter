import {
  Container,
  Card,
  Form,
  Icon,
  Grid,
  Select,
  Input,
  Segment,
  Button,
  Table,
  Popup,
  Label
} from "semantic-ui-react";
import { allCodes, conversionConfig } from "../actions/rates";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { IntlProvider, FormattedNumber } from "react-intl";

export class Conversion extends Component {
  static propTypes = {
    configs: PropTypes.array.isRequired,
    codes: PropTypes.array.isRequired,
    allCodes: PropTypes.func.isRequired,
    conversionConfig: PropTypes.func.isRequired
  };

  state = {
    fromLanguageOptions: [],
    toLanguageOptions: [],
    fromCode: "USD",
    toCode: "EUR",
    fromCodeValue: 1,
    toCodeValue: 0.0,
    formattedCodeValue: null,
    rateConfig: {},
    inverseRateConfig: {}
  };

  componentDidUpdate(props) {
    if (this.props !== props) {
      if (
        this.props.configs &&
        this.props.configs.length > 0 &&
        this.props.codes &&
        this.props.codes.length > 0
      )
        this.initConvertOptions();
    }
  }

  componentDidMount() {
    this.props.allCodes();
    const param = this.state.fromCode + "," + this.state.toCode;
    this.props.conversionConfig(param);
  }

  initConvertOptions() {
    this.state.fromLanguageOptions = [];
    this.state.toLanguageOptions = [];

    this.props.codes.map((code, index) => {
      if (code !== this.state.toCode) {
        this.state.fromLanguageOptions.push({
          key: code,
          value: code,
          text: code
        });
      }
    });

    this.props.codes.map((code, index) => {
      if (code !== this.state.fromCode) {
        this.state.toLanguageOptions.push({
          key: code,
          value: code,
          text: code
        });
      }
    });

    this.props.configs.map(config => {
      if (config.base == this.state.fromCode) {
        config.rates.rateList.map(rate => {
          this.state.rateConfig.toCode = rate.currencyCode;
          this.state.rateConfig.toValue = rate.currencyValue;
        });
      }
    });

    this.props.configs.map(config => {
      if (config.base == this.state.toCode) {
        config.rates.rateList.map(rate => {
          this.state.inverseRateConfig.toCode = rate.currencyCode;
          this.state.inverseRateConfig.toValue = rate.currencyValue;
        });
      }
    });

    this.state.toCodeValue = parseFloat(
      this.state.fromCodeValue * this.state.rateConfig.toValue
    ).toFixed(3);

    this.setState(this.state);
  }

  calculateToValue = (e, data) => {
    const toValue = parseFloat(
      data.value * this.state.rateConfig.toValue
    ).toFixed(3);
    this.setState({ fromCodeValue: data.value, toCodeValue: toValue });
  };

  calculateFromValue = (e, data) => {
    const fromValue = parseFloat(
      data.value * this.state.inverseRateConfig.toValue
    ).toFixed(3);
    this.setState({ fromCodeValue: fromValue, toCodeValue: data.value });
  };

  onFirstChange = (event, data) => {
    event.preventDefault();
    if (this.state.fromCode !== data.value) {
      this.state.fromCode = data.value;
      this.triggerRatesRefresh();
    }
  };

  onSecondChange = (event, data) => {
    event.preventDefault();
    if (this.state.toCode !== data.value) {
      this.state.toCode = data.value;
      this.triggerRatesRefresh();
    }
  };

  triggerRatesRefresh = () => {
    const param = this.state.fromCode + "," + this.state.toCode;
    this.props.conversionConfig(param);
    this.initConvertOptions();
  };

  swapCodes = () => {
    const tmpFromCode = this.state.fromCode;
    const tmpToCode = this.state.toCode;

    this.state.fromCode = tmpToCode;
    this.state.toCode = tmpFromCode;

    this.initConvertOptions();
  };

  render() {
    const {
      fromCode,
      toCode,
      fromCodeValue,
      toCodeValue,
      fromLanguageOptions,
      toLanguageOptions
    } = this.state;

    return (
      <Table basic="very" size="large">
        <Table.Body>
          <Table.Row>
            <Table.Cell width={5}>
              <Input
                fluid
                label={
                  <Label basic color="violet">
                    <IntlProvider locale="en">
                      <FormattedNumber
                        value={fromCodeValue}
                        style="currency"
                        currency={fromCode}
                      />
                    </IntlProvider>
                  </Label>
                }
                labelPosition="right"
                value={fromCodeValue}
                onChange={this.calculateToValue}
              />
            </Table.Cell>
            <Table.Cell>
              <Select
                fluid
                options={fromLanguageOptions}
                onChange={this.onFirstChange}
                value={fromCode}
              />
            </Table.Cell>
            <Table.Cell rowSpan="2" verticalAlign="middle">
              <Popup
                trigger={
                  <Button circular onClick={this.swapCodes} icon color="violet">
                    <Icon rotated="clockwise" name="exchange" />
                  </Button>
                }
                content="Swap Currencies"
                position="right center"
                inverted
              ></Popup>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={5}>
              <Input
                fluid
                label={
                  <Label basic size="small" color="violet">
                    <IntlProvider locale="en">
                      <FormattedNumber
                        value={toCodeValue}
                        style="currency"
                        currency={toCode}
                      />
                    </IntlProvider>
                  </Label>
                }
                labelPosition="right"
                value={toCodeValue}
                onChange={this.calculateFromValue}
              />
            </Table.Cell>
            <Table.Cell>
              <Select
                fluid
                value={toCode}
                options={toLanguageOptions}
                onChange={this.onSecondChange}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  configs: state.conversion.configs,
  codes: state.codes.codes
});

export default connect(mapStateToProps, {
  allCodes,
  conversionConfig
})(Conversion);

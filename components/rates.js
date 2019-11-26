import {
    Header,
    Icon,
    Container,
    Card,
    Accordion,
    Segment,
    Table,
    Dropdown
} from "semantic-ui-react";
import { latestRates, allCodes, latestRatesByBase } from "../actions/rates";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class Rates extends Component {

    static propTypes = {
        currentRate: PropTypes.object.isRequired,
        codes: PropTypes.array.isRequired,
        latestRates: PropTypes.func.isRequired,
        allCodes: PropTypes.func.isRequired,
        latestRatesByBase: PropTypes.func.isRequired
    };

    state = {
        languageOptions: []
    }

    componentDidMount() {
        this.props.latestRates();
        this.props.allCodes();
        this.syncLanguageOptions();
    }

    componentDidUpdate(props) {
        if (this.props.currentRate !== props.currentRate) {
            this.syncLanguageOptions();
        }
    }

    syncLanguageOptions() {
        this.state.languageOptions = [];

        if (this.props.currentRate && this.props.codes) {
            this.props.codes.map((code, index) => {
                if (code !== this.props.currentRate.base) {
                    this.state.languageOptions.push({ key: code, value: code, text: code })
                }
            })
        }
    }

    getRatesByBase = (event, data) => {
        this.props.latestRatesByBase(data.value);
    }

    render() {

        return (
            <Container>
                <Dropdown
                    button
                    className='icon'
                    floating
                    labeled
                    icon='currency'
                    options={this.state.languageOptions}
                    search
                    text={this.props.currentRate.base}
                    onChange={this.getRatesByBase}
                />
                <Table collapsing color="blue" key="blue">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Currency Code</Table.HeaderCell>
                            <Table.HeaderCell>Currency Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.currentRate && this.props.currentRate.rates ? this.props.currentRate.rates.rateList.map((rate, index) =>
                            < Table.Row key={index}>
                                <Table.Cell>{rate.currencyCode}</Table.Cell>
                                <Table.Cell>{rate.currencyValue}</Table.Cell>
                            </Table.Row>
                        ) : < Table.Row>
                                <Table.Cell>Loading...</Table.Cell>
                            </Table.Row>}
                    </Table.Body>
                </Table>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentRate: state.rates.currentRate,
        codes: state.codes.codes
    }
};

export default connect(mapStateToProps, { latestRates, allCodes, latestRatesByBase })(Rates)
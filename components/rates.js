import {
    Header,
    Icon,
    Container,
    Card,
    Accordion,
    Segment,
    Table,
    Dropdown,
    Dimmer,
    Loader,
    Pagination
} from "semantic-ui-react";
import { latestRates, allCodes, latestRatesByBase } from "../actions/rates";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import sortBy from 'lodash/sortBy'

export class Rates extends Component {

    static propTypes = {
        currentRate: PropTypes.object.isRequired,
        codes: PropTypes.array.isRequired,
        latestRates: PropTypes.func.isRequired,
        allCodes: PropTypes.func.isRequired,
        latestRatesByBase: PropTypes.func.isRequired
    };

    state = {
        languageOptions: [],
        paginationProps: {
            page: 2,
            boundaryRange: 1,
            defaultActivePage: 1,
            siblingRange: 1,
            totalPages: 10,
            itemsPerPage: 10,
            items: []
        }
    }

    componentDidMount = () => {
        this.props.latestRates();
        this.props.allCodes();
        this.syncLanguageOptions();
        this.initPaginationProps();
    }

    componentDidUpdate(props) {
        if (this.props.currentRate !== props.currentRate) {
            this.syncLanguageOptions();
            this.initPaginationProps();
        }
    }

    syncLanguageOptions = () => {
        this.state.languageOptions = [];

        if (this.props.currentRate && this.props.codes) {
            this.props.codes.map((code, index) => {
                if (code !== this.props.currentRate.base) {
                    this.state.languageOptions.push({ key: code, value: code, text: code })
                }
            })
        }
    }

    initPaginationProps = () => {
        const { paginationProps } = this.state;
        const { currentRate } = this.props;

        paginationProps.items = [];

        if (currentRate && currentRate.rates) {
            paginationProps.items = currentRate.rates.rateList.slice();
            const pageCount = currentRate.rates.rateList.length / paginationProps.itemsPerPage;
            paginationProps.totalPages = (parseInt(pageCount) < pageCount) ?
                parseInt(pageCount) + 1 : parseInt(pageCount)
            paginationProps.items = paginationProps.items.slice(
                (paginationProps.page - 1) * paginationProps.itemsPerPage,
                (paginationProps.page - 1) * paginationProps.itemsPerPage + paginationProps.itemsPerPage
            );

            sortBy(paginationProps.items, 'currencyCode')

            //this.setState(paginationProps, paginationProps);
        }
    }

    getRatesByBase = (event, data) => {
        this.props.latestRatesByBase(data.value);
    }

    handlePagination = (event, data) => {
        this.setState({ page: data.activePage });
    }

    render() {

        const { boundaryRange, defaultActivePage, siblingRange, totalPages, items } = this.state.paginationProps
        return (
            <Container text>
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
                <Table celled collapsing color="blue" key="blue">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Currency Code</Table.HeaderCell>
                            <Table.HeaderCell>Currency Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {items ? items.map((rate, index) =>
                            < Table.Row key={index}>
                                <Table.Cell>{rate.currencyCode}</Table.Cell>
                                <Table.Cell>{rate.currencyValue}</Table.Cell>
                            </Table.Row>
                        ) : < Table.Row>
                                <Table.Cell><Dimmer active inverted>
                                    <Loader inverted>Loading</Loader>
                                </Dimmer></Table.Cell>
                            </Table.Row>}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <Pagination
                                    boundaryRange={boundaryRange}
                                    defaultActivePage={defaultActivePage}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={siblingRange}
                                    totalPages={totalPages}
                                    onPageChange={this.handlePagination}
                                />
                            </Table.HeaderCell>
                        </Table.Row></Table.Footer>
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
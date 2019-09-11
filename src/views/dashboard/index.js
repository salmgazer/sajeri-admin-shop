// in src/Dashboard.js
import React, { Component, Fragment } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { Responsive } from 'react-admin';
import Profit from './profit';
import Invoices from './invoices';
import Products from './products';
import feathersClient from '../../feathersClient';
const _ = require('underscore');

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalProfit: 0,
            invoices: [],
            sales: [],
            customers: [],
            products: [],
            productSales: {},
            productSalesCounts: [],
            totalSales: 0,
            totalCostPrice: 0,
            fromDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            toDate: new Date(),
        };

        this.onChangeFromDate = this.onChangeFromDate.bind(this);
        this.onChangeToDate = this.onChangeToDate.bind(this);
        this.refresh = this.refresh.bind(this);
      }

    async componentDidMount() {
        await this.refresh();
    }

    async refresh() {
        const { fromDate, toDate, totalSales, totalCostPrice } = this.state;
        const productIds = [];
        let sales = await feathersClient.service('sales')
            .find({query: {
                type: 'sale',
                createdAt: {
                    $lte: toDate,
                    $gte: fromDate
                },
                $sort: {
                    createdAt: -1
                }
            }});
        sales = sales.data;
        this.setState({ sales });
        sales.forEach((sale) => {
            this.setState({ totalSales: this.state.totalSales + sale.totalSellingPrice });
            this.setState({ totalCostPrice: this.state.totalCostPrice + sale.totalCostPrice });
            sale.products.forEach(product => {
                productIds.push(product.products.id);
            });
            this.setState({ totalProfit: this.state.totalProfit + sale.profit});
        })
        let invoices = await feathersClient.service('sales')
            .find({query: {
                type: 'invoice',
                createdAt: {
                    $lte: toDate
                },
                createdAt: {
                    $gte: fromDate
                },
                $sort: {
                    createdAt: -1
                }
            }});
        this.setState({ invoices: invoices.data });
        /*
        invoices.data.forEach(invoice => {
            invoice.products.forEach(product => {
                productIds.push(product.products.id);
            });
        }); */



        const productSales = {};
        productIds.forEach(productId => {
            if (productSales[productId]) {
                productSales[productId] += 1;
            } else {
                productSales[productId] = 1;
            }
        });

        const productSalesCounts = [];
        Object.keys(productSales).forEach(key => {
            productSalesCounts.push(productSales[key]);
        });
        productSalesCounts.sort(function(a, b){return b - a});
        console.log(productSalesCounts);
        this.setState({ productSales });
        const products = await feathersClient.service('products').find({ query: { id: {$in: _.uniq(productIds) }}});
        this.setState({ products: products.data });

        let customerIds = sales.map(sale => sale.customerId);
        customerIds = Object.assign(customerIds, invoices.data.map(invoice => invoice.customerId));

        let customers = await feathersClient.service('customers').find({ query: { id: {$in : customerIds} }});
        this.setState({ customers: customers.data });
    }


    onChangeFromDate(date) {
        this.setState({
            fromDate: date
        });
    }

    onChangeToDate(date) {
        this.setState({
            toDate: date
        });
    }

    render() {
        const {
            totalProfit,
            invoices,
            sales,
            customers,
            fromDate,
            products,
            productSales,
            productSalesCounts,
            totalCostPrice,
            totalSales,
            toDate,
        } = this.state;

        return (
            <Fragment>
                <Responsive
                    xsmall={
                        <div>
                            <div style={styles.flexColumn}>
                                <div style={{ marginBottom: '2em' }}>
                                </div>
                                <div style={styles.flex}>
                                    <Profit value={totalProfit} />
                                </div>
                                <div style={styles.singleCol}>
                                </div>
                            </div>
                        </div>
                    }
                    small={
                        <div style={styles.flexColumn}>
                            <div style={styles.singleCol}>
                            </div>
                            <div style={styles.flex}>
                                <Profit value={totalProfit} />
                            </div>
                            <div style={styles.singleCol}>
                            </div>
                        </div>
                    }
                    medium={
                        <div>
                            <div style={styles.flex}>
                                <div style={{ marginBottom: 20 }}>
                                    From:&nbsp;&nbsp;
                                    <DatePicker
                                        onChange={this.onChangeFromDate}
                                        selected={fromDate}
                                    />
                                </div>
                                <div style={{ marginBottom: 20, marginLeft: 100 }}>
                                    To:&nbsp;&nbsp;
                                    <DatePicker
                                        style={{ height: '100px' }}
                                        onChange={this.onChangeToDate}
                                        selected={toDate}
                                        className="date-input"
                                    />
                                </div>
                                <button
                                    onClick={this.refresh}
                                    style={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        height: '20px',
                                        marginLeft: '30px',
                                        borderRadius: '5px'
                                    }}>
                                    Submit
                                </button>
                            </div>
                            <div style={styles.flex}>
                                <div style={styles.leftCol}>
                                    <div style={styles.flex}>
                                        <Profit value={totalProfit} bgColor="limegreen" title="Profit" />
                                    </div>
                                    <div style={styles.flex}>
                                        <Profit value={totalSales} title="Total Sales" />
                                    </div>
                                    <div style={styles.flex}>
                                        <Profit value={totalCostPrice} bgColor="red" title="Total Cost Price" />
                                    </div>
                                    <div style={styles.flex}>
                                        <Products
                                            title='Products'
                                            products={products}
                                            productSales={productSales}
                                            productSalesCounts={productSalesCounts}
                                        />
                                    </div>
                                    <div style={styles.singleCol}>
                                    </div>
                                    <div style={styles.singleCol}>
                                    </div>
                                </div>
                                <div style={styles.rightCol}>
                                    <div style={styles.flex}>
                                        <Invoices
                                            title='Invoices'
                                            invoices={invoices}
                                            customers={customers}
                                        />
                                    </div>
                                    <div style={styles.flex}>
                                        <Invoices
                                            title='Sales'
                                            invoices={sales}
                                            customers={customers}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={styles.flex}>
                                <div style={styles.leftCol}>
                                </div>
                                <div style={styles.rightCol}>
                                </div>
                            </div>
                        </div>
                    }
                />
            </Fragment>
        );
    }

}


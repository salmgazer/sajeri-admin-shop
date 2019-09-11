import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import compare from '../../functions/compare';

const style = theme => ({
    root: {
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
});

const products = ({ products, productSales, productSalesCounts, classes, title }) => (
    <Card className={classes.root}>
        <CardHeader title={title} />
        <List dense={true}>
          <ListItem>
            <ListItemText
            primary={"Name"}
            />
            <ListItemSecondaryAction>
              <span
                className={classes.cost}>
                Number sold
              </span>
            </ListItemSecondaryAction>
          </ListItem>
            {products.length > 0 ? products.map(product => {
                const productSale = productSales[product.id];
                product.timesSold = productSale;
                return product;
            }).sort(compare).map(aProduct => {
                return (
                    <ListItem
                        alignItems="flex-start"
                        key={aProduct.id}
                        button
                        component={Link}
                        to={`/products/${aProduct.id}`}
                        >
                        <ListItemText
                        primary={aProduct.name}
                        secondary={""}
                        />
                        <ListItemSecondaryAction>
                            <span
                                style={{
                                    padding: '10px',
                                }}
                                className={classes.cost}>{aProduct.timesSold || 0}</span>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }) : ''}
        </List>
    </Card>
);

const enhance = compose(
    withStyles(style)
);

export default enhance(products);
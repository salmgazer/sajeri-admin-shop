import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { colors } from '@material-ui/core';

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

const Invoices = ({ invoices = [], customers = [], classes, title }) => (
    <Card className={classes.root} style={{ marginBottom: '10px' }}>
        <CardHeader title={title} />
        <List dense={true}>
            {invoices.map(record => {
                const customer = customers.find(customer => customer.id === record.customerId);
                return (
                    <ListItem
                        alignItems="flex-start"
                        key={record.id}
                        button
                        component={Link}
                        to={`/sales/${record.id}`}
                        >
                        <ListItemText
                        primary={new Date(record.createdAt).toLocaleString('en-GB')}
                        secondary={
                            <React.Fragment>
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                { customer? `${customer.firstName} ${customer.lastName} - ${customer.phone}` : ''}
                                </Typography>
                            </React.Fragment>
                        }
                        />
                        <ListItemSecondaryAction>
                            <span
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}
                                className={classes.cost}>
                                    GH¢ {record.totalCostPrice.toLocaleString()}
                            </span>
                            <span
                                style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}
                                className={classes.cost}>
                                    GH¢ {record.totalSellingPrice.toLocaleString()}
                                </span>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
    </Card>
);

const enhance = compose(
    withStyles(style)
);

export default enhance(Invoices);
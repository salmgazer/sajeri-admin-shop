import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        float: 'left',
        // margin: '-20px 20px 0 15px',
        zIndex: 100,
        borderRadius: 3,
    },
    icon: {
        float: 'right',
        width: 54,
        height: 52,
        padding: 12,
        color: '#fff',
    },
};

const CardIcon = ({ Icon, classes, bgColor }) => (
    <Card className={classes.card} style={{ backgroundColor: bgColor }}>
        <h2 style={{ color: "white", padding: "10px" }}>GHS</h2>
    </Card>
);

export default withStyles(styles)(CardIcon);
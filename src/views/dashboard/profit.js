import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        // marginRight: '1em',
        //marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const Profit = ({ value, classes, title, bgColor="#31708f" }) => (
    <div className={classes.main} style={{ marginBottom: '10px' }}>
        <CardIcon Icon="GHS" bgColor={bgColor} />
        <Card className={classes.card}>
            <Typography className={classes.title} component="h1" variant="headline" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="headline" component="h1">
                {value.toLocaleString()}
            </Typography>
        </Card>
    </div>
);

export default translate(withStyles(styles)(Profit));
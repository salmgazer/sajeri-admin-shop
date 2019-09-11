import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';

import { translate } from 'react-admin';

const styles = {
    media: {
        height: '18em',
    },
};

const mediaUrl = `https://marmelab.com/posters/beard-${parseInt(
    Math.random() * 10,
    10
) + 1}.jpeg`;

const welcome = ({ classes, translate }) => (
    <Card>
        <CardMedia image={mediaUrl} className={classes.media} />
        <CardContent>
            <Typography variant="headline" component="h2">
                Sajeri Point of Sale
            </Typography>
            <Typography component="p">
                Sajeri admin
            </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button href="../">
                <HomeIcon style={{ paddingRight: '0.5em' }} />
                Home
            </Button>
            <Button href="../sales">
                <CodeIcon style={{ paddingRight: '0.5em' }} />
                Sales
            </Button>
        </CardActions>
    </Card>
);

export default withStyles(styles)(translate(welcome));
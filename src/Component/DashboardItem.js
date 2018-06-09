import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class DashboardItem extends Component {
    render() {
        return (
            <Grid id="content" item xs={3}>
                <Card>
                    <CardContent>
                        <Typography type="title" align="center">{this.props.title}</Typography>
                        <Typography variant="headline" align="center" component="h2">{this.props.metric}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default DashboardItem;
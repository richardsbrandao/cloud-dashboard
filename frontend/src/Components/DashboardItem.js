import React, { Component } from 'react'

import { 
    CardActions, Button, CardContent, Card, Grid, Typography 
} from '@material-ui/core';

class DashboardItem extends Component {
    render() {
        return (
            <Grid id="content" item xs={3}>
                <Card>
                    <CardContent>
                        <Typography type="title" align="center">{this.props.title}</Typography>
                        <Typography variant="headline" align="center" component="h2">{this.props.running + this.props.stopped}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary">
                            Running {this.props.running}
                        </Button>
                        <Button variant="contained" color="secondary">
                            Stopped {this.props.stopped}
                         </Button> 
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default DashboardItem;
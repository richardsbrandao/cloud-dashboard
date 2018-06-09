import React, { Component } from 'react';

import DashboardItem from '../Component/DashboardItem'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Content extends Component {
    render() {
        return (
            <section>
                <Typography variant="headline" component="h3">Dashboard</Typography>
                <Grid container spacing={16}>
                    <DashboardItem title="t2.micro" metric="6" />
                    <DashboardItem title="t2.small" metric="8" />
                    <DashboardItem title="t2.large" metric="10" />
                    <DashboardItem title="c4.large" metric="12" />
                    <DashboardItem title="m3.medium" metric="3" />
                </Grid>
            </section>
        );
    }
}

export default Content;
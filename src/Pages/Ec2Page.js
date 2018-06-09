import React, { Component } from 'react'

import DashboardItem from '../Components/DashboardItem'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Ec2Page extends Component {
    render() {
        return (
            <div>
                <Typography variant="headline" component="h3">Ec2 Page</Typography>
                <Grid container spacing={16}>
                    <DashboardItem title="t2.micro" metric="6" />
                    <DashboardItem title="t2.small" metric="8" />
                    <DashboardItem title="t2.large" metric="10" />
                    <DashboardItem title="c4.large" metric="12" />
                    <DashboardItem title="m3.medium" metric="3" />
                </Grid>
            </div>
        );
    }
}

export default Ec2Page;
import React, { Component } from 'react'

import DashboardItem from '../Components/DashboardItem'

import {
    Typography, Grid, Radio, FormGroup, Tabs, Tab,
    FormLabel, FormControl, FormControlLabel
} from '@material-ui/core'

import Ec2Service from '../Services/Ec2Service';
import ReportService from '../Services/ReportService';
import { credentials } from '../Config'

class Ec2Page extends Component {

    componentWillMount() {
        const instances = new Ec2Service(credentials).getInstances();
        const dashboard = new ReportService(instances).by('Type');
        this.setState({instances, dashboard});
    }

    render() {
        const total = this._total();
        return (
            <div>
                <Typography variant="headline" component="h1">Ec2 Page</Typography>

                <FormControl component="fieldset" required>
                    <FormLabel component="legend">Filter Type</FormLabel>
                    
                    <FormGroup row>
                        <FormControlLabel value="Type" control={<Radio />} label="Instance Type" />
                        <FormControlLabel value="SubnetId" control={<Radio />} label="Subnet" />
                        <FormControlLabel value="VpcId" control={<Radio />} label="Vpc" />
                    </FormGroup>
                </FormControl>
                
                <Grid item xs={12}>
                    <Tabs fullWidth>
                        <Tab label={'Total Instances: ' + (total.running + total.stopped)} />
                        <Tab label={'Running: ' + total.running} />
                        <Tab label={'Stopped: ' + total.stopped} />
                    </Tabs>
                </Grid>
                
                <Grid container spacing={16}>
                    {this._dashboardItems()}
                </Grid>
            </div>
        );
    }

    _total() {
        return Object.keys(this.state.dashboard).map((keyField) => {
            const running = this.state.dashboard[keyField].Running;
            const stopped = this.state.dashboard[keyField].Stopped;
            return {running, stopped};
        }).reduce((total, current) => {
            total.running += current.running;
            total.stopped += current.stopped;
            return total;
        }, {running: 0, stopped: 0});
    }

    _dashboardItems() {
        return Object.keys(this.state.dashboard).map((keyField) => {
            const running = this.state.dashboard[keyField].Running;
            const stopped = this.state.dashboard[keyField].Stopped;
            return <DashboardItem title={keyField} running={running} stopped={stopped}  />        
        });
    }
}

export default Ec2Page;
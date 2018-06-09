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

    constructor(props) {
        super(props);
        this.state = {
            instances: [],
            dashboard: [],
            filter: 'Type'
        }
    }

    componentWillMount() {
        const instances = new Ec2Service(credentials).getInstances();
        const dashboard = new ReportService(instances).by(this.state.filter);
        this.setState({instances, dashboard});
    }

    changeFilter(e) {
        const filter = e.target.value;
        const dashboard = new ReportService(this.state.instances).by(filter);
        this.setState({ filter, dashboard });
    }

    render() {
        const total = this._total();
        return (
            <div>
                <Typography variant="headline" component="h1">Ec2 Page</Typography>

                <FormControl component="fieldset" required>
                    <FormLabel component="legend">Filter Type</FormLabel>
                    
                    <FormGroup row>
                        <FormControlLabel label="Instance Type"
                                          control={<Radio value="Type" onChange={this.changeFilter.bind(this)} checked={this.state.filter === 'Type'} />}
                        />
                        <FormControlLabel label="Subnet"
                                          control={<Radio value="SubnetId" onChange={this.changeFilter.bind(this)} checked={this.state.filter === 'SubnetId'} />} 
                        />
                        <FormControlLabel label="Vpc"
                                          control={<Radio value="VpcId" onChange={this.changeFilter.bind(this)} checked={this.state.filter === 'VpcId'} />}  
                        />
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
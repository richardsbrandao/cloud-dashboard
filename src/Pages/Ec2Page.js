import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../Config/constants';

import DashboardItem from '../Components/DashboardItem';

import {
    Typography, Grid, Radio, FormGroup, Tabs, Tab,
    FormLabel, FormControl, FormControlLabel
} from '@material-ui/core';

class Ec2Page extends Component {

    componentWillMount() {
        this.props.dashboardInstances(this.props.filter);
    }

    changeFilter(e) {
        this.props.changeDashboardByFilter(e.target.value, this.props.instances);
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
                                          control={<Radio value="Type" onChange={this.changeFilter.bind(this)} checked={this.props.filter === 'Type'} />}
                        />
                        <FormControlLabel label="Subnet"
                                          control={<Radio value="SubnetId" onChange={this.changeFilter.bind(this)} checked={this.props.filter === 'SubnetId'} />} 
                        />
                        <FormControlLabel label="Vpc"
                                          control={<Radio value="VpcId" onChange={this.changeFilter.bind(this)} checked={this.props.filter === 'VpcId'} />}  
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
        return Object.keys(this.props.dashboard).map((keyField) => {
            const running = this.props.dashboard[keyField].Running;
            const stopped = this.props.dashboard[keyField].Stopped;
            return {running, stopped};
        }).reduce((total, current) => {
            total.running += current.running;
            total.stopped += current.stopped;
            return total;
        }, {running: 0, stopped: 0});
    }

    _dashboardItems() {
        return Object.keys(this.props.dashboard).map((keyField) => {
            const running = this.props.dashboard[keyField].Running;
            const stopped = this.props.dashboard[keyField].Stopped;
            return <DashboardItem title={keyField} running={running} stopped={stopped}  />        
        });
    }
}

const mapStateToProps = state => { return {instances: state.Ec2Reducer.instances, dashboard: state.Ec2Reducer.dashboard, filter: state.Ec2Reducer.filter}  }
const mapDispatchToProps = dispatch => {
    return {
        dashboardInstances: () => dispatch({
            type: Actions.DASHBOARD_INSTANCE
        }),
        changeDashboardByFilter: (by, instances) => dispatch({
            type: Actions.CHANGE_DASHBOARD_INSTANCE,
            by,
            instances
        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Ec2Page);
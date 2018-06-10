import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../Config/constants';

import DashboardReport from '../Components/DashboardReport';
import DashboardFilter from '../Components/DashboardFilter';

import { Typography } from '@material-ui/core';

class Ec2Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersControl: [
                {label: 'Instance Type', value: 'Type'},
                {label: 'Subnet', value: 'SubnetId'},
                {label: 'Vpc', value: 'VpcId'}
            ]
        }
    }

    componentWillMount() {
        this.props.dashboardInstances(this.props.filter);
    }

    changeFilter(e) {
        this.props.changeDashboardByFilter(e.target.value, this.props.instances);
    }

    render() {
        return (
            <section>
                <Typography variant="headline" component="h1">Ec2 Page</Typography>

                <DashboardFilter control={this.state.filtersControl} filter={this.props.filter} changeFilter={this.changeFilter.bind(this)} />
                <DashboardReport items={this.props.dashboard} keyField={this.props.filter} />
            </section>
        );
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEc2Dashboard } from '../Actions/Ec2Actions'

import DashboardReport from '../Components/DashboardReport';
import DashboardFilter from '../Components/DashboardFilter';
import DateHistory from '../Components/DateHistory';
import Loading from '../Components/Loading'

import moment from 'moment'
import { Typography } from '@material-ui/core';

class Ec2Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersControl: [
                {label: 'Instance Type', value: 'Type'},
                {label: 'Subnet', value: 'SubnetId'},
                {label: 'Vpc', value: 'VpcId'}
            ],
            today: moment().format('YYYY-MM-DD')
        }
    }

    componentWillMount() {
        this.props.fetchEc2Dashboard(this.props.filter);
    }

    changeFilter(e) {
        this.props.fetchEc2Dashboard(e.target.value);
    }

    render() {
        let content = <Loading />
        if( !this.props.loading ) {
            content = <DashboardReport items={this.props.dashboard} keyField={this.props.filter} />
        }
        return (
            <section>
                <DateHistory action={this.props.fetchEc2Dashboard} filter={this.props.filter} />
                <Typography variant="headline" component="h1">Ec2 Page</Typography>
                <DashboardFilter control={this.state.filtersControl} filter={this.props.filter} changeFilter={this.changeFilter.bind(this)} />

                {content}
            </section>
        );
    }

}

const mapStateToProps = state => { 
    return {
        loading: state.Ec2Reducer.loading, 
        dashboard: state.Ec2Reducer.dashboard, 
        filter: state.Ec2Reducer.filter
    }  
}
const mapDispatchToProps = dispatch => {
    return {
        fetchEc2Dashboard: (filter, params) => dispatch(fetchEc2Dashboard(filter, params))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Ec2Page);
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchRdsDashboard } from '../Actions/RdsActions'

import DashboardReport from '../Components/DashboardReport';
import DashboardFilter from '../Components/DashboardFilter';
import Loading from '../Components/Loading'

import { Typography } from '@material-ui/core';

class RdsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersControl: [
                {label: 'Instance Type', value: 'DBInstanceClass'},
                {label: 'Engine', value: 'Engine'}
            ]
        }
    }

    componentWillMount() {
        this.props.fetchRdsDashboard(this.props.filter);
    }

    changeFilter(e) {
        this.props.fetchRdsDashboard(e.target.value);
    }

    render() {
        let content = <Loading />
        if( !this.props.loading ) {
            content = <DashboardReport items={this.props.dashboard} keyField={this.props.filter} />
        }

        return (
            <section>
                <Typography variant="headline" component="h1">RDS Page</Typography>
                <DashboardFilter control={this.state.filtersControl} filter={this.props.filter} changeFilter={this.changeFilter.bind(this)} />

                {content}                
            </section>
        );
    }
}

const mapStateToProps = state => { 
    return {
        loading: state.RdsReducer.loading, 
        dashboard: state.RdsReducer.dashboard, 
        filter: state.RdsReducer.filter
    }  
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchRdsDashboard: (filter) => dispatch(fetchRdsDashboard(filter)) 
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(RdsPage);
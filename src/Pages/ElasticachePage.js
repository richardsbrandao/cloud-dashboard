import React, { Component } from 'react'

import { connect } from 'react-redux';
import { fetchEcacheDashboard } from '../Actions/EcacheActions'

import DashboardReport from '../Components/DashboardReport';
import DashboardFilter from '../Components/DashboardFilter';
import Loading from '../Components/Loading'

import Typography from '@material-ui/core/Typography';

class ElasticachePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersControl: [
                {label: 'Engine', value: 'Engine'},
                {label: 'Node Type', value: 'CacheNodeType'}
            ]
        }
    }

    componentWillMount() {
        this.props.fetchEcacheDashboard(this.props.filter);
    }

    changeFilter(e) {
        this.props.fetchEcacheDashboard(e.target.value);
    }

    render() {
        let content = <Loading />
        if( !this.props.loading ) {
            content = <DashboardReport items={this.props.dashboard} keyField={this.props.filter} />
        }

        return (
            <section>
                <Typography variant="headline" component="h1">Elasticache</Typography>
                <DashboardFilter control={this.state.filtersControl} filter={this.props.filter} changeFilter={this.changeFilter.bind(this)} />

                {content}                
            </section>
        );
    }
}

const mapStateToProps = state => { 
    return {
        loading: state.EcacheReducer.loading, 
        dashboard: state.EcacheReducer.dashboard, 
        filter: state.EcacheReducer.filter
    }  
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchEcacheDashboard: (filter) => dispatch(fetchEcacheDashboard(filter)) 
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(ElasticachePage);
import React, { Component } from 'react';

import DashboardItem from './DashboardItem';

import { Grid, Tabs, Tab } from '@material-ui/core';

class DashboardReport extends Component {
    render() {
        const total = this._total();
        return (
            <div>
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
        )
    }

    _total() {
        return Object.keys(this.props.items).map((keyField) => {
            const running = this.props.items[keyField].Running;
            const stopped = this.props.items[keyField].Stopped;
            return {running, stopped};
        }).reduce((total, current) => {
            total.running += current.running;
            total.stopped += current.stopped;
            return total;
        }, {running: 0, stopped: 0});
    }

    _dashboardItems() {
        return Object.keys(this.props.items).map((keyField, i) => {
            const running = this.props.items[keyField].Running;
            const stopped = this.props.items[keyField].Stopped;
            return <DashboardItem key={i} title={keyField} running={running} stopped={stopped}  />        
        });
    }
}

export default DashboardReport;
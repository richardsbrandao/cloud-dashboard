import React, { Component } from 'react';

import DashboardItem from './DashboardItem';

import { Grid, Tabs, Tab, MobileStepper, Button, Typography } from '@material-ui/core';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';


class DashboardReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }

    handleNext() {
        this.setState({activeStep: this.state.activeStep+1});
    }

    handleBack() {
        this.setState({activeStep: this.state.activeStep-1});
    }

    render() {
        const maxSteps = this.props.items.length;
        if(this.shouldNotRender(maxSteps)) {
            return '';
        }
        
        const activeStep = this.state.activeStep;
        const activeReport = this.props.items[activeStep]
        const time = activeReport.time;
        const report = activeReport.report;
        const total = this._total(report);

        return (
            <div>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={this.handleNext.bind(this)} disabled={activeStep === maxSteps - 1}>
                        Next <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack.bind(this)} disabled={activeStep === 0}>
                        <KeyboardArrowLeft /> Back
                        </Button>
                    }
                    />

                <Grid item xs={12}>
                    <Typography variant="title" gutterBottom align="center">
                        Time: {time}
                    </Typography>
                    <Tabs fullWidth value={0}>
                        <Tab disabled label={'Total Instances: ' + (total.running + total.stopped)} />
                        <Tab label={'Running: ' + total.running} />
                        <Tab label={'Stopped: ' + total.stopped} />
                    </Tabs>
                </Grid>
                
                <Grid container spacing={16}>
                    {this._dashboardItems(report)}
                </Grid>
            </div>
        )
    }

    shouldNotRender(maxSteps) {
        return maxSteps === 0;
    }

    _total(report) {
        return Object.keys(report).map((keyField) => {
            const running = report[keyField].Running;
            const stopped = report[keyField].Stopped;
            return {running, stopped};
        }).reduce((total, current) => {
            total.running += current.running;
            total.stopped += current.stopped;
            return total;
        }, {running: 0, stopped: 0});
    }

    _dashboardItems(report) {
        return Object.keys(report).map((keyField, i) => {
            const running = report[keyField].Running;
            const stopped = report[keyField].Stopped;
            return <DashboardItem key={i} title={keyField} running={running} stopped={stopped}  />        
        });
    }
}

export default DashboardReport;
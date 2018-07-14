import React, { Component } from "react";
import moment from 'moment'

import { TextField, Select, Button, Grid, FormControl, InputLabel } from '@material-ui/core';

class DateHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: true,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD')
        }
        // apply validation
    }

    changeStartDate(e) {
        this.setState({startDate: e.target.value});
    }

    changeEndDate(e) {
        this.setState({endDate: e.target.value});
    }

    changeFilter(e) {
        this.setState({disabled: 'current' === e.target.value});
    }

    submit() {
        if( this.state.disabled ) {
            this.props.action(this.props.filter)
        } else {
            this.props.action(this.props.filter, {startDate: this.state.startDate, endDate: this.state.endDate})
        }
    }

    render() {
        return (
            <Grid container xs={12} inline>
                <Grid item sm={2}>
                    <TextField
                        id="start_date"
                        label="Start Date"
                        type="date"
                        onChange={this.changeStartDate.bind(this)}
                        defaultValue={this.state.endDate}
                        disabled={this.state.disabled}
                    />
                </Grid>
                <Grid item sm={2}>
                    <TextField
                        id="end_date"
                        label="End Date"
                        type="date"
                        onChange={this.changeEndDate.bind(this)}
                        defaultValue={this.state.startDate}
                        disabled={this.state.disabled}
                    />
                </Grid>
                <Grid item sm={2}>
                <FormControl>
                    <InputLabel>History</InputLabel>
                    <Select native onChange={this.changeFilter.bind(this)}>
                        <option value="current">Current</option>
                        <option value="date">Date</option>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    <Button variant="contained" color="primary" onClick={this.submit.bind(this)}>
                        Reload
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default DateHistory;
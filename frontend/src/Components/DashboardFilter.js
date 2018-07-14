import React, { Component } from 'react';

import {
    Radio, FormGroup, FormLabel, FormControl, FormControlLabel
} from '@material-ui/core';

class DashboardFilter extends Component {
    render() {
        return (
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Filter Type</FormLabel>
                
                <FormGroup row>
                    {this._createFilterControl()}
                </FormGroup>
            </FormControl>
        );
    }

    _createFilterControl() {
        return this.props.control.map((filter, i) => {
            return <FormControlLabel key={i} label={filter.label}
                        control={
                            <Radio value={filter.value} 
                                    onChange={this.props.changeFilter.bind(this)} 
                                    checked={this.props.filter === filter.value} 
                            />
                        }
                    />
        })
    }
}

export default DashboardFilter;
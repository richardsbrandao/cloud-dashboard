import React, { Component } from 'react'

import {
    Typography, Grid, Radio, FormGroup,
    FormLabel, FormControl, FormControlLabel
} from '@material-ui/core'

class RdsPage extends Component {
    render() {
        return (
            <section>
                <Typography variant="headline" component="h1">RDS Page</Typography>

                <FormControl component="fieldset" required>
                    <FormLabel component="legend">Filter Type</FormLabel>
                    
                    <FormGroup row>
                        <FormControlLabel value="DBInstanceClass" control={<Radio />} label="Instance Type" />
                        <FormControlLabel value="DBSubnetGroup" control={<Radio />} label="Subnet Group" />
                    </FormGroup>
                </FormControl>
                
                <Grid item xs={12}>
                    <Typography variant="headline" align="center" component="h3">Total Instances: XX</Typography>
                </Grid>
                <Grid container spacing={16}>
                
                </Grid>
            </section>
        );
    }
}

export default RdsPage;
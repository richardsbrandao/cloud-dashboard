import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';

import Header from './Header';
import Content from './Content';
import Menu from './Menu';

class Root extends Component {
    render() {
        return (
            <Grid id="app" container spacing={24}>
                <Grid id="header" item xs={12}>
                <Header />
                </Grid>
                <Grid id="menu" item xs={2}>
                <Menu />
                </Grid>
                <Grid id="content" item xs={10}>
                <Content />
                </Grid>
            </Grid>
        )
    }
}

export default Root;
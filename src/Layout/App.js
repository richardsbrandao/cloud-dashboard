import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../Styles/Root.css'

import { BrowserRouter } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/es/styles'
import Grid from '@material-ui/core/Grid';

import Header from './Header';
import Menu from './Menu';
import Content from './Content';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={createMuiTheme()}>
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
        </MuiThemeProvider>
      </BrowserRouter>
      );
  }
}


const mapStateToProps = (state) => { return state }
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App);

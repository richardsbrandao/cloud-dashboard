import React, { Component } from 'react';

import './Styles/Root.css'
import Root from './Layout/Root';

import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/es/styles'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={createMuiTheme()}>
          <Root />
        </MuiThemeProvider>
      </BrowserRouter>
      );
  }
}

export default App;

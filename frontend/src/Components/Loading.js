import React, { Component } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {completed: 100};
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <Grid item align="center" sm={12}>
                    <CircularProgress
                        color="secondary"
                        variant="determinate"
                        value={this.state.completed}
                    />
                    <br />
                    <strong>Loading</strong>
                </Grid>
    }

    progress = () => {
        const { completed } = this.state
        this.setState({completed: completed > 100 ? 0 : completed+1})
    }
}

export default Loading;
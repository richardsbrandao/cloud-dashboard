import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom' 

import DashboardPage from '../Pages/DashboardPage';
import Ec2Page from '../Pages/Ec2Page';
import RdsPage from '../Pages/RdsPage';
import ElasticachePage from '../Pages/ElasticachePage';
import S3Page from '../Pages/S3Page';

class Content extends Component {
    render() {
        return (
            <section>
                <Switch>
                    <Route path="/" exact component={DashboardPage} />
                    <Route path="/ec2" exact component={Ec2Page} />
                    <Route path="/rds" exact component={RdsPage} />
                    <Route path="/elasticache" exact component={ElasticachePage} />
                    <Route path="/s3" exact component={S3Page} />
                </Switch>
            </section>
        );
    }
}

export default Content;
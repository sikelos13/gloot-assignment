import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import StoreManagement from './containers/ApplicationBase';
import { Container } from '@material-ui/core';

export default class Routes extends Component<{}, {}> {
    render() {
        return (
            <Container className="main-container">                     
                <Switch>
                    <Route exact path={["/players", "/"]} component={StoreManagement} />
                </Switch>
            </Container>
        );
    }
}
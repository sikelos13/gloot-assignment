import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import PlayersManagement from './containers/PlayersManagement';
import { Container } from '@material-ui/core';

export default class Routes extends Component<{}, {}> {
    render() {
        return (
            <Container className="main-container">                     
                <Switch>
                    <Route exact path={["/players", "/"]} component={PlayersManagement} />
                </Switch>
            </Container>
        );
    }
}
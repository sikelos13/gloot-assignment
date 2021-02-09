import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import StoreManagement from '@containers/ApplicationBase';
import EditPlayerFormController from '@components/players_management/PlayerFormControllers/EditPlayerFormController';
import AddPlayerFormController from '@components/players_management/PlayerFormControllers/AddPlayerFormController';
import { Container } from '@material-ui/core';

export default class Routes extends Component<{}, {}> {
    render() {
        return (
            <Container color="secondary">                     
                <Switch>
                    <Route exact path={["/players", "/"]} component={StoreManagement} />
                    <Route path="/:id/edit" component={EditPlayerFormController} />
                    <Route path="/player/new" component={AddPlayerFormController} />
                </Switch>
            </Container>
        );
    }
}
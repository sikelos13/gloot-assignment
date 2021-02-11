import React from "react";
import { History } from "history";
import { Router } from 'react-router-dom';
import './App.scss';
import Routes from './Routes';
import { Toaster } from 'react-hot-toast';

interface OwnProps {
    history: History;
}

class App extends React.Component<OwnProps,{}> {

    public render() {
        const { history } = this.props;

        return (
          <Router history={history}>
              <Toaster 
                position="top-center"
                reverseOrder={false}
              />
                <Routes />
          </Router>
        );
    }
}

export default App;
import React, { Component } from 'react';
import styled from 'styled-components';
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import IndexView from '@/views';
import SettingView from '@/views/setting';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={IndexView} />
                    <Route path="/setting" component={SettingView} />
                </Switch>
            </Router>
        );
    }
}


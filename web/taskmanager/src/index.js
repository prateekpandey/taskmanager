import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './Login';
import RegistrationPage  from './Register';
import TaskList from './TaskList';
import { HashRouter,Route,IndexRoute } from 'react-router-dom';

ReactDOM.render((
    <HashRouter>
        <div>
            <Route exact path="/" component={LoginPage} />
            <Route path="/Register" component={RegistrationPage} />
            <Route path="/taskListing" component={TaskList} />
        </div>
    </HashRouter >
), document.getElementById( 'root' ) );

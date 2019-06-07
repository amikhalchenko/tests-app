import React, {Component} from 'react';
import './App.css';
import StartPage from './components/start-page/StartPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import TestPassing from "./components/test-passing/TestPassing";
import UserAccount from "./components/user-account/UserAccount";
import axios from 'axios';
import ResultBySubjects from "./components/result-by-subjects/ResultBySubjects";


(function() {
    const token = localStorage.getItem('auth-token');
    if (token) {
        axios.defaults.headers.common['auth-token'] = token;
    } else {
        axios.defaults.headers.common['auth-token'] = '';
    }
})();

export default class App extends Component {

    render() {

        return (
            <Router>
                <div className="router">
                    <Route path="/" exact component={StartPage}/>
                    <Route path="/quiz" render={(props) => (<TestPassing topics={props.location.state} />)} />
                    <Route path="/account" component={UserAccount}/>
                    <Route path="/detailed-result" render={(props) => (<ResultBySubjects sessionId={props.location.state} />)} />
                </div>
            </Router>
        )
    }

}


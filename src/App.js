import React, {Component} from 'react';
import './App.css';
import StartPage from './components/start-page/StartPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import TestPassing from "./components/test-passing/TestPassing";
import UserAccount from "./components/user-account/UserAccount";
import axios from 'axios';
import ResultBySubjectsCards from "./components/result-by-subjects/ResultBySubjectsCards";
import StartTestsDialog from "./components/start-tests-dialog/StartTestsDialog";
import ResultBySubjectsContainer from "./components/result-by-subjects/ResultBySubjectsContainer";


(function() {
    const token = sessionStorage.getItem('auth-token');
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
                    <Route path="/detailed-result" render={(props) => (<ResultBySubjectsContainer sessionId={props.location.state} />)} />
                </div>
            </Router>
        )
    }

}


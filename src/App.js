import React, {Component} from 'react';
import './App.css';
import StartPage from './components/start-page/StartPage';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import TestPassing from "./components/test-passing/TestPassing";
import UserAccount from "./components/user-account/UserAccount";
import axios from 'axios';
import ResultBySubjectsContainer from "./components/result-by-subjects/ResultBySubjectsContainer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AuthAppBarControls from "./components/auth-app-bar-controls/AuthAppBarControls";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/icons/Menu';
import LogInDialog from "./components/log-in-dialog/LogInDialog";
import SignUpDialog from "./components/sign-up-dialog/SignUpDialog";
import StartTestsDialog from "./components/start-tests-dialog/StartTestsDialog";
import AppBarMenu from "./components/app-bar-menu/AppBarMenu";
import TestsLinkDialog from "./components/tests-link-dialog/TestsLinkDialog";
import TestsLinkResolver from "./components/tests-link-resolver/TestsLinkResolver";
import UserAccountStatistic from "./components/user-account-statistic/UserAccountStatistic";


export const ADMIN_SECRET = '1111';
export const USER_SECRET = '2222';

export function decodeTopicsFromUserUrlToBase64(str) {
    const topicsStr = str.substring(6);
    const topics = topicsStr.split('+')
        .map(topic => topic.replace('&', '/'))
        .map(topic => topic.replace('_', ' '))
        .map(topic => {
            const topicSplit = topic.split('^');
            return {
                id: topicSplit[1],
                name: topicSplit[0]
            }
        });
    return Buffer.from(JSON.stringify(topics)).toString('base64');
}

export function encodeTopicsToUserUrl(topics) {
    const baseUrl = 'http://localhost:3000/questions/guest=';
    const encodedTopics = topics
        .map(topic => topic.name + '^' + topic.id)
        .map(topic => topic.replace(' ', '_'))
        .map(topic => topic.replace('/', '&'))
        .reduce((reducer, currentValue) => reducer + '+' + currentValue);

    return baseUrl + encodedTopics;
}

(function () {
    const token = localStorage.getItem('auth-token');
    if (token) {
        axios.defaults.headers.common['auth-token'] = token;
    } else {
        axios.defaults.headers.common['auth-token'] = '';
    }
})();

export default class App extends Component {

    state = {
        isDrawerOpen: false,
        isLoginDialogOpen: false,
        isSignUpDialogOpen: false,
        isStartTestsDialogOpen: false,
        isTestsLinkDialogOpen: false,
        isAuthenticated: localStorage.getItem('auth-token') !== null,
        isCurator: localStorage.getItem('isCurator') === ADMIN_SECRET,
        lastTestsLink: '',
        userStatistic: []
    };

    logout = (history) => {
        this.setState({
            isDrawerOpen: false,
            isAuthenticated: false,
            isAdmin: false,
            isCurator: false
        });
        axios.defaults.headers.common['auth-token'] = '';
        localStorage.removeItem('auth-token');
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('isCurator');
        history.push('/');
    };

    openUserAccount = (history) => {
        this.setState({
            isDrawerOpen: false
        });
        history.push('/account');
    };

    toggleDrawer(event) {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({isDrawerOpen: !this.state.isDrawerOpen});
    }

    loginDialogHandler = (isCurator = false, isAuthenticated = false) => {
        this.setState({
            isDrawerOpen: false,
            isLoginDialogOpen: !this.state.isLoginDialogOpen,
            isAuthenticated: isAuthenticated,
            isCurator: isCurator
        });
    };

    signUpDialogHandler = (isAuthenticated = false) => {
        this.setState({
            isDrawerOpen: false,
            isSignUpDialogOpen: !this.state.isSignUpDialogOpen,
            isAuthenticated: isAuthenticated
        });
    };

    startTestsDialogHandler = () => {
        this.setState({
            isDrawerOpen: false,
            isStartTestsDialogOpen: !this.state.isStartTestsDialogOpen
        })
    };


    testsLinkDialogHandler = (link = '') => {
        this.setState({
            lastTestsLink: link,
            isTestsLinkDialogOpen: !this.state.isTestsLinkDialogOpen
        });
    };


    render() {

        return (
            <Router>
                <div className="router">
                    {/* App bar */}
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Menu onClick={(e) => this.toggleDrawer(e)} className="menuIcon"/>

                            <Route render={({history}) => (
                                <Typography className="appBarTitle" variant="h6" color="inherit"
                                            onClick={() => history.push('/')}>
                                    Tests App
                                </Typography>
                            )}/>

                            {
                                !this.state.isAuthenticated
                                    ? (
                                        <AuthAppBarControls
                                            firstButtonClickHandler={() => {this.signUpDialogHandler(false)}}
                                            firstButtonLabel={'Sign Up'}
                                            secondButtonClickHandler={this.loginDialogHandler}
                                            secondButtonLabel={'Log In'}
                                        />
                                    )
                                    : <AppBarMenu
                                        isAuthenticated={this.state.isAuthenticated}
                                        logoutHandler={this.logout}
                                        startTestsDialogHandler={this.startTestsDialogHandler}
                                        openUserAccount={this.openUserAccount}
                                    />
                            }

                        </Toolbar>
                    </AppBar>

                    {/* Drawer */}
                    <Drawer open={this.state.isDrawerOpen} onClose={(e) => this.toggleDrawer(e)}>
                        <List>

                            {
                                localStorage.getItem('auth-token') === null
                                    ? (
                                        <ListItem button onClick={() => {this.signUpDialogHandler(false)}}>
                                            <ListItemIcon><AccountCircle/></ListItemIcon>
                                            <ListItemText>Sign Up</ListItemText>
                                        </ListItem>
                                    )
                                    : (
                                        <Route render={({history}) => (
                                            <ListItem button onClick={() => {
                                                this.openUserAccount(history)
                                            }}>
                                                <Typography className="userLogo" variant="subtitle1" color="inherit">
                                                    {localStorage.getItem('userFirstName')[0] + localStorage.getItem('userLastName')[0]}
                                                </Typography>
                                                <ListItemText className="userName">
                                                    {localStorage.getItem('userFirstName') + ' ' + localStorage.getItem('userLastName')}
                                                </ListItemText>
                                            </ListItem>
                                        )}/>
                                    )
                            }

                            {
                                localStorage.getItem('auth-token') !== null
                                    ? (
                                        <ListItem button onClick={this.startTestsDialogHandler}>
                                            <ListItemIcon>
                                                <SvgIcon>
                                                    <path fill="#000000"
                                                          d="M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z"/>
                                                </SvgIcon>
                                            </ListItemIcon>
                                            <ListItemText>Start new test</ListItemText>
                                        </ListItem>
                                    )
                                    : null
                            }

                            {
                                localStorage.getItem('auth-token') === null
                                    ? (
                                        <ListItem button onClick={this.loginDialogHandler}>
                                            <ListItemIcon>
                                                <SvgIcon>
                                                    <path fill="#000000"
                                                          d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z"/>
                                                </SvgIcon>
                                            </ListItemIcon>
                                            <ListItemText>Log In</ListItemText>
                                        </ListItem>
                                    )
                                    : (
                                        <Route render={({history}) => (
                                            <ListItem button onClick={() => this.logout(history)}>
                                                <ListItemIcon className="logoutIcon">
                                                    <SvgIcon>
                                                        <path fill="#000000"
                                                              d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
                                                    </SvgIcon>
                                                </ListItemIcon>
                                                <ListItemText>Log Out</ListItemText>
                                            </ListItem>
                                        )}/>
                                    )
                            }

                        </List>
                    </Drawer>

                    <LogInDialog
                        open={this.state.isLoginDialogOpen}
                        loginDialogHandler={this.loginDialogHandler}
                    />
                    <SignUpDialog open={this.state.isSignUpDialogOpen} signUpDialogHandler={this.signUpDialogHandler}/>
                    <StartTestsDialog open={this.state.isStartTestsDialogOpen}
                                      startTestsDialogHandler={this.startTestsDialogHandler}
                                      isCurator={this.state.isCurator}
                                      testsLinkDialogHandler={this.testsLinkDialogHandler}

                    />
                    <TestsLinkDialog open={this.state.isTestsLinkDialogOpen}
                                     testsLinkDialogHandler={this.testsLinkDialogHandler}
                                     link={this.state.lastTestsLink}
                    />


                    <Route path="/" exact
                           render={() => (<StartPage startTestsDialogHandler={this.startTestsDialogHandler}/>)}/>
                    <Route path="/quiz" exact render={
                        (props) => (<TestPassing topics={props.location.state}
                                                 testsLinkDialogHandler={this.testsLinkDialogHandler}
                                                 signUpDialogHandler={this.signUpDialogHandler}/>)
                    }/>
                    <Route path="/questions/:id" component={TestsLinkResolver}/>
                    <Route path="/account" render={() => (<UserAccount
                        isCurator={this.state.isCurator}
                        testsLinkDialogHandler={this.testsLinkDialogHandler}/>)
                    }/>
                    <Route path="/user-statistic" component={UserAccountStatistic}/>
                    <Route path="/detailed-result"
                           render={(props) => (<ResultBySubjectsContainer sessionId={props.location.state}/>)}/>
                </div>
            </Router>
        )
    }

}


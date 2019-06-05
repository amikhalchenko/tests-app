import React from 'react';
import './StartPage.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import AuthAppBarControls from '../auth-app-bar-controls/AuthAppBarControls';
import LogInDialog from "../log-in-dialog/LogInDialog";
import SignUpDialog from "../sign-up-dialog/SignUpDialog";
import StartTestsDialog from "../start-tests-dialog/StartTestsDialog";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            isLoginDialogOpen: false,
            isSignUpDialogOpen: false,
            isStartTestsDialogOpen: false
        };

    }

    loginDialogHandler = () => {
        this.setState({
            isDrawerOpen: false,
            isLoginDialogOpen: !this.state.isLoginDialogOpen
        });
    };

    signUpDialogHandler = () => {
        this.setState({
            isDrawerOpen: false,
            isSignUpDialogOpen: !this.state.isSignUpDialogOpen
        });
    };

    startTestsDialogHandler = () => {
        this.setState({
            isDrawerOpen: false,
            isStartTestsDialogOpen: !this.state.isStartTestsDialogOpen
        })
    };

    toggleDrawer(event) {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({isDrawerOpen: !this.state.isDrawerOpen});
    }

    render() {
        return (
            <div>
                {/* App bar */}
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Menu onClick={(e) => this.toggleDrawer(e)} className="menuIcon"/>
                        <Typography className="appBarTitle" variant="h6" color="inherit">
                            Tests App
                        </Typography>

                        <AuthAppBarControls
                            loginDialogHandler={this.loginDialogHandler}
                            signUpDialogHandler={this.signUpDialogHandler}
                        />

                    </Toolbar>
                </AppBar>

                {/* Drawer */}
                <Drawer open={this.state.isDrawerOpen} onClose={(e) => this.toggleDrawer(e)}>
                    <List>
                        <ListItem button onClick={this.signUpDialogHandler}>
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText>Sign Up</ListItemText>
                        </ListItem>

                        <ListItem button onClick={this.loginDialogHandler}>
                            <ListItemIcon>
                                <SvgIcon>
                                    <path fill="#000000"
                                          d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z"/>
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText>Log In</ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <SvgIcon>
                                    <path fill="#000000"
                                          d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main content */}
                <div className="mainContent">
                    <Typography className="mainContentText" variant="h3">
                        You don't know programming!
                    </Typography>
                    <Typography className="mainContentText" variant="h4">
                        Prove your skills with our tests
                    </Typography>
                    <Button variant="contained" color="primary" onClick={this.startTestsDialogHandler}
                            className="startTestsButton">
                        Start Tests
                    </Button>

                    <div className="shadow"/>

                </div>

                <LogInDialog open={this.state.isLoginDialogOpen} loginDialogHandler={this.loginDialogHandler}/>

                <SignUpDialog open={this.state.isSignUpDialogOpen} signUpDialogHandler={this.signUpDialogHandler}/>

                <StartTestsDialog open={this.state.isStartTestsDialogOpen}
                                  startTestsDialogHandler={this.startTestsDialogHandler}/>


            </div>
        )
    }
}

export default StartPage;

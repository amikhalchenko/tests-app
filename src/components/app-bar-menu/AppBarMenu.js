import React from 'react';
import './AppBarMenu.css';
import Button from '@material-ui/core/Button';
import {Route} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

export default class AppBarMenu extends React.Component {

    state = {
        userFirstName: '',
        userLastName: '',
    };

    componentDidMount() {
        axios.get('/account')
            .then(res => {
                console.log(res);
                this.setState({
                    userFirstName: res.data.firstName,
                    userLastName: res.data.lastName
                });

                sessionStorage.setItem('userFirstName', res.data.firstName);
                sessionStorage.setItem('userLastName', res.data.lastName);
            });
    }

    render() {
        return (
            <div className="menu">
                {
                    this.props.isAuthenticated
                        ? (
                            <Route render={({history}) => (
                                <ListItem button onClick={() => {
                                    this.props.openUserAccount(history)
                                }}>
                                    <Typography className="userLogo" variant="subtitle1" color="inherit">
                                        {this.state.userFirstName[0] + this.state.userLastName[0]}
                                    </Typography>
                                    <ListItemText className="userName">
                                        {this.state.userFirstName + ' ' + this.state.userLastName}
                                    </ListItemText>
                                </ListItem>
                            )}/>
                        )
                        : null
                }

                <Button onClick={this.props.startTestsDialogHandler}>Start New Test</Button>

                <Route render={({history}) => (
                    <Button onClick={() => {
                        this.props.logoutHandler(history);
                    }}>
                        Log Out
                    </Button>
                )}/>
            </div>
        );
    }

}
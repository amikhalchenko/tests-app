import React from 'react';
import './LogInDialog.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import {ADMIN_SECRET, USER_SECRET} from "../../App";

class LogInDialog extends React.Component {

    state = {
        loginInput: '',
        passwordInput: '',
        isCredentialsValid: true
    };

    handleLoginInput = (event) => {
        this.setState({
            loginInput: event.target.value,
            isCredentialsValid: true
        });
    };

    handlePasswordInput = (event) => {
        this.setState({
            passwordInput: event.target.value,
            isCredentialsValid: true
        })
    };

    logIn = (history) => {
        if (this.state.passwordInput.length === 0 || this.state.loginInput.length === 0) {
            this.setState({
                isCredentialsValid: false
            });
            return
        }

        const userCredentials = {
            email: this.state.loginInput,
            password: this.state.passwordInput
        };

        axios.post('/login', userCredentials)
            .then(res => {
                const authToken = res.data.accessToken;
                localStorage.setItem('auth-token', authToken);
                axios.defaults.headers.common['auth-token'] = authToken;

                // set admin
                if (res.data.curator) {
                    localStorage.setItem('isCurator', ADMIN_SECRET);
                } else {
                    localStorage.setItem('isCurator', USER_SECRET);
                }


                this.props.loginDialogHandler(res.data.curator, true);
                history.push('/account');
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.setState({
                        isCredentialsValid: false
                    })
                }
            });

    };

    render() {
        return (
            <div>
                <Dialog open={this.props.open}>
                    <DialogTitle id="form-dialog-title">Welcome!</DialogTitle>
                    <DialogContent>

                        {this.state.isCredentialsValid
                            ? null
                            : (
                                <Typography
                                    className="errorMessage"
                                    variant="subtitle1"
                                    color="inherit">
                                    User with this email/password doesn't exist
                                </Typography>
                            )
                        }

                        <TextField
                            onChange={(e) => {
                                this.handleLoginInput(e)
                            }}
                            autoFocus
                            margin="dense"
                            id="login"
                            label="Username or email"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            onChange={(e) => {
                                this.handlePasswordInput(e)
                            }}
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.loginDialogHandler}>
                            Cancel
                        </Button>

                        <Route render={({history}) => (
                            <Button color="primary" onClick={() => {
                                this.logIn(history)
                            }}>
                                Log In
                            </Button>
                        )}/>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default LogInDialog;

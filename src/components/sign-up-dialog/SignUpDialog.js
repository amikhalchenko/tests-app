import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import {Route} from "react-router-dom";

class SignUpDialog extends React.Component {

    state = {
        firstNameInput: '',
        lastNameInput: '',
        emailInput: '',
        passwordInput: '',
        passwordConfirmationInput: '',
        isEmailWrong: false,
        isPasswordWrong: false,
        emailInputLabel: 'Email',
        isPasswordTheSame: true,
        passwordInputLabel: 'Confirm password',
        isProblemsWithEmptyFields: false
    };

    registerUser = (history) => {

        if (
            this.state.firstNameInput.length === 0
            || this.state.lastNameInput.length === 0
            || this.state.emailInput.length === 0
            || this.state.passwordInput === 0
            || this.state.passwordConfirmationInput === 0
        ) {
            this.setState({
                isProblemsWithEmptyFields: true
            });

            return
        }

        const user = {
            firstName: this.state.firstNameInput,
            lastName: this.state.lastNameInput,
            email: this.state.emailInput,
            password: this.state.passwordInput,
            passwordConfirmation: this.state.passwordConfirmationInput
        };

        if (this.state.isPasswordTheSame) {

            axios.post('/registration', user)
                .then(res => {
                    const authToken = res.data.accessToken;
                    localStorage.setItem('auth-token', authToken);
                    axios.defaults.headers.common['auth-token'] = authToken;
                    this.props.signUpDialogHandler(true);
                    history.push('/account');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        this.setState({
                            isEmailWrong: true,
                            emailInputLabel: 'User with this email is already exist'
                        })
                    }
                });
        }

    };

    handleChangeFirstName = (event) => {
        this.setState({
            firstNameInput: event.target.value,
            isProblemsWithEmptyFields: false
        });
    };

    handleChangeLastName = (event) => {
        this.setState({
            lastNameInput: event.target.value,
            isProblemsWithEmptyFields: false
        });
    };

    handleChangeEmail = (event) => {
        this.setState({
            emailInput: event.target.value,
            isEmailWrong: false,
            emailInputLabel: 'Email',
            isProblemsWithEmptyFields: false
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            passwordInput: event.target.value,
            isProblemsWithEmptyFields: false
        });
    };

    handleChangePasswordConfirmation = (event) => {
        this.setState({passwordConfirmationInput: event.target.value}, () => {
            if (this.state.passwordInput !== this.state.passwordConfirmationInput) {
                this.setState({
                    isPasswordTheSame: false,
                    passwordInputLabel: 'Password is not the same',
                    isProblemsWithEmptyFields: false
                })
            } else {
                this.setState({
                    isPasswordTheSame: true,
                    passwordInputLabel: 'Confirm password',
                    isProblemsWithEmptyFields: false
                })
            }
        });

    };


    render() {
        return (
            <div>
                <Dialog open={this.props.open}>
                    <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                    <DialogContent>

                        {
                            this.state.isProblemsWithEmptyFields
                                ? (
                                    <Typography
                                        className="errorMessage"
                                        variant="subtitle1"
                                        color="inherit">
                                        It seems that you have unfilled fields...
                                    </Typography>
                                )
                                : null
                        }

                        <TextField
                            onChange={(e) => this.handleChangeFirstName(e)}
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            onChange={(e) => this.handleChangeLastName(e)}
                            margin="dense"
                            id="lastName"
                            label="Last name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            error={this.state.isEmailWrong}
                            onChange={(e) => this.handleChangeEmail(e)}
                            margin="dense"
                            id="email"
                            label={this.state.emailInputLabel}
                            type="email"
                            fullWidth
                        />
                        <TextField
                            onChange={(e) => this.handleChangePassword(e)}
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                        <TextField
                            error={!this.state.isPasswordTheSame}
                            onChange={(e) => this.handleChangePasswordConfirmation(e)}
                            margin="dense"
                            id="confirmPassword"
                            label={this.state.passwordInputLabel}
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.signUpDialogHandler}>
                            Cancel
                        </Button>
                        <Route render={({history}) => (
                            <Button color="primary" onClick={() => {
                                this.registerUser(history)
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

export default SignUpDialog;

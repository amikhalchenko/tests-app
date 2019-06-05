import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

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
        passwordInputLabel: 'Confirm password'
    };

    registerUser = () => {

        const user = {
            firstName: this.state.firstNameInput,
            lastName: this.state.lastNameInput,
            email: this.state.emailInput,
            password: this.state.passwordInput,
            passwordConfirmation: this.state.passwordConfirmationInput
        };

        axios.post('/registration', user)
            .then(res => {
                console.log(res);
                this.props.signUpDialogHandler();
            })
            .catch(err => {
                if (err.response.status === 400) {
                    this.setState({
                        isEmailWrong: true,
                        emailInputLabel: 'User with this email is already exist'
                    })
                }
            });

    };

    handleChangeFirstName = (event) => {
        this.setState({
            firstNameInput: event.target.value
        });
    };

    handleChangeLastName = (event) => {
        this.setState({
            lastNameInput: event.target.value
        });
    };

    handleChangeEmail = (event) => {
        this.setState({
            emailInput: event.target.value,
            isEmailWrong: false,
            emailInputLabel: 'Email'
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            passwordInput: event.target.value
        });
    };

    handleChangePasswordConfirmation = (event) => {
        this.setState({passwordConfirmationInput: event.target.value}, () => {
            if (this.state.passwordInput !== this.state.passwordConfirmationInput) {
                this.setState({
                    isPasswordTheSame: false,
                    passwordInputLabel: 'Password is not the same'
                })
            } else {
                this.setState({
                    isPasswordTheSame: true,
                    passwordInputLabel: 'Confirm password'
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
                        <Button color="primary" onClick={this.registerUser}>
                            Create Account
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default SignUpDialog;

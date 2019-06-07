import React from 'react';
import './UserAccount.css';
import UserAccountHeader from "../user-account-header/UserAccountHeader";
import PassedTest from "../passed-test/PassedTest";
import axios from 'axios';
import {Redirect} from "react-router-dom";

export default class UserAccount extends React.Component {

    state = {
        userAccount: {}
    };

    componentDidMount() {

        if (localStorage.getItem('auth-token') !== null) {
            axios.get('/account')
                .then(res => {
                    console.log(res);
                })
        }

    }

    render() {

        if (localStorage.getItem('auth-token') === null) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <UserAccountHeader/>
                <div className="userPassedTests">
                    {
                        // this.testsResults.map(test => {
                        //     return (
                        //         <PassedTest testInformation={test}/>
                        //     )
                        // })
                    }
                </div>
            </div>
        );
    }

}

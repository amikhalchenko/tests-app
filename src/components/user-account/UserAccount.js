import React from 'react';
import './UserAccount.css';
import PassedTest from "../passed-test/PassedTest";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import GroupItem from "../group-item/GroupItem";

export default class UserAccount extends React.Component {

    state = {
        account: null
    };

    componentDidMount() {

        if (localStorage.getItem('auth-token') !== null) {
            const requestUrl = this.props.isAdmin ? '/account/groups' : '/account';

            axios.get(requestUrl)
                .then(res => {
                    console.log(res);
                    this.setState({
                        account: res.data
                    });

                });

        }

    }

    render() {

        if (localStorage.getItem('auth-token') === null) {
            return <Redirect to='/'/>
        }

        if (this.state.account !== null && !this.props.isAdmin) {
            return (
                <div>
                    <div className="userPassedTests">
                        {
                            this.state.account.results.map((passedTest, index) => {
                                return (
                                    <PassedTest key={index} testInformation={
                                        {
                                            date: passedTest.date,
                                            topics: passedTest.topics,
                                            percentOfPassingQuiz: passedTest.percentOfPassingQuiz,
                                            difficulty: passedTest.difficulty,
                                            passed: passedTest.passed

                                        }

                                    }/>
                                )
                            })
                        }
                    </div>
                </div>
            );
        }

        if (this.state.account !== null && this.props.isAdmin) {
            return (
                <div className="userPassedTests">
                    {
                        this.state.account.map((group, index) => {
                            return (
                               <GroupItem group={group} key={index}/>
                            )
                        })
                    }
                </div>
            )
        }

        return (
            <div>
                <p>Loading...</p>
            </div>
        )

    }

}

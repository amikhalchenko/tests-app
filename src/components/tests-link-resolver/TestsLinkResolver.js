import React from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

export default class TestsLinkResolver extends React.Component {

    componentDidMount() {
        if (sessionStorage.getItem('auth-token') !== null) {
            axios.get('/questions/' + this.props.match.params.id)
                .then(res => {
                    this.props.history.push('/quiz', {
                        questionsFromLink: res.data.questions,
                        sessionId: res.data.quizSession.id,
                        countOfPassedQuestions: res.data.countOfPassedQuestions,
                        countOfQuestionsInQuiz: res.data.countOfQuestionsInQuiz,
                        passed: res.data.passed,
                    })
                });
        }
    }

    render() {
        if (sessionStorage.getItem('auth-token') === null) {
            return (
                <Redirect to="/"/>
            );
        }

        return (
            <div>
                Loading....
            </div>
        )
    }
}

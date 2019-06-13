import React from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import {decodeFromUserUrlToBase64} from "../../App";

export default class TestsLinkResolver extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('auth-token') !== null && !this.props.match.params.id.includes('guest')) {
            console.log('Auth');
            this.startQuiz('/questions/', this.props.match.params.id);
        } else {
            const topicsBase64 = decodeFromUserUrlToBase64(this.props.match.params.id);
            this.startQuiz('/quiz/', topicsBase64);
        }
    }

    startQuiz = (url, quizRequestParam) => {

                this.props.history.push('/quiz', {
                    curatorParamsId : this.props.match.params.id,
                    curatorTestLink : true,
                    // questionsFromLink: res.data.questions,
                    // sessionId: res.data.quizSession.id,
                    // countOfPassedQuestions: res.data.countOfPassedQuestions,
                    // countOfQuestionsInQuiz: res.data.countOfQuestionsInQuiz,
                    // passed: res.data.passed,
                    // existNewQuestions : res.data.existNewQuestions,

                })

    };

    render() {
        if (localStorage.getItem('auth-token') === null && !this.props.match.params.id.includes('guest')) {
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
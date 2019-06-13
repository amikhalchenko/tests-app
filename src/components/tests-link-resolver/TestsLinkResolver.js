import React from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

export default class TestsLinkResolver extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('auth-token') !== null && !this.props.match.params.id.includes('guest')) {
            this.startQuiz('/questions/', this.props.match.params.id);
        } else {
            const topicsStr = this.props.match.params.id.substring(6);
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
            const topicsBase64 = Buffer.from(JSON.stringify(topics)).toString('base64');
            console.log(Buffer.from(topicsBase64, 'base64').toString());
            this.startQuiz('/quiz/', topicsBase64);
        }
    }

    startQuiz = (url, quizRequestParam) => {
        axios.get(url + quizRequestParam)
            .then(res => {
                this.props.history.push('/quiz', {
                    questionsFromLink: res.data.questions,
                    sessionId: res.data.quizSession.id,
                    countOfPassedQuestions: res.data.countOfPassedQuestions,
                    countOfQuestionsInQuiz: res.data.countOfQuestionsInQuiz,
                    passed: res.data.passed,
                    existNewQuestions : res.data.existNewQuestions,

                })
            });
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

import React from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import {decodeTopicsFromUserUrlToBase64} from "../../App";

export default class TestsLinkResolver extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('auth-token') !== null && !this.props.match.params.id.includes('guest')) {
            this.startQuiz('/questions/', this.props.match.params.id);
        } else if (this.props.match.params.id.includes('guest')) {
            const topicsBase64 = decodeTopicsFromUserUrlToBase64(this.props.match.params.id);
            this.startQuiz('/quiz/', topicsBase64);
        } else {
            console.log('Good bye!!!');
        }
    }

    startQuiz = (url, quizRequestParam) => {

                this.props.history.push('/quiz', {
                    curatorParamsId : this.props.match.params.id,
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
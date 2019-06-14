import React, {Component} from 'react';
import Question from '../question/Question';
import TotalResultTesting from '../total-result-testing/TotalResultTesting';
import axios from 'axios';
import UpdateResultAlertDialog from '../update-result-alert-dialog/UpdateResultAlertDialog';
import ResultBySubjectsContainer from "../result-by-subjects/ResultBySubjectsContainer";
import DifficultyDialog from '../difficulty-dialog/DifficultyDialog'
import {withRouter, Route, Redirect} from 'react-router-dom';
import LinkAlreadyUsedDialog from "../link-already-used-dialog/LinkAlreadyUsedDialog";
import {decodeTopicsFromUserUrlToBase64} from "../../App";
import Spinner from "../spinner/spinner";


export default class TestPassing extends Component {

    state = {
        i: 0,
        isDataLoaded: false,
        questions: [],
        selectedTopics: [{id: 4}],
        sessionId: 0,
        isAlreadyPassed: false,
        restartTest: true,
        showResultBySubjects: false,
        currentNumberOfQuestion: 1,
        numberOfQuestions: 0,
        continueTestButton: false,
        isLinkTestAlreadyPassed: false,
        curatorParamsId: this.props.topics.curatorParamsId || undefined,
        unAuth: false,
    }
    postQuestion = () => {
        axios.post('/questions', this.props.topics)
            .then(res => {
                if (res.data.quizSession === null) {
                    this.setState({sessionId: undefined});
                } else {
                    console.log(res.data.sessionId === null);
                    this.setState((state) => {
                        state.currentNumberOfQuestion = res.data.countOfPassedQuestions + 1 || 1;
                        state.numberOfQuestions = res.data.countOfQuestionsInQuiz;
                        state.sessionId = res.data.quizSession.id;
                        state.isDataLoaded = true;
                        state.questions = res.data.questions;
                        state.isAlreadyPassed = res.data.passed;
                        state.continueTestButton = res.data.existNewQuestions;
                        return state;
                    });
                }
            });
    }
    nextQuestion = (questionId, answerId) => {
        axios.post('/quiz-answer', {quizSessionId: this.state.sessionId, answerId: answerId, questionId: questionId})
            .then(res => {
                this.setState((state) => {
                    state.i = state.i + 1;
                    state.currentNumberOfQuestion += 1;
                    return state;
                });
            })
            .catch(err => console.log(err))
    }
    showResultBySubjects = (value) => {
        this.setState((state) => {
            state.showResultBySubjects = value;
            return state;
        });
    }
    restartTest = (value) => {
        this.setState((state) => {
            state.restartTest = value;
            state.isAlreadyPassed = false;
            return state;
        }, () => axios.put('/quiz-answer', {id: this.state.sessionId})
            .then(res => console.log(res)));

    }
    continueTest = () => {
        axios.post('/quiz-session', {id: this.state.sessionId})
            .then(res => this.postQuestion());
    }

    componentDidMount() {
        console.log(this.props);
        if ( this.state.curatorParamsId === undefined ) {
            this.postQuestion();
        } else if ( this.state.curatorParamsId.includes('guest') ) {
            axios.get('/quiz/' + decodeTopicsFromUserUrlToBase64(this.state.curatorParamsId))
                .then(res => {
                    this.setState((state) => {
                        state.currentNumberOfQuestion = res.data.countOfPassedQuestions + 1 || 1;
                        state.numberOfQuestions = res.data.countOfQuestionsInQuiz;
                        state.questions = res.data.questions;
                        state.sessionId = res.data.quizSession.id;
                        state.isDataLoaded = true;
                        state.isAlreadyPassed = res.data.passed;
                        state.continueTestButton = res.data.existNewQuestions;
                        return state;
                    });
                });
        } else {

            axios.get('/questions/' + this.state.curatorParamsId)
                .then(res => {
                    this.setState((state) => {
                        state.currentNumberOfQuestion = res.data.countOfPassedQuestions + 1 || 1;
                        state.numberOfQuestions = res.data.countOfQuestionsInQuiz;
                        state.questions = res.data.questions;
                        state.sessionId = res.data.quizSession.id;
                        state.isDataLoaded = true;
                        state.isLinkTestAlreadyPassed = res.data.passed;
                        return state;
                    });
                })
                .catch((err) => {
                    this.setState((state)=>{
                        state.unAuth = true;
                    })
                });

        }

    }

    render() {
        if (this.state.sessionId === undefined || this.state.questions === null) {
            return (

                <React.Fragment>
                    <DifficultyDialog/>
                </React.Fragment>
            );
        } else {
            if (this.state.isDataLoaded === true) {
                if (this.state.showResultBySubjects === true) {
                    return (<ResultBySubjectsContainer sessionId={this.state.sessionId}
                                                       showResultBySubjects={this.showResultBySubjects}/>)
                } else if (this.state.questions[this.state.i] !== undefined) {
                    return (
                        (this.state.isLinkTestAlreadyPassed) ? <LinkAlreadyUsedDialog open={true}/> : <React.Fragment>
                            <Question currentNumberOfQuestion={this.state.currentNumberOfQuestion}
                                      numberOfQuestions={this.state.numberOfQuestions}
                                      question={this.state.questions[0 + this.state.i]}
                                      nextQuestion={this.nextQuestion}/>
                            <UpdateResultAlertDialog continueTest={this.continueTest}
                                                     continueTestButton={this.state.continueTestButton}
                                                     showResultBySubjects={this.showResultBySubjects}
                                                     restartTest={this.restartTest} open={this.state.isAlreadyPassed}/>
                        </React.Fragment>)
                } else {
                    return (
                        (this.state.curatorParamsId !== undefined && !this.state.curatorParamsId.includes('guest')) ? <Redirect to="/"/> :
                            <TotalResultTesting sessionId={this.state.sessionId}
                                                testsLinkDialogHandler={this.props.testsLinkDialogHandler}
                                                signUpDialogHandler={this.props.signUpDialogHandler}/>

                    );
                }

            } else {
                return (<div className="spinner"><Spinner/></div>)
            }
        }

    }
}


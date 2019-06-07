import React, {Component} from 'react';
import Question from '../question/Question';
import TotalResultTesting from '../total-result-testing/TotalResultTesting';
import axios from 'axios';
import UpdateResultAlertDialog from '../update-result-alert-dialog/UpdateResultAlertDialog';
import ResultBySubjects from "../result-by-subjects/ResultBySubjects";


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

    };
    nextQuestion = (questionId, answerId) => {
        console.log(this.props.topics)
        axios.post('/quiz-answer', {quizSessionId: this.state.sessionId, answerId: answerId, questionId: questionId})
            .then(res => {
                this.setState((state) => {
                    state.i = state.i + 1
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

    componentDidMount() {
        axios.post('/questions', this.props.topics.topics)
            .then(res => {
                this.setState((state) => {
                    state.sessionId = res.data.quizSession.id;
                    state.isDataLoaded = true;
                    state.questions = res.data.questions;
                    state.isAlreadyPassed = res.data.passed;
                    return state;

                });
            })
    }

    render() {
        if (this.state.isDataLoaded === true) {
            if(this.state.showResultBySubjects === true){
                console.log(this.state.showResultBySubjects);
                return (<ResultBySubjects sessionId={this.state.sessionId} showResultBySubjects={this.showResultBySubjects}/>)
            }
            else if (this.state.questions[this.state.i] !== undefined) {
                return (<React.Fragment>
                    <Question question={this.state.questions[0 + this.state.i]} nextQuestion={this.nextQuestion}/>
                    <UpdateResultAlertDialog showResultBySubjects={this.showResultBySubjects} restartTest={this.restartTest} open={this.state.isAlreadyPassed}/>
                </React.Fragment>)
            }

            else {
                return (<TotalResultTesting sessionId={this.state.sessionId}/>)
            }

        }
                        
        else {
            return(<div>Loading...</div>)
        }


    }
}

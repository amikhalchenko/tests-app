import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import './TotalResultTesting.css';
import axios from 'axios'
import { withRouter, Route } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

export default class TotalResultTesting extends Component {
    state = {
        isDataLoaded: false,
        totalPercent: 0,
        totalCountOfQuestions: 0,
        totalCountOfCorrectAnswers: 0,
        topics: []
    };


    componentDidMount() {
        axios.post('/result', {id: this.props.sessionId})
            .then(res => {
                const topics = res.data.topicResults.map(topicResult => topicResult.topic);
                this.setState({
                    totalPercent: res.data.percentOfPassingQuiz,
                    totalCountOfQuestions: res.data.countOfQuestion,
                    totalCountOfCorrectAnswers: res.data.countOfCorrectAnswers,
                    topics: topics
                });

            })
    }

    createLink = () => {
        const baseUrl = 'http://localhost:3000/questions/guest=';
        const urlForUser = this.state.topics
            .map(topic => topic.name + '^' + topic.id)
            .map(topic => topic.replace(' ', '_'))
            .map(topic => topic.replace('/', '&'))
            .reduce((reducer, currentValue) => reducer + '+' + currentValue);

        this.props.testsLinkDialogHandler(baseUrl + urlForUser);
    };

    render() {
        return (
            <div className="totalResult">
                <div
                    className="number">{this.state.totalCountOfCorrectAnswers} of {this.state.totalCountOfQuestions}</div>
                <div className="percent">{(this.state.totalPercent).toFixed(2)}%</div>
                <div className="more">
                    <Route render={({history}) => (
                        <Button color="secondary" onClick={() => {
                            history.push('/detailed-result',
                                this.props.sessionId
                            )
                        }}>
                            More
                        </Button>
                    )}/>

                    <Typography variant="subtitle1" color="inherit">
                        You can share the tests with your friends
                    </Typography>
                    <Button onClick={this.createLink}>Share Link</Button>

                </div>
            </div>

        );
    }
}
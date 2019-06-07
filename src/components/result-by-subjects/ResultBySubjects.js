import React, {Comonent, Component} from 'react';
import './ResultBySubjects.css';
import axios from 'axios';

export default class ResultBySubjects extends Component {

    state = {
        topicsResult: [],
    }

    componentDidMount() {
        console.log(this.props.sessionId);
        axios.post('/result', {id: this.props.sessionId})
            .then((res) => {
                this.setState((state) => {
                    state.topicsResult = res.data.topicResults
                    return state;
                });
            });
    }

    render() {
        console.log(this.state.topicsResult)
        return (
            <div className="result">
                {
                    this.state.topicsResult.map((element) => {
                        console.log(element)
                        return <ul>
                            <li>{element.topic.name}</li>
                            <li>{element.numberOfCorrectAnswers} of {element.numberOfQuestions}</li>
                            <li>{(element.result).toFixed(2)}%</li>
                        </ul>
                    })
                }
            </div>
        );
    }

}
import React, {Comonent, Component} from 'react';
import './ResultBySubjects.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default class ResultBySubjectsCards extends Component {


    render() {

        console.log(this.props.topicsResult.result);
        return (
            <div className="resultByTopics">
                <div className="result">
                    {
                        this.props.topicsResult.map((element) => {

                            return (element.numberOfQuestions !== 0) ? <div className="topic">
                                <ul>
                                    <li>{element.topic.name}</li>
                                    <li>{element.numberOfCorrectAnswers} of {element.numberOfQuestions}</li>
                                    <li>{(element.result).toFixed(2)}%</li>
                                </ul>
                            </div> : null

                        })
                    }

                </div>
                <Button className="startPageButton" variant="contained" href="/">
                    Start page
                </Button>
            </div>
        );
    }

}
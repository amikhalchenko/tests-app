import React from 'react';
import './PassedTest.css';
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {Route} from 'react-router-dom';
import {encodeTopicsToUserUrl} from "../../App";


export default class PassedTest extends React.Component {

    formatDate = () => {
        const date = new Date(this.props.testInformation.date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let topic = {
            topics: this.props.testInformation.topics,
            difficulty: "Просте",
        }

        return (
            <div className="passedTest">
                <Card>
                    <CardContent>
                        <Typography className="date" variant="subtitle1" color="inherit">
                            {this.formatDate()}
                        </Typography>
                        <div className="topics">
                            {
                                this.props.testInformation.topics.map((topic) => {
                                    const red = Math.floor(Math.random() * 255);
                                    const green = Math.floor(Math.random() * 255);
                                    const blue = Math.floor(Math.random() * 255);
                                    const rgb = `${red},${green},${blue}`;

                                    return (
                                        <Chip className="chip"
                                              label={topic.name}
                                              style={{
                                                  backgroundColor: "rgb(" + rgb + ")",
                                                  color: 'white',
                                                  paddingRight: '5px'
                                              }}
                                              key={topic.name}
                                        />
                                    )
                                })
                            }
                        </div>
                        {
                            (this.props.testInformation.passed === true)
                                ? (
                                    <div className="results">
                                        <Typography className="rightAnswersPercentage" variant="subtitle1" color="inherit">
                                            Right answers:
                                        </Typography>
                                        <Typography className="rightAnswersPercentage" variant="subtitle1" color="inherit">
                                            {Math.floor(this.props.testInformation.percentOfPassingQuiz * 100) / 100 + '%'}
                                        </Typography>
                                        <Button onClick={() => {
                                            this.props.testsLinkDialogHandler(encodeTopicsToUserUrl(this.props.testInformation.topics));
                                        }}>
                                            Share Link
                                        </Button>
                                    </div>
                                )
                                : (
                                    <div className="results">
                                        <Route render={({history}) => (
                                            <Button color="primary" onClick={() => {
                                                history.push('/quiz',
                                                    topic
                                                )
                                            }}>
                                                Continue Test
                                            </Button>
                                        )}/>
                                    </div>
                                )
                        }

                    </CardContent>
                </Card>
            </div>
        );
    }
}

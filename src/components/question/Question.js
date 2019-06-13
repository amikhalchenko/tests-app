import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import QuizTimeLine from '../quiz-time-line/QuizTimeLine';


import './Question.css'

export default class Question extends Component {
    state = {
        value: '',
        answerId: 0,
    }


    handleChange = (event) => {
        this.props.question.answers.forEach((element) => {
            if (event.target.value === element.name) {
                this.setState({answerId: element.id});
            }

        })

        this.setState({value: event.target.value});
    }

    nextQuestion = () => {

        if (this.state.value !== '') {
            this.setState((state) => {
                state.value = '';
            }, () => this.props.nextQuestion(this.props.question.id, this.state.answerId));


        }
    }

    render() {

        const {id, name, difficulty, topic, answers} = this.props.question;
        return (
            <div className="test">
                <QuizTimeLine currentNumberOfQuestion={this.props.currentNumberOfQuestion} numberOfQuestions={this.props.numberOfQuestions} />
                <FormControl component="fieldset">
                    <FormLabel component="legend" className="question-name form">{name}</FormLabel>
                    <RadioGroup
                        value={this.state.value}
                        onChange={this.handleChange}
                    >{
                        answers.map((element, i) => {
                            return <FormControlLabel value={`${element.name}`} control={<Radio/>} label={element.name} key={i}/>
                        })
                    }
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" color="primary" className="submit-ansver-button" onClick={this.nextQuestion}>
                    ANSWER
                </Button>
            </div>
        );

    }
}
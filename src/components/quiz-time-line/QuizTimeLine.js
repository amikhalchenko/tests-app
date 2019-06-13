import React, {Component} from 'react';
import './QuizTimeLine.css'

export default class QuizTimeLine extends Component {


    render() {
        console.log(this.props.currentNumberOfQuestion);
        console.log(this.props.numberOfQuestions);

        var quiz_timeline__number = [];
        for(var i = 1; i < this.props.currentNumberOfQuestion; i++){
            quiz_timeline__number.push(<div className="num_for_timeline">{i}</div>);
        }

        quiz_timeline__number.push(<div className="quiz_timeline__number_current num_for_timeline_">{this.props.currentNumberOfQuestion}</div>);

        for (var i = this.props.currentNumberOfQuestion + 1; i <= this.props.numberOfQuestions; i++) {
            quiz_timeline__number.push(<div className="num_for_timeline_">{i}</div>);
        }
        return <div className="quiz_timeline">{quiz_timeline__number}</div>;

    }
                                       
}

import React from 'react';
import './GroupParticipant.css'

export default class GroupParticipant extends React.Component {

    user;

    constructor(props) {
        super(props);

        this.user = this.props.user;
    }

    render() {
        return (
            <div className="user">
                <div className="userData">Name: {this.user.firstName}</div>
                <div className="userData">Surname: {this.user.lastName}</div>
                <div
                    className="userData">Result: {(this.user.quizResultDto.percentOfPassingQuiz).toFixed(2) + '%'}</div>
                <div className="userData">Email: {this.user.email}</div>
                {

                    this.user.quizResultDto.topics.map((element) => {
                        return <div className="userData"> {element.name}</div>
                    })
                }
            </div>);
    }
}

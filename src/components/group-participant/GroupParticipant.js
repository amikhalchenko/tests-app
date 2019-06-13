import React from 'react';

export default class GroupParticipant extends React.Component {

    user;

    constructor(props) {
        super(props);

        this.user = this.props.user;
    }

    render() {
        return (
            <div>
                {this.user.firstName + ' ' + this.user.lastName}
                {': ' + this.user.quizResultDto.percentOfPassingQuiz + '%'}
            </div>
        );
    }
}

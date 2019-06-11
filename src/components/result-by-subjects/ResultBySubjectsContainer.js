import React, {Component} from 'react';
import axios from 'axios';
import ResultBySubjectsCards from "./ResultBySubjectsCards";
import Switch from '@material-ui/core/Switch';
import ResultBySubjectsGraph from "./ResultBySubjectsGraph";


export default class ResultBySubjectsContainer extends Component {

    state = {
        sessionId: 0,
        topicsResult: [],
        IsCarards: false,
    }

    componentDidMount() {

        this.setState((state) => {
            state.sessionId = this.props.sessionId;
        }, () => {
            axios.post('/result', {id: this.state.sessionId})
                .then((res) => {
                    this.setState((state) => {
                        state.topicsResult = res.data.topicResults
                        return state;
                        console.log(this.state.topicsResult)
                    });
                });
        });
    }
    switchHandleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    render() {

        // if (this.state.isCards === true){
        //
        //     return (
        //         <ResultBySubjectsCards topicsResult={this.state.topicsResult}/>
        //     )
        //
        // }
        // else {
        //     return (
        //         <ResultBySubjectsGraph topicsResult={this.state.topicsResult}/>
        //     );
        // }

        return (
            <div className = "stats">
                <Switch
                    checked={this.state.isCards}
                    onChange={this.switchHandleChange('IsCarards')}
                    value="IsCarards"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />

            {

                this.state.IsCarards
                    ? (
                        <ResultBySubjectsGraph topicsResult={this.state.topicsResult}/>
                    )
                    : (
                        <ResultBySubjectsCards topicsResult={this.state.topicsResult}/>
                    )
            }
            </div>


        )

    }
}

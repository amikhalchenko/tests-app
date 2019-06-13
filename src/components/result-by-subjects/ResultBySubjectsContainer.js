import React, {Component} from 'react';
import axios from 'axios';
import ResultBySubjectsCards from "./ResultBySubjectsCards";
import Switch from '@material-ui/core/Switch';
import ResultBySubjectsGraph from "./ResultBySubjectsGraph";
import './ResultBySubjectsContainer.css'


export default class ResultBySubjectsContainer extends Component {

    state = {
        sessionId: 0,
        topicsResult: [],
        isCards: true,
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
    switchHandleChange = () => {
        this.setState( (state)=>{
            state.isCards = !state.isCards;
            return state
        });
    };

    render() {
        console.log(this.state.isCards)
        return (
            <div>
                <div className = "test-result">
                    <p>Statistic presentation</p>
                    <Switch
                        checked={this.state.isCards}
                        onChange={this.switchHandleChange}
                        value={this.state.isCards}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </div>

            {

                this.state.isCards
                    ? (
                        <ResultBySubjectsCards topicsResult={this.state.topicsResult}/>
                    )
                    : (
                        <ResultBySubjectsGraph topicsResult={this.state.topicsResult}/>
                    )
            }
            </div>


        )

    }
}

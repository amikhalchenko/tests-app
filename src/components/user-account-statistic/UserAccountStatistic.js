import React from 'react';
import ResultBySubjectsGraph from "../result-by-subjects/ResultBySubjectsGraph";
import axios from "axios";

export default class UserAccountStatistic extends React.Component {
    state = {
        topicsResult: [],
        isDataLoaded: false,
    }

    componentDidMount() {
        axios.get('/account/statistic')
            .then(res => {
                console.log(res);
                this.setState((state) => {
                    state.topicsResult = res.data;
                    state.isDataLoaded = true;
                    return state;
                });
            });
    }

    render() {

        return ((this.state.isDataLoaded) ?
            <div>
                <ResultBySubjectsGraph
                    topicsResult={this.state.topicsResult}/>
            </div> :
            <div>loading...</div>)

    }
}

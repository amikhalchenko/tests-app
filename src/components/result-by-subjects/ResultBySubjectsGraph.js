import React, {Component} from 'react';
import './ResultBySubjectsGraph.css';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class ResultBySubjectsGraph extends Component {
    state = {
        theme: "white",
        title: {
            text: "Result by topics"
        },
        axisY: {
            maximum: 100
        },
        dataPointWidth: 50,
        data: [{
            type:"column",
            dataPoints: []
        }]
    }
    componentWillMount() {

        console.log(this.props);
        this.props.topicsResult.forEach((element) => {
            this.setState((state)=>{
                state.data[0].dataPoints.push({
                    label:element.topic.name,
                    y: Math.floor(element.result),
                });
            }) ;
        });
    }

    render() {
        console.log(this.state);
        return(
            <div className = "chart">
                <CanvasJSChart options = {this.state}/>
            </div>
        )
    }
}
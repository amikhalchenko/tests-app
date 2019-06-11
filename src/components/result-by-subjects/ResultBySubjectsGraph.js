import React, {Component} from 'react';
import './ResultBySubjectsGraph.css';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class ResultBySubjectsGraph extends Component {
    state = {
        theme: "dark2",
        title: {
            text: "Result by topics"
        },
        data: [{
            type:"column",
            dataPoints: []
        }]
    }
    componentWillMount() {
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
        // const options = {
        //     animationEnabled: true,
        //     theme: "dark2",
        //     title: {
        //         text: "Result by topics"
        //     },
        //     data: [{
        //         type: "column",
        //         dataPoints: [
        //             {label: "Бази даних", y: 33},
        //             {label: "Алгоритми", y: 50},
        //             {label: "ООП", y: 100}
        //         ]
        //     }]
        // }
        console.log(this.state);
        return(
            <div>
                <CanvasJSChart options = {this.state}/>
            </div>
        )
    }
}
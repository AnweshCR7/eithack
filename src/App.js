import React, { Component } from 'react';
import { render } from 'react-dom';
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
import ButtonAppBar from './AppBar'
import FloatingActionButtons from './FloatingActionButtons'
import { AppBar } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      realData2: [],
      predictionData:[],
      day: 1,
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        chart: {
          type: 'areaspline'
        },
        title: {
          text: 'Energy consumption based on an Activity Index (Motion, ShoppingCart-API, Reciept-API)'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
        xAxis: {
          title:{
            text: 'Time of Day'
          },
          categories: [''],
        },
        yAxis: {
          title: {
              text: 'Energy Consumption'
          }
        },
        series: [
          { name: "Analysis", data: [] }
        ]
      },
      chartOptions2: {
        chart: {
          type: 'areaspline'
        },
        title: {
          text: 'General Energy consumption'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
        xAxis: {
          title:{
            text: 'Time of Day'
          },
          categories: [''],
        },
        yAxis: {
          title: {
              text: 'Energy Consumption'
          }
        },
        series: [
          { name: "Without Awareness" ,data: [], color: "#aeb7ba" }
        ],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            }
          }
        }
      },
      chartOptionsP: {
        chart: {
          type: 'areaspline'
        },
        
        title: {
          text: 'Energy Efficient Usage Pattern (Comparison)'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
        xAxis: {
          title:{
            text: 'Time of Day'
          },
          categories: [''],
        },
        yAxis: {
          title: {
              text: 'Energy Consumption'
          }
        },
        series: [
          { name: 'With Awareness', data: [], color: '#00d680' },
          { name: 'Without Awareness', data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], color: '#ffc3c3', fillOpacity: 0.10 }
        ],
        plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      },
      },
      hoverData: null
    };
  }

  componentDidMount() {
    // axios.get(`http://10.100.50.142:8080/api/getDay`)
    // .then(res => {
    //   this.setState({day: res.data.day});
    // })
  }
  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }
  getdata = (i, day) =>{
    if(i === 26)
      return 
    else {
      axios.get(`http://192.168.43.2:8080/api/getRealData?time=${i}&day=${day}`)
      //axios.get(`https://reqres.in/api/users/2`)
      .then(res => {
        var data = []
        data = res.data.motionSensor;
        var data2 = this.state.realData2
        data2.push(1)
        //data.push(Math.random()*i)
        //console.log(data2)
        // let k = 0;
        for(let k = 0; k < data.length; k++)
          data[k] = parseInt(data[k])
        this.setState({realData: data, realData2: data2}, this.updateSeries());
        setTimeout(function(){this.getdata(++i, day)}.bind(this), 1000)
      })
    }
  }

  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({
      chartOptions: {
        series: [
          { data: this.state.realData}
        ]
      },
      chartOptions2: {
        series: [
          { data: this.state.realData2}
        ]
      },
      chartOptionsP: {
        series: [
          { name: 'Predicted', data: this.state.predictionData },
          { name: 'General', data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] }
        ]
      }
    });
  }

  recordGraph = () => {
    var day = this.state.day;
    this.getdata(1, '1')
  }
  getdataPrediction = (i) =>{
    if(i === 26)
      return 
    else {
      //axios.get(`http://192.168.43.2:8080/api/getRealData?time=${i}&day=${day}`)
      axios.get(`https://reqres.in/api/users/2`)
      .then(res => {
        var data = this.state.predictionData;
        // for(let a = 1; a <= i; a++)
        data.push(Math.random())
        console.log(data)
        this.setState({predictionData: data}, this.updateSeries())
        //console.log(i)
        i++
        setTimeout(function(){this.getdataPrediction(i)}.bind(this), 2000)
      })
    }
  }

  playPrediction = () => {
    var day = this.state.day;
    this.getdataPrediction(1)
  }



  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
        <ButtonAppBar/>
        <br/>
        <div>
          {/* <div>
            <br/>
          <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptionsP}
              />
            <FloatingActionButtons type = "play" btnClick={this.playPrediction.bind(this)}/>
          </div> */}
          <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
              />
          </div>
          <FloatingActionButtons type = "record" btnClick={this.recordGraph.bind(this)}/>
          <div style={{marginTop: "5px"}}>
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptions2}
              />
          </div>
        </div>
      </div>
    )
  }
}
export default App;

//render(<LineChart />, document.getElementById('root'));
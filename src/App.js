import React, { Component } from 'react';
import { render } from 'react-dom';
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
import ButtonAppBar from './AppBar'
import FloatingActionButtons from './FloatingActionButtons'
import { Switch } from '@material-ui/core';
//import btn from './Button'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      realData2: [],
      predictionData:[],
      predictionChartData: [],
      switch: true,
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
          { name: "Analysis", data: [], color: "#03a9f4" }
        ],
        plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      }

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
          areaspline: {
              fillOpacity: 0
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
          { name: 'Predicted', data: this.state.predictionChartData },
          { name: 'General', data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] }
        ]
      }
    });
  }

  recordGraph = () => {
    var day = this.state.day;
    this.getdata(1, '20')
  }
  getdataPrediction = (i) =>{
    if(i === 26)
      return 
    else {
      
      //axios.get(`https://reqres.in/api/users/2`)
        var data = this.state.predictionData.slice(0,i)
        // for(let a = 1; a <= i; a++)
       // data = data.slice(0,i)
        console.log(data)
        this.setState({predictionChartData: data}, this.updateSeries())
        //console.log(i)
        i++
        setTimeout(function(){this.getdataPrediction(i)}.bind(this), 1000)
    }
  }

  showPrediction = () => {
      axios.get(`http://192.168.43.2:8080/api/getPredictedData`).then(data => {
      var extrapol_data = data.data.prediction
      extrapol_data.push(0.6666666666666666, 0.3333333333333333, 0, 0.3333333333333333, 0, 0);
      console.log(extrapol_data);
      this.setState({predictionData: extrapol_data}, this.getdataPrediction(1))
    })
  }

  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
        <ButtonAppBar/>
        <br/>
        <Switch checked={this.state.switch} onClick={()=>this.setState({switch: !this.state.switch})} value="Switch" />
        <label>Switch Charts</label>
        <div>
          {/* <div>btn</div> */}
          { this.state.switch && <div>
            <br/>
          <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptionsP}
              />
            <FloatingActionButtons type = "play" btnClick={this.showPrediction.bind(this)}/>
          </div>}
          { this.state.switch == false &&<div>
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
          </div>}
        </div>
      </div>
    )
  }
}
export default App;

//render(<LineChart />, document.getElementById('root'));
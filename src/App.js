import React, { Component } from 'react';
import { render } from 'react-dom';
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realData: [],
      realData2: [],
      day: 0,
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        title: {
          text: 'Energy consumption based on motion'
        },
        xAxis: {
          categories: [],
        },
        series: [
          { data: [] }
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
      chartOptions2: {
        title: {
          text: 'General Energy consumption'
        },
        xAxis: {
          categories: [],
        },
        series: [
          { data: [] }
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
    if(i === 20)
      return 
    else {
      //axios.get(`http://10.100.50.142:8080/api/getRealData?time=${1}&day=${day}`)
      axios.get(`https://reqres.in/api/users/2`)
      .then(res => {
        var data = []
        //data = res.data.motionSensor;
        var data2 = this.state.realData2
        data2.push(1)
        data.push(Math.random()*i)
        console.log(data2)
        this.setState({realData: data, realData2: data2}, this.updateSeries())
        //console.log(i)
        i++
        setTimeout(function(){this.getdata(i)}.bind(this), 1000)
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
      }
    });
  }

  recordGraph = () => {
    var day = this.state.day;
    this.getdata(1, day)
  }

  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />
          {/* <h3>Hovering over {hoverData}</h3> */}
          <button onClick={this.recordGraph.bind(this)}>Record</button>
        </div>
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.chartOptions2}
            />
          {/* <h3>Hovering over {hoverData}</h3> */}
          {/* <button onClick={this.recordGraph.bind(this)}>Record</button> */}
        </div>
      </div>
    )
  }
}
export default App;

//render(<LineChart />, document.getElementById('root'));
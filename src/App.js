import React, { Component } from 'react';
import barChartLogo from './barchart.png';
import lineChartLogo from './linechart.png';
import './App.css';
import _ from 'lodash';
import PptxGenJS from 'pptxgenjs';
const pptx = new PptxGenJS();
pptx.setBrowser(true);

class App extends Component {
  constructor() {
    super();
    const monthlyData = [
      { month: 'January', highTemp: 21, lowTemp: 7 },
      { month: 'February', highTemp: 24, lowTemp: 10 },
      { month: 'March', highTemp: 30, lowTemp: 15 },
      { month: 'April', highTemp: 36, lowTemp: 21 },
      { month: 'May', highTemp: 41, lowTemp: 27 },
      { month: 'June', highTemp: 40, lowTemp: 29 },
      { month: 'July', highTemp: 35, lowTemp: 27 },
      { month: 'August', highTemp: 34, lowTemp: 26 },
      { month: 'September', highTemp: 34, lowTemp: 25 },
      { month: 'October', highTemp: 35, lowTemp: 19 },
      { month: 'November', highTemp: 29, lowTemp: 12 },
      { month: 'December', highTemp: 23, lowTemp: 8 }
    ];
    let chartConfigOptions = {
      x: 0.5, y: 1.1, w: 10, h: 5.5,
      showTitle: true,
      titlePos: { x: -100, y: 10 },
      title: 'Average monthly temperature ranges of an Indian City',
      titleColor: '002960',
      titleFontFace: 'Arial',
      titleFontSize: 16,
      // titleAlign: 'left', // text align the title towards left
      shadow: 'none',
      // showDataTable: true, // to show the data in a tabular form
      // showDataTableOutline:true, // to show the outline for the tabular data
      showPercent: true,
      showLegend: true,
      legendPos: 't',
      legendFontSize: 13,
      legendColor: '000000',
      border: { pt: '1', color: 'f1f1f1' },
      fill: 'ffffff',
      axisLineColor: '666666',
      catAxisLabelColor: '666666',
      catAxisLineShow: false,
      valAxisHidden: false,
      valAxisLabelColor: '666666',
      valAxisLabelFontSize: 12,
      valAxisLineShow: false,
      valAxisMaxVal: 50,
      valAxisMinVal: 0,
      valGridLine: { size: 1, color: '666666', style: 'dot' },
      catGridLine: 'none',//{ size: 1, color: '666666', style: 'dot' },
      showValAxisTitle: true,
      valAxisTitle: 'Temperature (degree Celsius)',
      valAxisTitleFontSize: 14,
      valAxisTitleFontFace: 'Arial',
      valAxisTitleColor: '3b73b3'
    };
    this.state = { data: monthlyData, chartConfigOptions };
  }

  createLineChart() {
    let labels = _.map(this.state.data, obj => obj.month);
    pptx.setLayout('LAYOUT_WIDE');
    let slide = pptx.addNewSlide();
    let highTempData = {
      type: pptx.charts.LINE,
      data: [{
        name: 'Average high temperature in celsius',
        labels,
        values: _.map(this.state.data, data => data.highTemp)
      }],
      options: { lineDataSymbol: 'triangle', chartColors: ['ff0000'], lineSize: 3, lineDataSymbolSize: 9 }
    }
    let lowTempData = {
      type: pptx.charts.LINE,
      data: [{
        name: 'Average low temperature in celsius',
        labels,
        values: _.map(this.state.data, data => data.lowTemp)
      }],
      options: { lineDataSymbol: 'circle', chartColors: ['0000aa'], lineSize: 3, lineDataSymbolSize: 9 }
    }
    let allLines = [highTempData, lowTempData];
    slide.addChart(allLines, this.state.chartConfigOptions);
    pptx.save('sample-line-chart');
  }

  createBarChart() {
    let labels = _.map(this.state.data, obj => obj.month);
    pptx.setLayout('LAYOUT_WIDE');
    let slide = pptx.addNewSlide();
    let highTempDataObject = {
      name: 'Average high temperature in celsius',
      labels,
      values: _.map(this.state.data, data => data.highTemp),
      options: { valueBarColors: true }
    }
    let lowTempDataObject = {
      name: 'Average low temperature in celsius',
      labels,
      values: _.map(this.state.data, data => data.lowTemp),
      options: { valueBarColors: true }
    }
    let chartColors = ['ff0000', '0000aa'];
    let chartOptions = _.cloneDeep(this.state.chartConfigOptions);
    chartOptions.chartColors = chartColors;
    chartOptions.catGridLine = { size: 1, color: '666666', style: 'dot' };
    let allBars = [highTempDataObject, lowTempDataObject];
    slide.addChart(pptx.charts.BAR, allBars, chartOptions);
    pptx.save('sample-bar-chart');
  }

  getMonthlyTempTableRows() {
    let monthlyData = this.state.data;
    return _.map(monthlyData, ({ month, highTemp, lowTemp }) => {
      return (
        <tr>
          <td>{month}</td>
          <td>{highTemp}</td>
          <td>{lowTemp}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <div>Select any of the following chart type to export data in a powerpoint presentation slide !</div>
        </div>
        <div className="app__download">
          <div className="app__download__card" onClick={() => this.createLineChart()}>
            <div><img className="app__download__card__image" src={lineChartLogo} /></div>
            <div className="app__download__card__text">Download Line chart</div>
          </div>
          <div className="app__download__card" onClick={() => this.createBarChart()}>
            <div><img className="app__download__card__image" src={barChartLogo} /></div>
            <div className="app__download__card__text">Download Bar chart</div>
          </div>
        </div>
        <div className="app__data-table">
          <table>
            <tr>
              <th>Month</th>
              <th>Average high temperature in celsius</th>
              <th>Average low temperature in celsius</th>
            </tr>
            {this.getMonthlyTempTableRows()}
          </table>
        </div>
      </div>
    );
  }
}

export default App;

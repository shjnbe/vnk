import React from 'react'
import { processColor } from 'react-native'
import { BarChart } from 'react-native-charts-wrapper'
import projectApi from '../../../api/projectApi'
import * as _ from 'lodash'
import DATA from '../../../containers/projects/data-task'

export default class KpiChart extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      values: [],
      categories: []
    }
  }

  getData () {
    const data = {
      config: {
        barWidth: 0.8
      }
    }

    if (_.size(this.state.values) > 0) {
      data.dataSets = [
        {
          values: this.state.values,
          label: '',
          config: {
            color: processColor('#b5262c'),
            barShadowColor: processColor('red'),
            highlightAlpha: 90,
            highlightColor: processColor('#b5262c')
          }
        }
      ]
    }

    return data
  }


  async componentDidMount () {
    
    if (this.props.teamId) {
      const obj = _.keyBy(DATA, 'status_code')
      const data = await projectApi.statisticCost(this.props.teamId)
      const ls = _.get(data, 'stat', [])
      const values = _.map(ls, ({cost_total}) => ({y: cost_total}))
      const categories = _.map(ls, ({status_code}) => _.get(obj, [status_code, 'label'], `${status_code}`))
      this.setState({values, categories})
    }
  }

  render () {
    return (
      <BarChart
        style={{
          height: 220,
          marginTop: this.props.marginTop,
          marginLeft: 16,
          marginRight: 16
        }}
        data={this.getData()}
        xAxis={{
          valueFormatter: this.state.categories,
          granularityEnabled: true,
          granularity: 1,
          position: 'BOTTOM',
          centerAxisLabels: false,
          labelRotationAngle: 70
        }}
        yAxis={{right: { enabled: false }}}
        animation={{ durationX: 2000 }}
        legend={{ enabled: false }}
        gridBackgroundColor={processColor('#ffffff')}
        visibleRange={{ x: { min: 5, max: 5 } }}
        drawBarShadow={false}
        drawValueAboveBar
        drawHighlightArrow
        chartDescription={{ text: '' }}
        pinchZoom={false}
        scaleYEnabled={false}
        scaleXEnabled={false}
      />
    )
  }
}

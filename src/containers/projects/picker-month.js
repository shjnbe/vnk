import React from 'react'
import { Picker, Icon, Header, Left, Title, Body, Right } from 'native-base'
import moment from 'moment'
import { isEqual } from 'lodash'
import mypStyles from '../../themes/myp-styles'

export default class PickerMonth extends React.Component {
  constructor (props) {
    super(props)
    this.months = []
    for (let i = 0; i <= moment().month(); i++) {
      this.months.push(
        moment()
          .subtract(i, 'months')
          .format('MMM')
      )
    }
    this.state = { monthCurrent: props.monthCurrent }
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.monthCurrent, nextProps.monthCurrent)) {
      this.setState({ monthCurrent: nextProps.monthCurrent })
    }
  }

  renderHeader = backAction => {
    return (
      <Header transparent style={mypStyles.styleHeader}>
        <Body>
          <Title style={{ color: '#333' }}>Chọn tháng</Title>
        </Body>
        <Right>
          <Icon name='x' type='Feather' style={{color: 'red', fontSize: 30}} onPress={() => backAction()} />
        </Right>
      </Header>
    )
  }

  render () {
    return (
      <Picker
        mode='dropdown'
        iosHeader='Chọn tháng'
        iosIcon={<Icon name='chevron-down' type='Feather' />}
        style={{ width: undefined }}
        selectedValue={this.state.monthCurrent}
        onValueChange={monthCurrent => {
          this.props.onValueChange(monthCurrent)
          this.setState({ monthCurrent })
        }}
        renderHeader={this.renderHeader}
      >
        {this.months.map(month => (
          <Picker.Item label={month} key={month} value={month} />
        ))}
      </Picker>
    )
  }
}

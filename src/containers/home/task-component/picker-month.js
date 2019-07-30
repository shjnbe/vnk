import React from 'react'
import { Picker, Icon, Header, Left, Title, Body, DatePicker } from 'native-base'
import moment from 'moment'
import { isEqual } from 'lodash'
import mypStyles from 'themes/myp-styles'

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
    this.state = { value: props.value }
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.value, nextProps.value)) {
      this.setState({ value: nextProps.value })
    }
  }

  renderHeader = () => {
    return (
      <Header transparent style={mypStyles.styleHeader}>
        <Left />
        <Body>
          <Title style={{ color: '#333' }}>Chọn tháng</Title>
        </Body>
      </Header>
    )
  }

  render () {
    return (
      // <Picker
      //   mode='dropdown'
      //   iosHeader='Chọn tháng'
      //   iosIcon={<Icon name='chevron-down' type='Feather' />}
      //   style={{ width: undefined }}
      //   selectedValue={this.state.monthCurrent}
      //   onValueChange={monthCurrent => {
      //     this.props.onValueChange(monthCurrent)
      //     this.setState({ monthCurrent })
      //   }}
      //   renderHeader={this.renderHeader}
      // >
      //   {this.months.map(month => (
      //     <Picker.Item label={month} key={month} value={month} />
      //   ))}
      // </Picker>
      <DatePicker
        defaultDate={this.state.value}
        locale='vi'
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType='fade'
        // placeHolderText="Select date"
        // textStyle={{ color: "green" }}
        placeHolderTextStyle={{ color: "#d3d3d3" }}
        onDateChange={this.props.onValueChange}
      />
    )
  }
}

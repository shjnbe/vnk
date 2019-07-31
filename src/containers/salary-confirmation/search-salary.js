import React from 'react'
import { Picker, Icon, Header, Title, Body, Right, View } from 'native-base'
import moment from 'moment'
import { isEqual } from 'lodash'
import mypStyles from '../../themes/myp-styles'
import styled from 'styled-components/native'

const Row = styled(View)` flexDirection: row justifyContent: flex-start alignItems: center paddingLeft: 16 paddingVertical: 12`
const PickerView = styled(Picker)` width: null height: 30 borderWidth: 0.5 borderColor: #2196f3 marginLeft: 16`

export default class PickerMonth extends React.Component {
  constructor(props) {
    super(props)
    this.months = []
    for (let i = 0; i <= moment().month(); i++) {
      this.months.push(
        moment()
          .subtract(i, 'months')
          .format('MM/YYYY')
      )
    }
    this.state = { monthCurrent: props.monthCurrent }
  }

  componentWillReceiveProps(nextProps) {
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
          <Icon name='x' type='Feather' style={{ color: 'red', fontSize: 30 }} onPress={() => backAction()} />
        </Right>
      </Header>
    )
  }

  render() {
    return (
      <Row>
        <Icon name='search' type='Feather' style={{ fontSize: 24 }} />
        <PickerView
          mode='dropdown'
          iosHeader='Chọn tháng'
          iosIcon={<Icon name='chevron-down' type='Feather' />}
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
        </PickerView>
      </Row>
    )
  }
}

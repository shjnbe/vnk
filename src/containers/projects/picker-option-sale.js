import React from 'react'
import { Picker, Icon, Header, Left, Title, Body, Right } from 'native-base'
import moment from 'moment'
import { isEqual, get } from 'lodash'
import mypStyles from 'themes/myp-styles'
import staffTypes from 'constants/staff-type';
import colors from 'themes/colors';

export default class PickerOptionSale extends React.Component {
  constructor (props) {
    super(props)
    this.state = { current: props.current || staffTypes[0] }
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.current, nextProps.current)) {
      this.setState({ monthCurrent: nextProps.current || staffTypes[0] })
    }
  }

  renderHeader = backAction => {
    return (
      <Header transparent style={mypStyles.styleHeader}>
        <Body>
          <Title style={{ color: colors.black }}>Chọn nhóm</Title>
        </Body>
        <Right>
          <Icon name='x' type='Feather' style={{color: '#ccc', fontSize: 25}} onPress={() => backAction()} />
        </Right>
      </Header>
    )
  }

  render () {
    return (
      <Picker
        mode='dropdown'
        iosIcon={<Icon name='chevron-down' type='Feather' />}
        style={{ width: undefined }}
        selectedValue={get(this.state, 'current')}
        onValueChange={current => {
          this.props.onValueChange(current)
          this.setState({ current })
        }}
        renderHeader={this.renderHeader}
      >
        {staffTypes.map(item => (
          <Picker.Item label={item.title} key={item.key} value={item}/>
        ))}
      </Picker>
    )
  }
}

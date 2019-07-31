import React from 'react'
import { Card, Text, Icon } from 'native-base'
import Touchable from '../../../components/base/Touchable';

export default class RowItem extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.size !== this.props.size
  }

  render () {
    const { style } = this.props
    return (
      <Touchable style={style} onPress={this.props.onPress}>
        <Card
          style={[
            {
              width: this.props.size,
              height: (this.props.size * 3) / 2,
              backgroundColor: 'rgb(255, 253, 233)',
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
          onLayout={this.onLayout}
        >
          <Icon
            type='Feather'
            name='plus-circle'
            style={{ color: 'rgb(0, 122, 255)', marginBottom: 8, fontSize: 35 }}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0,
              textAlign: 'center',
              color: '#505052'
            }}
          >
            Thêm dự án
          </Text>
        </Card>
      </Touchable>
    )
  }
}

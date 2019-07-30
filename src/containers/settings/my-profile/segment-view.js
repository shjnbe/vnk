import React from 'react'
import styled from 'styled-components/native'
import { isEqual } from 'lodash'
import colors from 'themes/colors'

const Wrapper = styled.View`
height: 35
flexDirection: row justifyContent: flex-start alignItems: center
borderColor: ${colors.appleGreen}
borderWidth: 1
borderRadius: 3
marginLeft: 12
marginRight: 12
`

const SegmentItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
height: 33
flex: 1
backgroundColor: ${props => (props.active ? colors.appleGreen : colors.white)}
justifyContent: center alignItems: center
`

const SegmentText = styled.Text` 
  fontSize: 14
  color: ${props => (props.active ? colors.white : colors.black)}
  fontWeight: ${props => (props.active ? 'bold' : 'normal')}
`

const stylesBorder = {
  first: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },
  last: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  }
}

export default class SegmentView extends React.Component {
  // componentWillUpdate (nextProps) {
  //   return isEqual(nextProps.index, this.props.index)
  // }

  render () {
    return (
      <Wrapper>
        <SegmentItem
          style={stylesBorder.first}
          active={this.props.index === 0}
          onPress={() => this.props.onSegmentChange(0)}
        >
          <SegmentText active={this.props.index === 0}>Liên hệ</SegmentText>
        </SegmentItem>
        <SegmentItem
          active={this.props.index === 1}
          style={{
            borderLeftColor: colors.appleGreen,
            borderLeftWidth: 1,
            borderRightColor: colors.appleGreen,
            borderRightWidth: 1
          }}
          onPress={() => this.props.onSegmentChange(1)}
        >
          <SegmentText active={this.props.index === 1}>Giao việc</SegmentText>
        </SegmentItem>
        <SegmentItem
          style={stylesBorder.last}
          active={this.props.index === 2}
          onPress={() => this.props.onSegmentChange(2)}
        >
          <SegmentText active={this.props.index === 2}>Ghi chú</SegmentText>
        </SegmentItem>
      </Wrapper>
    )
  }
}

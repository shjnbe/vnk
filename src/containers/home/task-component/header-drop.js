import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import { Picker, Icon } from 'native-base'
import moment from 'moment'

const Wrapper = styled.View`
  flexDirection: column
  marginTop: 12
  marginLeft: 72
`

const TextBase = styled.Text`
fontSize: 14 paddingLeft: 8`

const ProjectTitle = TextBase.extend.attrs({
  color: colors.greyishBrownTwo
})``

const DropView = styled.View`
borderWidth: 1
flex: 1
height: 45
borderColor: #2196f3
flexDirection: row
justifyContent: space-between
alignItems: center
marginTop: 8
`

const CodeView = styled.View`
flexDirection: row
marginTop: 8
`

const CodeTitle = TextBase.extend`
  color: #353a41;
`
const CodeValue = TextBase.extend`
  color: #ee5a55;
`

const Slider = styled.Slider`
  color: red;
`

export default class HeaderDropView extends React.Component {
  constructor (props) {
    super(props)
    this.months = []
    this.current = moment().months
    for (let i = 0; i < moment().months; i++) {
      this.months.push(moment().subtract(i, 'months'))
    }
  }

  render () {
    return (
      <Wrapper>
        <ProjectTitle color={this.props.titleColor}>Chọn Dự Án</ProjectTitle>
        <DropView>
          <Picker
            mode='dropdown'
            iosHeader='Chọn tháng'
            iosIcon={
              <Icon
                name='chevron-down'
                type='Feather'
                style={{ fontSize: 1, color: 'transparent' }}
              />
            }
            style={{}}
            selectedValue={this.current}
            onValueChange={this.onValueChange}
          >
            {this.months.map(month => (
              <Picker.Item label={month.format('MMM')} value={month.months} />
            ))}
          </Picker>
          <Icon
            name='chevron-down'
            type='Feather'
            style={{
              fontSize: 20,
              color: colors.brownishGreyThree,
              marginRight: 8
            }}
          />
        </DropView>
        <CodeView>
          <CodeTitle>Mã Dự án</CodeTitle>
          <CodeValue>73174011</CodeValue>
          <CodeTitle>Phiên bản</CodeTitle>
          <CodeValue>v1.11</CodeValue>
        </CodeView>
        <Slider value={5} maximumValue={100} thumbTintColor='red' />
      </Wrapper>
    )
  }
}

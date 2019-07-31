import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'

const Wrapper = styled.View`
flexDirection: row
marginTop: 12
justifyContent: center alignItems: center
`

const LeftView = styled.View`
  width: 60
  justifyContent: center
  alignItems: center
`

const Body = styled.View`
  flex: 1
  borderRadius: 3
  marginLeft: 12
  justifyContent: space-around alignItems: flex-start
  paddingLeft: 12
  paddingRight: 12
  paddingBottom: 12
  paddingTop: 12
  borderWidth: 1
  backgroundColor: ${props => props.backgroundColor || colors.azure}
  borderColor: ${props => props.borderColor || colors.azure}
`
const TextBase = styled.Text`
color: ${props => props.color || colors.black}
fontFamily: Helvetica
fontSize: ${props => props.fontSize || 17}
fontWeight: ${props => props.fontWeight || 'normal'}`

const DateTitle = TextBase.extend.attrs({
  fontSize: 32,
  fontWeight: 'bold'
})``
const DateSubTitle = TextBase.extend``
const Title = TextBase.extend.attrs({
  fontWeight: '500'
})``
const SubTitle = TextBase.extend``

export default class TaskItemView extends React.Component {
  render () {
    return (
      <Wrapper>
        <LeftView>
          <DateTitle color={this.props.dateColor}>
            {/* {moment(this.props.date).format('DD')} */}
          </DateTitle>
          <DateSubTitle color={this.props.dateColor}>
            {/* {moment(this.props.date).format('ddd')} */}
          </DateSubTitle>
        </LeftView>
        <Body
          backgroundColor={this.props.backgroundColor}
          borderColor={this.props.borderColor}
        >
          <Title color={this.props.titleColor}>{this.props.title}</Title>
          {this.props.note && (
            <SubTitle color={this.props.titleColor}>{this.props.note}</SubTitle>
          )}
        </Body>
      </Wrapper>
    )
  }
}

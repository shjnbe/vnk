import React, { Component } from 'react';
import styled from 'styled-components/native'
import colors from '../../../../components/elements/follow'
import {
  Icon
} from 'native-base'

const TextTitle = styled.Text`
  fontFamily: Helvetica
  fontSize: 15
  width: ${props => props.width / 3 || 56}
  fontWeight: bold
  fontStyle: normal
  letterSpacing: 0
  textAlign: left
  color: #ee5a55
  paddingLeft: 8
`

const TextContent = styled.Text`
  fontFamily: Helvetica
  fontSize: 14
  fontWeight: normal
  fontStyle: normal
  paddingLeft: 4
  paddingRight: 4
  letterSpacing: 0
  flex: 1
  textAlign: justify
  color: ${colors.greyishBrown}
`

const RowContainer = styled.View`
  flexDirection: row
  marginTop: ${props => props.marginTop || 0}
  marginBottom: 16
`

const ContentView = styled.View`
  paddingTop: 4
  paddingLeft: 4
  paddingRight: 4
  paddingBottom: 4
  marginLeft: 12
  marginRight: 12
  flex: 1
`

const ArTimeView = styled.View`
  marginBottom: 4
  marginLeft: 4
  flexDirection: row
`

const ArTime = styled.Text`
  opacity: 0.8
  marginRight: 8
  marginLeft: 4
  fontSize: 12
  letterSpacing: 0
  color: ${props => props.color || colors.black}
`

export default class NoteRow extends Component {

  render() {
    return (
      <RowContainer >
        <TextTitle width={this.props.width}>{this.props.title}</TextTitle>
        <ContentView>
          <ArTimeView>
            <Icon
              name='calendar'
              type='Feather'
              style={{ opacity: 0.8, color: colors.black, fontSize: 12 }}
            />
            <ArTime>{this.props.time}</ArTime>
          </ArTimeView>
          <TextContent>{this.props.content}</TextContent>
        </ContentView>
      </RowContainer>
    )
  }
}
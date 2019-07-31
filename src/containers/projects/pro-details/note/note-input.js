import React, { Component } from 'react';
import styled from 'styled-components/native'
import colors from '../../../themes/colors'

const InputTitle = styled.TextInput`
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

const InputContent = styled.TextInput`
  paddingTop: 8
  paddingLeft: 8
  paddingRight: 8
  paddingBottom: 8
  marginLeft: 12
  marginRight: 12
  borderWidth: 1
  flex: 1
  borderColor: #2196f3
  textAlign: justify
`

const RowContainer = styled.View`
  flexDirection: row
  marginTop: ${props => props.marginTop || 0}
  marginBottom: 16
`

export default class NoteInput extends Component {
  
  render() {
    return (
      <RowContainer>
        <InputTitle 
          multiline={true}
          numberOfLines={3}
          placeholder={'Nhập tiêu đề...'}
          width={this.props.width}
          defaultValue={this.props.title}
          onChangeText={value => this.props.onValueChange('title', value, this.props.inx)}
          />
        <InputContent 
          multiline={true}
          placeholder={'Nhập nội dung...'}
          defaultValue={this.props.content}
          onChangeText={value => this.props.onValueChange('content', value, this.props.inx)}
        />
      </RowContainer>
    )
  }
}
import React from 'react'
import styled from 'styled-components/native'
import moment from 'moment'
import { FIELD_TYPE } from './data-keys';

const View = styled.View``

const Wrapper = styled(View)`
flexDirection: row
justifyContent: flex-start
flex: 1
`

const Title = styled.Text`
  marginVertical: 8
  color: #353a41 
  textAlign: left
  fontSize: 14
  fontWeight: 600
`


const Label = styled.Text`
  color: #353a41 
  flex: 2
  textAlign: justify
  fontSize: 16
`



const Text = styled.Text`
  fontWeight: 600
  color: #353a41 
  textAlign: left
  flex: 1
  fontSize: 14`

const TextRight = styled.Text`
  color: #353a41 
  flex: 2
  textAlign: right
  fontSize: 16`

const TextLeft = styled.Text`
  color: #353a41 
  flex: 2
  paddingLeft: 16
  textAlign: left
  fontSize: 16`

export default class RowView extends React.Component {
  getValue() {
    if (this.props.fieldType === FIELD_TYPE.DATE) {
      return this.props.value ? moment(this.props.value).format('DD/MM/YYYY') : ''
    } else if (this.props.code === 'floor_area') {
      return `${this.props.value} m2`
    } else if (this.props.code === 'cost') {
      return `$ ${this.props.value}m`
    } else {
      return this.props.value
    }
  }

  _renderColumn () {
    return (
      <View>
        <Title>{this.props.title}:</Title>
        <Label>{this.getValue()}</Label>
      </View>
    )
  }

  _renderRow () {
    return (
      <Wrapper style={{ marginTop: 16 }}>
        <Text>{this.props.title}</Text>
        <TextRight>{this.getValue()}</TextRight>
      </Wrapper>
    )
  }

  render () {
    if (this.props.fieldType === FIELD_TYPE.AREA) {
      return this._renderColumn()
    }
    return this._renderRow()
  }
}

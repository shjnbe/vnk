import React from 'react'
import { Item, Label, Input, Icon, Text, View, Picker, Header, Left, Body, Textarea, DatePicker } from 'native-base'
import styled from 'styled-components/native'
import moment from 'moment'
import cities from '../../../../constants/cities'
import { FIELD_TYPE } from './data-keys'

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})` 
  justifyContent: center
  alignItems: center
`

const DropDownView = ({onPress, title}) => (
  <Touchable onPress={onPress}> 
    <View style={{flexDirection: 'row', paddingTop: 8, paddingBottom: 8}}>
      <Text style={{flex: 1}}>{title}</Text>
      <Icon name='chevron-down' type='Feather' style={{ fontSize: 17 }} />
    </View>
  </Touchable>
)

export default class RowInputView extends React.Component {

  state = {
    city: this.props.value  
  }

  handleChangeDate = date => {
    this.props.onChangeText(this.props.code, moment(date).format())
  }
  
  handleChangeText = (value, code) => {
    if (code === 'city') {
      this.setState({
        city: value
      })
    } 

    this.props.onChangeText(this.props.code, value)
  }

  renderPlaceHolderTextDate() {
    if (this.props.code === 'last_modified') {

      return moment().format('DD/MM/YYYY')
    } else {
      return this.props.value ? moment(this.props.value).format('DD/MM/YYYY'): 'Chọn ngày'
    }
  }
  
  renderCityHeader = goBack => {
    return (
      <Header transparent noShadow>
        <Left>
          <Icon name='chevron-left' type='Feather' onPress={goBack}/>
        </Left>
        <Body>
          <Label>Thành phố (Tỉnh)</Label>
        </Body>
      </Header>
    )
  }

  renderRowDatePicker() {
    const isLastModified = (this.props.code === 'last_modified')
    return (
      <View style={{ flexDirection: 'row' , alignItems: 'center'}}>
        <Icon name='calendar' style={{color: '#727272', fontSize: 18, marginRight: 4}}/>
        <DatePicker
          disabled={isLastModified}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText={this.renderPlaceHolderTextDate()}
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: this.props.code === 'last_modified'? "#727272" : '#212121'}}
          onDateChange={this.handleChangeDate}
        />
      </View>
    )
  }

  _renderTextArea () {
    return (
      <Item>
        <Textarea
          style={{ backgroundColor: 'white', flex: 1 }}
          rowSpan={3}
          defaultValue={`${this.props.value ? this.props.value: ''}`}
          onChangeText={this.handleChangeText}
        />
      </Item>
    )
  }

  _renderCity () {
    return (
      <Picker
        mode='dropdown'
        style={{ width: undefined, minWidth: 260 }}
        renderHeader={this.renderCityHeader}
        placeholder='Thành phố (Tỉnh)'
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor='#007aff'
        selectedValue={this.state.city}
        onValueChange={value => this.handleChangeText(value, 'city')}
      >
        {
          cities.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)
        }
      </Picker>
    )
  }
  _renderItem () {
    switch (this.props.fieldType) {
      case FIELD_TYPE.DATE:
        return this.renderRowDatePicker()
      case FIELD_TYPE.CITY:
        return this._renderCity()
      case FIELD_TYPE.PICK:
        return <DropDownView onPress={this.props.onPick} title={this.props.status} />
      case FIELD_TYPE.AREA:
        return this._renderTextArea()
      default:
        return (
          <Input
            placeholder={this.props.fieldType ? FIELD_TYPE.DATE : ''}
            defaultValue={`${this.props.value ? this.props.value: ''}`}
            onChangeText={this.handleChangeText}
          />
        )
    }
  }

  render () {
    return (
      <Item stackedLabel style={{ alignItems: 'flex-start' }}>
        <Label
          style={{ marginTop: 8, textAlign: 'left', color: '#353a41', fontWeight: 'bold' }}
        >
          {this.props.title}
          <Label style={{color: 'red', fontWeight: 'bold'}}>
            {this.props.isRequie ? ` (*)` : ''}
          </Label>
        </Label>
        {
          this._renderItem()
        }
      </Item>
    )
  }
}

import React from 'react'
import { Item, Label, Input } from 'native-base'
import { Platform } from 'react-native'

export default class MemberInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isRequie = props.code === 'full_name' || props.code === 'email' || props.code === 'phone' || props.code === 'position'
  }
  render () {
    return (
      <Item stackedLabel>
        <Label
          style={{ textAlign: 'left', color: '#353a41', fontWeight: 'bold' }}
        >
          {this.props.title}
          <Label style={{color: 'red', fontWeight: 'bold', fontSize: 12}}>
            {this.isRequie ? ` (*)` : ''}
          </Label>
        </Label>
        <Input
          // style={{height: Platform.OS === 'android' ? 60 : 30}}
          multiline={this.props.isArea}
          placeholder={this.props.title}
          defaultValue={this.props.subTitle  && `${this.props.subTitle}`}
          onChangeText={value =>
            this.props.onChangeText(this.props.code, value)
          }
        />
      </Item>
    )
  }
}

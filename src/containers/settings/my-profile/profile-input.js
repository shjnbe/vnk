import React from 'react'
import { Item, Label, Input } from 'native-base'

export default class ProfileInput extends React.PureComponent {
  render () {
    return (
      <Item stackedLabel>
        <Label
          style={{ textAlign: 'left', color: '#353a41', fontWeight: 'bold' }}
        >
          {this.props.title}
        </Label>
        <Input
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

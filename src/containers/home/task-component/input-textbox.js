import React from 'react'
import { Textarea } from 'native-base'
import mypStyles from 'themes/myp-styles'

export default class InputTextbox extends React.Component {
  // shouldComponentUpdate (nextProps) {
  //   return nextProps.editable !== this.props.editable || nextProps.content !== this.props.content
  // }

  render () {
    return (
      <Textarea
        placeholder='Nhập dung....'
        value={this.props.content}
        style={[mypStyles.borderDarkSkyBlue, { marginBottom: 4, marginTop: 4 }]}
        rowSpan={3}
        bordered
        autoCapitalize='none'
        onChangeText={value => this.props.onValueChange(value, this.props.inx)}
        editable={this.props.editable}
      />
    )
  }
}

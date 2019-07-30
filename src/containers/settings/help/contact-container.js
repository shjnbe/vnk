import React from 'react'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import { Card, H3 } from 'native-base';
import { P, P1, ArImage, ArH } from './component-help'

const WrapperView = styled.View`paddingLeft: 16 paddingRight: 16 paddingTop: 8 paddingBottom: 8`

export default class HelpContainer extends React.PureComponent {
  render () {
    return (
      <WrapperView>
        <ArH>Tác giả: Ninh Việt Tú</ArH>
        <ArH>Điện thoại: +84 927 161 161</ArH>
        <ArH>Email: info@myp.vn</ArH>
      </WrapperView>
    )
  }
}

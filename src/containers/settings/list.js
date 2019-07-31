import React from 'react'
import { Container, Content, Icon } from 'native-base'
import styled from 'styled-components/native'
import HeaderView from './row-header'
import RowItem from './row'
import colors from '../../themes/colors'
import NavHeader from 'components/elements/nav-header'

const TopTitleView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
`
const TopTitle = styled.Text`
  fontSize: 12
  fontWeight: 900
  letterSpacing: 2.7
  marginLeft: 6
  color: ${colors.electricBlue}
`

export default class ListContainer extends React.Component {
  handleSelecte = () => {
    this.props.navigation.navigate('settingsDetail')
  }

  render () {
    return (
      <Container>
        <NavHeader title='Mẹo kỹ năng bán hàng' />
        <Content style={{ paddingLeft: 16, marginTop: 8, paddingRight: 16 }}>
          <TopTitleView>
            <Icon name='star' style={{ fontSize: 20, color: colors.blue }} />
            <TopTitle>TOP ĐẦU</TopTitle>
          </TopTitleView>
          <HeaderView />
          {[1, 2, 3, 4, 5].map(item => (
            <RowItem key={`${item}`} onPress={this.handleSelecte} />
          ))}
        </Content>
      </Container>
    )
  }
}

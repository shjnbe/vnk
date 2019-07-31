import React from 'react'
import { Container, Content, Icon } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../themes/colors'
import NavHeader from 'components/elements/nav-header'

const ImageView = styled.Image.attrs({
  source: require('../../images/settings/img-skill.png'),
  resizeMode: 'contain'
})`
  width: 335
  height: 188
`

const ArTimeView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  marginBottom: 12
`
const ArTitle = styled.Text`
  fontSize: 18
  fontWeight: bold
  letterSpacing: 0
  color: ${colors.black}
`

const ArTime = styled.Text`
  fontSize: 12
  letterSpacing: 0
  opacity: 0.7
  marginLeft: 8
  color: ${colors.black}
`

const ArContent = styled.Text`
  backgroundColor: ${colors.white}
  paddingTop: 12
  paddingLeft: 12
  paddingRight: 12
  paddingBottom: 12
  fontSize: 14
  letterSpacing: 0.82
  color: #2a2d23
  textAlign: justify
`

const contentText = `
Bí quyết để bán hàng thành công là gì? kỹ năng bán hàng chuyên nghiệp của những người bán hàng xuất sắc là những điều gì?

Có thể bạn chưa từng biết điều này: người ta thường không thích những người bán hàng. Tuy nhiên đừng để mối ác cảm này làm bạn gục ngã. Bạn có thể thể hiện mình dưới một góc nhìn khác, một hình ảnh tốt hơn với tư cách là người bán hàng bằng việc bắt tay vào phát triển những kĩ năng đặc thù.
10 kỹ năng bán hàng chuyên nghiệp sau sẽ giúp bạn trở thành người bán hàng hoàn hảo hơn.

1.Im lặng để lắng nghe
Điều này đặc biệt có ý nghĩa vào những phút đầu tiên của cuộc tiếp xúc với khách hàng tiềm năng. Bạn không nên nói về chính bạn, về sản phẩm của bạn, về dịch vụ của bạn và đừng nói gì liên quan tới việc bán hàng. 
`

export default class ListContainer extends React.Component {
  render () {
    return (
      <Container>
        <NavHeader isBack title='Mẹo kỹ năng bán hàng' {...this.props} />
        <Content style={{ paddingLeft: 16, marginTop: 8, paddingRight: 16 }}>
          <ArTitle>10 kỹ năng bán hàng cần biết</ArTitle>
          <ImageView />
          <ArTimeView>
            <Icon
              name='calendar'
              style={{ color: colors.black, opacity: 0.7, fontSize: 20 }}
            />
            <ArTime>22/1/2019</ArTime>
          </ArTimeView>
          <ArContent>{contentText}</ArContent>
        </Content>
      </Container>
    )
  }
}

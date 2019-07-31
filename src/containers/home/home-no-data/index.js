import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import { Dimensions, ImageBackground } from 'react-native'
import HeaderItemView from './header-item'
import { Container, Title, Icon, Button, Toast } from 'native-base'
import connectAutoDispatch from '@redux/connect';
import { cleanDataCacheProject } from '@redux/actions/projectAction'
import * as _ from 'lodash'

const ImageBgView = styled.Image.attrs({
  source: require('images/home/ic-eagle.png'),
  resizeMode: 'stretch'
})`
position: absolute
top: 60
width: ${Dimensions.get('window').width}
zIndex: -9999
`

const Content = styled.View``
const HView = styled.View`
height: 102
marginTop: 16
marginRight: 16
marginLeft: 16
paddingTop: 16
paddingRight: 16
paddingLeft: 16
borderRadius: 3
backgroundColor: ${colors.rouge}
`

const ImageDesc = styled.Image.attrs({
  source: require('images/home/home-check.png')
})`
  width: 41
  height: 41
  alignSelf: flex-start
  marginBottom: 4
`

const IconHandle = styled.Image.attrs({
  source: require('images/globe/ic-handle.png')
})`
  width: 30
  height: 36
`
const ViewHandle = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: flex-end
`

// const Content = styled.View` flex: 1`

const WrapperContent = styled.View`
  marginTop: 4
  flexDirection: column
  backgroundColor: ${colors.white}
`

const HeaderTitle = styled.Text`
marginLeft: 16
fontFamily: Helvetica
fontSize: 18
fontWeight: bold
fontStyle: normal
letterSpacing: 0.33
color: #000
`

const HeaderContent = styled.View``
const Footer = styled.View`
position: absolute
bottom: 16
justifyContent: flex-start
alignItems: center
left: 32 right: 32
`
const DescView = styled.Text.attrs({numberOfLines: 2})`
fontSize: 20
fontWeight: bold
fontStyle: normal
lineHeight: 20.6
letterSpacing: 0
color: ${colors.white}

`

const ButtonPackage = styled.TouchableOpacity.attrs({activeOpacity: 0.8})``

class HomeContainer extends React.Component {

  componentDidMount() {
    this.props.cleanDataCacheProject()
  }

  handleTaskComponent = e => {
    this.props.navigation.navigate('taskComponent')
  }

  handleAdd = e => {
    if (_.get(this.props, 'user.packageOrder', false)) {
      this.props.navigation.navigate('addProject')
    } else {
      Toast.show({ text: 'Vui lòng nâng cấp dịch vụ', type: 'warning', position: 'top' })
    }
  }

  handlePackage = () => {
    this.props.navigation.navigate('servicePackageContainer')
  }

  render () {
    return (
      <Container>
        <ButtonPackage
            onPress={this.handlePackage}
          >
          <HView style={{
            shadowColor: '#000',//'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
              width: 2,
              height: 2
            },
            shadowRadius: 1,
            shadowOpacity: 1
          }}>
            <DescView>
              Tiết kiệm 50% thời gian của bạn để tìm kiếm thông tin dự án!
            </DescView>
            <ViewHandle>
              <IconHandle />
              <Title
                style={{ color: colors.white, paddingLeft: 16, paddingRight: 16 }}
              >
                Nhấn xem ngay!
              </Title>
            </ViewHandle>
          </HView>
        </ButtonPackage>  
        <Content>
          <HeaderContent
            style={{
              position: 'absolute',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              zIndex: 9999,
            }}
          >
            <Icon
              name='add-circle'
              onPress={this.handleAdd}
              style={{
                fontSize: 100,
                color: colors.darkSkyBlue,
                marginLeft: 24
              }}
            />
            <HeaderTitle>Thêm Dự án</HeaderTitle>
          </HeaderContent>
          <ImageBackground source={require('images/home/ic-eagle.png')} style={{
            width: '100%', height: '88%',
            marginTop: 60
          }} />
        </Content>
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: state.auth.user
}), {
  cleanDataCacheProject
})(HomeContainer)
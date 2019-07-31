import React from 'react'
import { Modal } from 'react-native'
import { Container, Text, Content, Toast, View } from 'native-base'
import styles from './styles'
import colors from '../../../themes/colors'
import Divider from '../../../components/elements/divider'
import ItemSetting from './item-setting'
import dataSetting from './data-setting'
import { SettingGeneralView } from '../header-setting-view'
import connectAutoDispatch from '../../../@redux/connect';
import * as _ from 'lodash'
import { POSITION } from 'constants/position-sale';
import { logout } from '../../../@redux/actions/authAction'
import ChangePassWordView from '../change-password'

class SettingListContainer extends React.Component {

  state = {
    modalVisible: false
  }

  handleSelected = item => {
    const position = _.get(this.props, 'user.saleteam_position', '')
    switch (item.key) {
      case 'kpiSetupContainer': 
        if (position === POSITION.SALE_MANAGER) {
          this.props.navigation.navigate(item.key, { title: item.title })
        } else {
          Toast.show({
            text: 'Chức năng này chỉ dành cho Sale Manager',
            position: 'top',
            type: 'warning'
          })
        }
        break;
      case 'changePassword':
        //this.setState({ modalVisible: true })
        this.refs.changePass.onOpen()
        break
      default: 
        this.props.navigation.navigate(item.key, { title: item.title })
        break;
    }
  }

  render () {
    return (
      <Container>
        {/* <HeaderSettingView title='Cài Đặt' subTitle='Cài Đặt Chung'/> */}
        <SettingGeneralView title='Cài Đặt Chung' name='settings' />
        <Text style={styles.textSettingList}>DANH SÁCH CÀI ĐẶT</Text>
        <Divider />
        <Content>
          {dataSetting.map(item => (
            <ItemSetting {...item} onPress={() => this.handleSelected(item)} />
          ))}
          <ItemSetting
            title='Đăng xuất'
            color={colors.dodgerBlue}
            source={require('../../../images/settings/logout.png')}
            onPress={() => this.props.logout(this.props.user)}
          />
        </Content>
        <ChangePassWordView ref='changePass' user={this.props.user} navigation={this.props.navigation} />
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: _.get(state, 'auth.user', {})
}), {
  logout
})(SettingListContainer)

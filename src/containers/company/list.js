import React from 'react'
import styled from 'styled-components/native'
import colors from 'themes/colors'

import { FlatList } from 'react-native'
import { Container, Content, Icon, Item, View, Card, Toast } from 'native-base'
import Input from 'components/base/Input'
import CompanyRow from './row'
import companyApi from 'api/companyApi'
import * as _ from 'lodash'
import ModalDialog from 'components/elements/modal-dialog'
import { CachedImage } from 'react-native-cached-image'
import connectAutoDispatch from '@redux/connect';
import {
  followCompany,
  unFollowCompany,
  getCompanies,
  onCompanySelected
} from '@redux/actions/companyAction'
import { toVietnamese } from 'utils/extentions'

const TextBase = styled.Text`
  fontFamily: Helvetica
  letterSpacing: 0
`



const ArTitle = TextBase.extend` 
fontSize: 18
marginTop: 8
marginBottom: 8
marginLeft: 16
marginRight: 16
fontWeight: 900
fontStyle: normal
letterSpacing: 0
color: #000000
`

const ArTimeView = styled.View`
  marginBottom: 16
  marginLeft: 16
  marginRight: 16
  flexDirection: row
`

const ArLocation = TextBase.extend` 
  opacity: 0.95
  marginRight: 8
  fontSize: 12
  fontWeight: bold
  fontStyle: normal
  letterSpacing: 0
  color: ${colors.black}
`

const ArTime = TextBase.extend` 
opacity: 0.8
marginRight: 8
marginLeft: 4
fontSize: 12
letterSpacing: 0
color: ${colors.black}
`

const ImageFollow = styled.Image`
width: 37
height: 37
`

const TextFollow = TextBase.extend` 
  fontSize: 14
  letterSpacing: 0
  textAlign: center
  paddingTop: 4
  color: ${props => props.color || '#455a64'}
`

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``
const TouchableWithout = styled.TouchableWithoutFeedback``

const FollowView = ({ isFollow, color, style, onPress }) => (
  <TouchableWithout onPress={onPress}>
    <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
      <ImageFollow source={isFollow ? require('images/company/follow.png')
                : require('images/company/unfollow.png')} />
      <TextFollow color={color}>{isFollow ? 'Bỏ TD' : `Theo dõi`}</TextFollow>
    </View>
  </TouchableWithout>
)

class CardLg extends React.Component {
  handleFollow = e => {
    this.props.onFollow(this.props.company)
  }

  render () {
    return (
      <Touchable onPress={() => this.props.onPress(this.props.company)}>
        <Card>
          <CachedImage
            resizeMode='contain'
            style={{
              width: null,
              height: 143
            }}
            source={
              this.props.image
                ? { uri: this.props.image }
                : require('images/globe/noimage.png')
            }
          />
          <ArTitle>{this.props.name}</ArTitle>
          <ArTimeView>
            <Icon
              name='map-pin'
              type='Feather'
              style={{
                opacity: 0.95,
                color: colors.black,
                marginRight: 4,
                fontSize: 12
              }}
            />
            <ArLocation>{this.props.office_address}</ArLocation>
            <Icon
              name='calendar'
              type='Feather'
              style={{ opacity: 0.8, color: colors.black, fontSize: 12 }}
            />
            <ArTime>{this.props.date}</ArTime>
          </ArTimeView>
          <FollowView
            onPress={this.handleFollow}
            color={colors.white}
            style={{ position: 'absolute', top: 16, left: 8 }}
            isFollow={this.props.isFollow}
          />
        </Card>
      </Touchable>
    )
  }
}

class CompanyContainer extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      textSearch: '',
      isFetching: false
    }
  }

  handleAddCompany = e => {
    this.props.navigation.navigate('addCompany')
  }

  handleDetail = company => {
    const user = _.get(this.props, 'user', {})
    this.props.onCompanySelected(company)
    this.props.navigation.navigate('companyDetail', { company, user })
  }

  componentDidMount () {
    this.props.getCompanies(this.props.user)
    this.props.navigation.setParams({
      isIcon: _.get(this.props, 'user.packageOrder')
    })
  }

  handleFollow = async company => {
    // if (_.find(this.props.company.companyFollow, ({id}) => id === company.id)) {
    //   this.refs.modal.open(company.id)
    // } else {
    //   this.props.followCompany(company, this.props.user)
    // }

    if (this.props.user.packageOrder !== 'basic') {
      if (_.size(_.get(company, 'users', [])) > 0 ) {
        this.refs.modal.open(company.id)
      } else {
        const rs = await this.props.followCompany(company, this.props.user)
        Toast.show({
          text: `Theo dõi công ty ${rs ? '' : 'không '}thành công!`,
          type: rs ? 'success' : 'warning',
          position: 'top'
        })
      }
    } else {
      Toast.show({
        text: 'Bạn đang sử dụng gói dịch vụ basic vui lòng nâng cấp',
        type: 'warning',
        position: 'top'
      })
    }
  }

  handleFollowConfirm = id => {
    this.props.unFollowCompany(id, this.props.user)
  }

  getData = () => {
    const textSearch = toVietnamese(_.lowerCase(this.state.textSearch))
    let ls = _.get(this.props, 'company.list', [])
    if (textSearch) {
      ls = _.filter(_.clone(_.get(this.props, 'company.list', [])), ({name, short_name}) => _.includes(toVietnamese(_.lowerCase(name)), textSearch) || _.includes(toVietnamese(_.lowerCase(short_name)), textSearch))
    } 

    return _.orderBy(ls, ['id'], ['desc'])
  }

  _renderItem = ({item}, inx) => {
    return (
      <CompanyRow
      // isFollow={_.find(this.props.company.companyFollow, {id: item.id})}
      isFollow={_.size(_.get(item, 'users', [])) > 0}
      key={`${inx}`}
      {...item}
      company={item}
      onPress={this.handleDetail}
      onFollow={this.handleFollow}
      src={
        inx % 2 === 0
          ? require('images/company/isoftglobel.png')
          : require('images/company/vinhomes.png')
      }
    />)
  }

  _onRefresh = async () => {
    this.setState({ isFetching: true })
    await this.props.getCompanies(this.props.user)
    this.setState({ isFetching: false })
  }

  _keyExtractor = (item, index) => `${item.id}`;

  _renderView = () => {
    if (this.props.user.packageOrder) {
      return (<FlatList
        refreshing={this.state.isFetching} 
        keyExtractor={this._keyExtractor}
        data={this.getData()}
        renderItem={this._renderItem}
        onRefresh={this._onRefresh}
      />)
    } else {
      return <TextBase style={{ 
        marginTop: 16,
        textAlign: "center"
      }}>Bạn chưa sử dụng gói dịch vụ nào!</TextBase>
    }
  }

  render () {
    return (
      <Container>
        <ModalDialog
          ref='modal'
          title='Bạn muốn bỏ theo dõi công ty này?'
          textOk='Ok'
          textCancel='Hủy'
          onOk={this.handleFollowConfirm}
        />
        <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8 }}>
          <Item
            regular
            style={{
              height: 42,
              backgroundColor: colors.white,
              borderRadius: 4
            }}
          >
            <Input
              paddingLeft={10}
              style={{ flex: 1 }}
              placeholder='Tìm kiếm công ty...'
              onChangeText={textSearch => this.setState({ textSearch })}
            />
            <Icon active name='search' style={{ color: colors.black }} />
          </Item>
          {
            this._renderView()
          }
        </View>
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: state.auth.user,
  company: state.company
}), {
  getCompanies,
  unFollowCompany,
  followCompany,
  onCompanySelected
})(CompanyContainer)
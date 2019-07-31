import React from 'react'
import styled from 'styled-components/native'

import { Container, Content } from 'native-base'
import { get, join, isArray, map, isEmpty, size, filter } from 'lodash'
import rows from './field-company'
import { CachedImage } from 'react-native-cached-image'
import PickerDetailUser from './picker-detail-user';
import connectAutoDispatch from '../../@redux/connect';
import { onCompanySelected, onChangeImage } from '@redux/actions/companyAction'
import { getProjectId } from '@redux/actions/projectAction'
import ImageCropPicker from 'react-native-image-crop-picker'
import CompanyLinkProject from './company-link-project'

const newRows = filter(rows, ({key}) => key !== 'manager_id')

const TextBase = styled.Text`
  fontFamily: Helvetica
  fontStyle: normal
`

const ArName = styled.Text`
fontSize: 17
fontWeight: 800
color: #000000
marginBottom: 8
`

const Touchable = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })``

const ArShortName = TextBase.extend`
fontSize: 14
letterSpacing: 0.82
color: #2a2d23
marginBottom: 4
`

const Row = styled.View`
  flexDirection: row
  justifyContent: space-between
  marginTop: 4
  marginBottom: 4
`

const LeftText = TextBase.extend`
fontSize: 14
color: #2a2d23
paddingLeft: 16
paddingRight: 8
`
const RightText = TextBase.extend`
fontSize: 12
color: #f10202
paddingLeft: 8
marginRight: 16
`

const RowView = props => (
  <Row>
    <LeftText>{props.title}</LeftText>
    <RightText>{props.value}</RightText>
  </Row>
)

const ContactView = styled.View`
  flexDirection: row
  flexWrap: wrap
  marginLeft: 16
  marginRight: 16
`

class CompanyContainer extends React.Component {

  onShowDetail = (contact, index) => {
    this.props.navigation.navigate('contactNav', { contact, index })
  }

  handleChangeImage = () => {
    // if (size(get(this.props, 'companySelected.users', [])) > 0) {
    if (get(this.props, 'companySelected.created_by') === get(this.props, 'user.id')) {
      ImageCropPicker.openPicker({
        // width: 670,
        // height: 286,
        // cropping: true,
        cropperChooseText: 'Chọn',
        cropperCancelText: 'Hủy bỏ'
      }).then(async data => {
        const company = get(this.props, 'companySelected', {})
        const user = get(this.props, 'user', {})
        const rs = await this.props.onChangeImage(data, company, user)
        if (rs) {
          Toast.show({ 
            text: 'Cập nhật hình ảnh thành công',
            type: 'success',
            position: 'top'
          })
        } else {
          Toast.show({text: `Đã có lỗi xảy ra.`, type: 'warning', position: 'top'})
        }
      })
      .catch(err => console.log(err))
    }   
  }

  handleLinkProject = item => {
    this.props.getProjectId(item.project_id)
    this.props.navigation.navigate('proDetails', { })
  }

  render () {
    const company = get(this.props, 'companySelected', {})
    return (
      <Container>
        {/* <NavHeader title='Thông tin công ty' /> */}
        <Content style={{ margin: 16 }}>
          <ArShortName>{company.short_name}</ArShortName>
          <ArName>{company.name}</ArName>
          <Touchable onPress={this.handleChangeImage}>
            <CachedImage
              resizeMode='contain'
              style={{
                width: null,
                height: 143
              }}
              source={
                isEmpty(company.image) ? require('images/logo.png')
                  : { uri: company.image }
              }
            />
          </Touchable>
          {/* <ArImage source={company.image ? { uri: company.image } : require('images/globe/noimage.png')} /> */}
          <LeftText style={{ marginTop: 8 }}>Liên hệ:</LeftText>
          <ContactView>
            {
              map(company.contacts, (item, inx) => (
                <Touchable key={`${inx}`} style={{ paddingRight: 4, paddingTop: 4, paddingBottom: 4 }} onPress={() => this.onShowDetail(item, inx)}>
                  <TextBase style={{color: '#0d52f9'}}>{item.name || item.full_name}</TextBase>
                </Touchable>
              ))
            }
          </ContactView>
          {newRows.map(item => (
            <RowView {...item} value={company[item.key]} />
          ))}
          <CompanyLinkProject id={company.id} user={get(this.props, 'user', {})} onLinkProject={this.handleLinkProject}/>
        </Content>
        <PickerDetailUser
          ref='refDetail'
        />
      </Container>
    )
  }

  componentDidMount () {
    const company = get(this.props, 'companySelected', {})
    const user = get(this.props, 'user', {})
    this.props.navigation.setParams({ company, user })
  }
}

export default connectAutoDispatch(state => ({
  user: state.auth.user,
  companySelected: state.company.companySelected
}), {
  onCompanySelected,
  onChangeImage,
  getProjectId
})(CompanyContainer)
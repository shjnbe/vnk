import React from 'react'
import * as _ from 'lodash'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import {
  View,
  Card,
  Icon,
  Toast
} from 'native-base'
import connectAutoDispatch from '@redux/connect'
import { onNavigate } from '@redux/actions/app'
import moment from 'moment'
import dataKeys from '../pro-details/overview/data-keys'
import RowInput from '../pro-details/overview/row-input'
import { postFollowProject } from '@redux/actions/projectAction'
import MypPicker from 'components/elements/myp-picker'
import dataTask from '../data-task' 
import { CachedImage } from 'react-native-cached-image'
import LinearGradient from 'react-native-linear-gradient'
import ImageCropPicker from 'react-native-image-crop-picker'
import projectApi from 'api/projectApi'
import cities from 'constants/cities';

const TextButton = styled.Text`
  fontSize: 18
  paddingTop: 12
  paddingBottom: 12
  textAlign: center
  backgroundColor: transparent
  fontFamily: Helvetica
  alignSelf: center
  color: white
`

const TextTop = styled.Text`
  fontFamily: Helvetica
  fontSize: 14
  fontWeight: normal
  fontStyle: normal
  letterSpacing: 0
  color: #353a41
`

const RowContainer = styled.TouchableOpacity`
  flexDirection: row
  marginTop: ${props => props.marginTop || 0}
  flex: 1
`
const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

class ProOverview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listRow: [],
      ...dataKeys
      // TODO: Add key
    }
  }

  handleNavigate = (location) => {
    this.props.onNavigate('mapContainer', { location })
  }

  componentDidMount () {
    this.propcessData()
  }

  propcessData () {
    let listRow = []
    let project = { sort_name: '' }
    _.mapKeys(dataKeys, (data, key) => {
        if (key === 'status') {
          project.status = this.props.stautsTask.name
        } else {
          project[key] = ''
        }

        listRow.push({
          key,
          code: key,
          isPick: data.isPick,
          isDate: data.isDate,
          title: data.title,
          value: '',
          isCity: data.isCity,
          isRequie: data.isRequie
        })
    })

    this.setState({
      listRow,
      status_code: this.props.stautsTask.status_code,
      ...project
    })
  }

  handleChangeText = (code, value) => {
    this.setState({ [code]: value })
  }

  handleUploadImage = () => {
    ImageCropPicker.openPicker({
      // width: 670,
      // height: 286,
      // cropping: true,
      cropperChooseText: 'Chọn',
      cropperCancelText: 'Hủy bỏ'
    }).then(async data => {
      try {
        const image = await projectApi.upload(data)
        if (image) {
          this.setState({image})
        } 
      } catch (error) {
        console.log('error: ', error)
      }
    })
    .catch(err => console.log(err))
  }

  handleSave = async () => {
      if (
        !this.state.name || !this.state.invest_type || !this.state.sort_name ||
        !this.state.owner || !this.state.code
        ) {
        Toast.show({
          type: 'warning',
          text: `Vui lòng nhập đầy đủ thông tin.`,
          position: 'top',
          duration: 1000
        })

        return
      }

      let data = _.omit(_.clone(this.state), ['listRow'])
      data.team_id = _.get(this.props, 'user.team_id')
      data.user_id = _.get(this.props, 'user.id')
      data.last_modified = moment().format()
      if (!this.state.start) {
        data.start = null 
      } 
      if (!this.state.finish){
        data.finish = null
      }
      data.cost = _.toNumber(data.cost)
      data.floor_area = _.toNumber(data.floor_area)
      data.floor_count = _.toNumber(data.floor_count)
      data.parent_project_id = null
      const result = await this.props.postFollowProject(data, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(result, 'Cập nhật thành công.')

      if (result) {
        this.props.goBack()
      }
  }

  toastNotification = (result, titleSuccess) => {
    if (result) {
      Toast.show({
        type: 'success',
        text: titleSuccess,
        position: 'top',
        duration: 1000
      })
    } else {
      Toast.show({
        type: 'warning',
        text: `Đã xảy ra lỗi vui lòng thử lại.`,
        position: 'top',
        duration: 1000
      })
    }
  }

  handlePickStatus = () => {
    this.refs.mpStatus.open()
  }

  render () {
    return (
      <View >
        {/* Header */}
        <Card style={{ marginTop: 8, padding: 16 }}>
          <View>
            <RowInput isRequie={true} title={'Tên dự án'} code={'name'} value={this.state.name} onChangeText={this.handleChangeText}/>
            <RowInput isRequie={true} title={'Loại dự án'} code={'invest_type'} value={this.state.invest_type} onChangeText={this.handleChangeText}/>
            <RowInput isRequie={true} title={'Viết tắt'} code={'sort_name'} value={this.state.sort_name} onChangeText={this.handleChangeText}/>
          </View>
        </Card>

        <Card style={{ marginTop: 8, padding: 16 }}>
          <RowContainer onPress={this.handleUploadImage}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}/>
              <TextTop>Ảnh dự án (Ảnh đại diện)</TextTop>
            </View>
            <CachedImage source={this.state.image
              ? { uri: this.state.image }
              : require('images/logo.png')}
              style={{
                width: 78,
                height: 78,
                marginLeft: 2
              }}
            />
          </RowContainer>
          {
            _.size(this.state.listRow) > 0 &&
            _.map(this.state.listRow, (item, index) => (
              <RowInput
                status={this.state.status}
                onPick={this.handlePickStatus}
                {...item}
                onChangeText={this.handleChangeText}/>
            ))
          }
        </Card>
        <Touchable onPress={this.handleSave}>
          <LinearGradient
            colors={['#b92327', '#00acc1']}
            style={{
              margin: 24,
              paddingLeft: 24,
              paddingRight: 24,
              borderRadius: 24,
              height: 44
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TextButton >Thêm dự án</TextButton>
          </LinearGradient>
        </Touchable>
        <MypPicker
          coverScreen={true}
          title='Chọn trạng thái'
          ref='mpStatus'
          value={this.state}
          labelKey='name'
          code='status_code'
          dataSource={dataTask}
          onItemChange={(value, index) => this.setState({ status_code: index, status: _.get(value, 'name') })}
        />
      </View>
    )
  }
}

export default connectAutoDispatch(state => ({
  listBySystem: state.project.listBySystem,
  followProjects: state.project.followProjects,
  user: state.auth.user
}), {
  onNavigate,
  postFollowProject
})(ProOverview)

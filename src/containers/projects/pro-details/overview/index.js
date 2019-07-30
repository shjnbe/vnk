import React from 'react'
import * as _ from 'lodash'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import {
  View,
  Card,
  Icon,
  Thumbnail,
  Toast
} from 'native-base'
import connectAutoDispatch from '@redux/connect'
import { onNavigate } from '@redux/actions/app'
import moment from 'moment'
import dataKeys from './data-keys'
import RowView from './row-view'
import RowInput from './row-input'
import { updateFollowProject } from '@redux/actions/projectAction'
import MypPicker from 'components/elements/myp-picker'
import dataTask from '../../data-task' 
import { CachedImage } from 'react-native-cached-image'
import ImageCropPicker from 'react-native-image-crop-picker'
import projectApi from 'api/projectApi'

const Title = styled.Text`
  fontFamily: Helvetica
  fontSize: ${props => props.textSize || 19}
  fontWeight: normal
  fontStyle: normal
  marginTop: ${props => props.marginTop || 0}
  letterSpacing: 0
  textAlign: center
  color: ${props => props.color || '#0d69f4'}
`

const TextTop = styled.Text`
  fontFamily: Helvetica
  fontSize: 14
  fontWeight: normal
  fontStyle: normal
  letterSpacing: 0
  color: #353a41
`

const RowContainer = styled.View`
  flexDirection: row
  marginTop: ${props => props.marginTop || 0}
  flex: 1
`
const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: props => props.opacity || 0.8
})``

class ProOverview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listRow: [],
      isEdit: false,
      ...this.props.projectSelected
    }
  }

  handleNavigate = (location) => {
    this.props.onNavigate('mapContainer', { location })
  }

  componentDidMount () {
    this.processData(this.props.projectSelected)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.projectSelected, nextProps.projectSelected)) {
      this.processData(nextProps.projectSelected)
    }
  }

  processData (projectSelected) {
    let listRow = []
    _.mapKeys(dataKeys, (data, key) => {
      let value = _.get(projectSelected, key)
      if (key === 'code') {
        // const code =  _.get(projectSelected, 'code') 
        // value = (code && code !== '0') ? code : _.get(projectSelected, 'id')
        const parentId =  _.get(projectSelected, 'parent_project_id')
        value = parentId || _.get(projectSelected, 'id')
      }
     
      listRow.push({
        key,
        code: key,
        fieldType: data.fieldType,
        // isCity: data.isCity,
        // isPick: data.isPick,
        // isDate: data.isDate,
        title: data.title,
        value: value || '',//: data.isDate ? moment(value).format('DD/MM/YYYY') : value
        isRequie: data.isRequie
      })
    })

    this.setState({
      listRow,
      isEdit: false,
      ...projectSelected
    })
  }

  handleChangeText = (code, value) => {
    this.setState({ [code]: value })
  }


  handleEdit = async () => {
    if (this.state.isEdit) {
      let data = _.omit(_.clone(this.state), ['isEdit', 'listRow', 'idParentProjects'])
      data.last_modified = moment().format()
      data.cost = _.toNumber(data.cost)
      data.floor_area = _.toNumber(data.floor_area)
      data.floor_count = _.toNumber(data.floor_count)
      const result = await this.props.updateFollowProject(data, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(result, 'Cập nhật thành công.')
    } else {
      this.setState({
        isEdit: true
      })
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

  handleUploadImage = () => {
    if ( this.state.isEdit ) {
      ImageCropPicker.openPicker({
        width: 670,
        height: 286,
        cropping: true,
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
  }

  _renderEditView = () => {
    if (_.has(this.props, 'projectSelected.parent_project_id') && _.get(this.props, 'projectSelected.is_follow', false)) {
      return (
        <Touchable style={{ flex: 1 }} onPress={this.handleEdit}>
          <Icon name={this.state.isEdit ? 'save': 'edit'} type='Feather' style={{ color: colors.appleGreen }} />
        </Touchable>
      )
    }
    return <View style={{ flex: 1 }}/>
  }

  render () {
    const project = this.props.projectSelected || {}
    return (
      <View >
        {/* Header */}
        <Card style={{ marginTop: 8, padding: 16 }}>
          { this.state.isEdit ?
            <View>
              <RowInput isRequie={true} title={'Tên dự án'} code={'name'} value={project.name} onChangeText={this.handleChangeText}/>
              <RowInput isRequie={true} title={'Loại dự án'} code={'invest_type'} value={project.invest_type} onChangeText={this.handleChangeText}/>
            </View>
            :
            <View>
              <Title>{project.name}</Title>
              <Title marginTop={16} textSize={16} color={'#353a41'}>{project.invest_type}</Title>
            </View>
          }
        </Card>

        <Card style={{ marginTop: 8, padding: 16 }}>
          <RowContainer>
            <View style={{ flex: 1 }}>
              {
                this._renderEditView() 
              }
              <TextTop>Ảnh dự án (Ảnh đại diện)</TextTop>
            </View>
            <Touchable opacity={this.state.isEdit ? 0.6 : 1} onPress={this.handleUploadImage}>
              <CachedImage source={this.state.image
                ? { uri: this.state.image }
                : require('images/logo.png')}
                style={{
                  width: 78,
                  height: 78,
                  marginLeft: 2
                }}
              />
            </Touchable>
          </RowContainer>
          {
            _.map(this.state.listRow, (item, index) => (
              this.state.isEdit ? 
                <RowInput
                  status={this.state.status}
                  onPick={this.handlePickStatus}
                  {...item}
                  onChangeText={this.handleChangeText}/>
                : 
                <RowView {...item}/>
            ))
          }
        </Card>
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
  projectSelected:  state.project.projectSelected
}), {
  onNavigate,
  updateFollowProject
})(ProOverview)

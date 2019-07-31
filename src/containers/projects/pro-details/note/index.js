import React from 'react'
import { Dimensions } from 'react-native'
import {
  Card, Icon, Text, Toast
} from 'native-base'
import moment from 'moment'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import * as _ from 'lodash'
import { updateFollowProject } from '@redux/actions/projectAction'
import connectAutoDispatch from '@redux/connect';
import NoteRow from './note-row'
import NoteInput from './note-input'

const width = Dimensions.get('window').width

const RowButton = styled.View`
  flexDirection: row
  marginTop: ${props => props.marginTop || 0}
  marginTop: 16
  marginBottom: 16
  marginLeft: 12
  justifyContent: flex-end
`

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  paddingTop: 8
  paddingBottom: 8
  paddingRight: 8
  paddingLeft: 8
`
class NotContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      noteData: _.get(this.props, 'projectSelected.custom.note_data', [])
    }
  }

  handleAddNote = () => {
    let noteData = this.state.noteData
    if ( _.size(noteData) === 0 || (_.head(noteData) && _.head(noteData).content && _.head(noteData).title)) {
      noteData.unshift({ time: moment().format('DD/MM/YYYY HH:mm'), content: '', title: ''})
      this.setState({ noteData, isEdit: true })
    } else {
      Toast.show({
        text: 'Vui lòng nhập xong nội dung?',
        type: 'warning',
        position: 'top',
        duration: 1000
      })
    }
  }

  handEditNote = async () => {
    if (this.state.isEdit) {
      if (_.head(this.state.noteData) && _.head(this.state.noteData).content && _.head(this.state.noteData).title) {
        let data = _.omit(this.props.projectSelected, ['idParentProjects'])
        data.custom = { note_data: this.state.noteData}
        const rs = await this.props.updateFollowProject(data, this.props.followProjects,  this.props.listBySystem)
        this.toastNotification(rs, 'Thêm ghi chú thành công.')
        if (rs) {
          this.setState({
            isEdit: false
          })
        }
      } else {
        Toast.show({
          text: 'Vui lòng nhập xong nội dung?',
          type: 'warning',
          position: 'top',
          duration: 1000
        })
      }
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

  handleChangeNote = (key, value , index) => {
    let noteData = this.state.noteData
    if (_.size(noteData) >= index) {
      noteData[index][key] = value
      noteData[index].time = moment().format('DD/MM/YYYY HH:mm')
      this.setState({ noteData })
    }
  }

  render () {
    return (
      <Card style={{ margin: 16 }}>
       <RowButton>
          <Touchable onPress={this.handleAddNote}>
            <Icon name='plus-square' type='Feather' style={{ color: colors.appleGreen }} />
          </Touchable>

          {
            (_.size(this.state.noteData) > 0) &&
            <Touchable onPress={this.handEditNote}>
              <Icon name={this.state.isEdit ? 'save' : 'edit'} type='Feather' style={{ color: colors.appleGreen }} />
            </Touchable>
          }
        </RowButton>
        {
          (_.size(this.state.noteData) > 0) ?
            _.map(this.state.noteData, (item, index) => (
              this.state.isEdit ?
              <NoteInput key={`${index}`} width={width} {...item} inx={index} onValueChange={this.handleChangeNote}/>
              :
              <NoteRow  key={`${index}`} width={width} {...item}/>
            ))
            :
            <Text style={{ margin: 16 }}>Chưa có ghi chú.</Text>
        }
      </Card>
    )
  }
}

export default connectAutoDispatch(state => ({
  listBySystem: state.project.listBySystem,
  followProjects: state.project.followProjects,
  projectSelected:  state.project.projectSelected
}), {
  updateFollowProject
})(NotContainer)

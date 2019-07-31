import React from 'react'
import styled from 'styled-components/native'
import { Container, Content, Icon, Label, List, Fab, Toast } from 'native-base'
import MemberRow from './member-row'

import colors from '../../../themes/colors'
import { updateFollowProject } from '@redux/actions/projectAction'
import connectAutoDispatch from '../../../@redux/connect';
import * as _ from 'lodash'

const CommentView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  height: 40
  backgroundColor: ${props => props.color || '#fafff2'}
`

class MemberListContainer extends React.Component {
  
  state = {
    dataMember: []
  }

  handleMember = (isEdit, index, isAdd) => {
    this.props.navigation.navigate('detailsMember', { isEdit, index, isAdd })
  }

  componentDidMount() {
    const dataMember = _.get(this.props, 'projectSelected.contacts', [])
    this.setState({ dataMember })
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps, this.props)) {
      const dataMember = _.get(nextProps, 'projectSelected.contacts', [])
      this.setState({ dataMember })
    }
  }


  handleMap = () => {
    this.props.navigation.navigate('mapContainer')
  }
  
  handleDelteteContact = async index => {
    let projectSelected = this.props.projectSelected
    let contacts = _.get(projectSelected, 'contacts', [])
    if (_.size(contacts) >= (index + 1) && index > -1) {
      contacts.splice(index, 1)
      projectSelected.contacts = contacts
      const rs = await this.props.updateFollowProject(projectSelected, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(rs)
    } else {
      this.toastNotification(null)
    }
  }

  toastNotification = result => {
    if (result) {
      Toast.show({
        type: 'success',
        text: "Xoá liên hệ thành công",
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

  render () {
    return (
      <Container>
        <CommentView>
          <Icon
            name='users'
            type='Feather'
            style={{ color: '#a8e490', paddingLeft: 16, paddingRight: 8 }}
          />
          <Label>Danh sách thành viên trong dự án</Label>
        </CommentView>
        <Content style={{ paddingLeft: 16, paddingRight: 16 }}>
          {
            _.size(this.state.dataMember) > 0
            ?
            <List>
              {this.state.dataMember.map((item, inx) => (
                <MemberRow 
                  index={inx}
                  key={`${inx}`}
                  {...item}
                  handleMap={this.handleMap}
                  handleMember={this.handleMember}
                  handleDelteteContact={this.handleDelteteContact}
                  />
              ))}
            </List>
            :
            <CommentView color='white'>
              <Icon
                name='list'
                type='Feather'
                style={{ color: '#727272', paddingLeft: 16, paddingRight: 8, fontSize: 18 }}
              />
              <Label>Chưa có danh sách liên hệ</Label>
            </CommentView>
          }
          
        </Content>
        <Fab
          direction='up'
          containerStyle={{}}
          style={{ backgroundColor: colors.tomato }}
          onPress={() => this.handleMember(true, null , true)}>
          <Icon type='Feather' name='plus' />
        </Fab>
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  listBySystem: state.project.listBySystem,
  followProjects: state.project.followProjects,
  projectSelected:  state.project.projectSelected
}), {
  updateFollowProject
})(MemberListContainer)
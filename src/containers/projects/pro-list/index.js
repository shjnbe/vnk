import React from 'react'
import { Platform, StatusBar, FlatList } from 'react-native'
import colors from 'themes/colors'
import * as _ from 'lodash'
import {
  Container,
  Title,
  Header,
  Body,
  Icon,
  Item,
  Toast,
  Text,
  View
} from 'native-base'
import styled from 'styled-components/native'
import Input from 'components/base/Input'
import ProRow from './pro-row'
import mypStyles from 'themes/myp-styles'
import connectAutoDispatch from '@redux/connect';
import { getFollowProjects, postFollowProject, deleteFollowProject, selectedProject } from '@redux/actions/projectAction'
import moment from 'moment'
import ModalDialog from 'components/elements/modal-dialog'

class ProListView extends React.Component {

  state = {
    textSearch: '',
    projectList: []
  }

  componentDidMount() {
    this.setState({
      projectList: this.props.list
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        projectList: nextProps.list
      })
    }
  }

  handleAddCompany = () => {
    this.props.navigation.navigate('addProject')
  }

  handleProjectDetails = project => {
    this.props.selectedProject(project)
    this.props.navigation.navigate('proDetails')
  }

  handleChangeFollow = async (isAdd, project) => {
    if (isAdd) {
      let data = _.omit(_.clone(project), ['idParentProjects', 'id'])
      data.user_id = _.get(this.props, 'user.id')
      data.team_id = _.get(this.props, 'user.team_id')
      data.parent_project_id = project.id
      data.last_modified = moment().format()
      data.status = 'Sàng lọc'
      data.status_code = 1
      const result = await this.props.postFollowProject(data, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(result, `Theo dõi dự án thành công.`)
    } else {
      const rs = _.filter(this.props.followProjects, item => item.parent_project_id === project.parent_project_id)
      if (_.size(rs) > 0) {
        let followProject = rs[0]

        followProject.titleModal = `Bạn muốn huỷ theo dõi dự án này chứ?`
        this.refs.modal.open(followProject)
      }
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

  comfirmDeleteUserProjects = async followProject => {
    const result = await this.props.deleteFollowProject(followProject, this.props.followProjects, this.props.listBySystem)
    this.toastNotification(result, `Huỷ theo dõi dự án thành công.`)
  }

  getData = (textSearch) => {
    if (textSearch) {
      // Remove dấu
      return _.filter(_.clone(this.props.list), ({ name }) => _.includes(_.toLower(_.deburr(name)), _.toLower(_.deburr(textSearch))))
    }

    return this.props.list
  }

  searchProjects = textSearch => {
    let projectList = []
    if (textSearch) {
      projectList = _.filter(this.props.list, ({ name }) => _.includes(_.toLower(_.deburr(name)), _.toLower(_.deburr(textSearch))))

    } else {
      projectList = this.props.list
    }

    this.setState({
      projectList
    })
  }

  _renderItem = ({ item, index }) => (
    <ProRow
      key={`${index}`}
      onPress={this.handleProjectDetails}
      idParentProjects={this.props.idParentProjects}
      onChangeFollow={this.handleChangeFollow}
      {...item}
    />
  )

  _keyExtractor = (item, index) => `${index}`

  handleSearch = () => {
    // const head = _.head(this.state.projectList)
    // if (head) {
    //   this.refs.projectRef.scrollToOffset({offset: 0})
    //   console.log('kakakak')
    // } 
    // this.searchRef.focus()
    this.setState({ focusDescriptionInput: true })
    this.refs.projectRef.scrollToIndex({ index: 1, viewOffset: 0, viewPosition: 0.5 });
    // this.refs.projectRef.scrollToOffset({ animated: true, x: 0, y: 0});
  }

  handleRefreshData = () => {
    if (_.get(this.props, 'user.packageOrder')) {
      this.props.getFollowProjects(_.get(this.props, 'user', {}))
    }
  }

  render() {
    return (
      <Container>
        <StatusBar hidden={Platform.OS === 'android'} />
        <Header noShadow transparent style={mypStyles.styleHeader}>
          <Body style={{ flex: 1, flexDirection: 'row' }}>
            <Icon name='search' style={{ color: colors.rouge }} onPress={this.handleSearch} />
            <Title style={{ color: '#000', flex: 1 }}>Dự Án</Title>
            <Icon
              name='add-circle'
              style={{ color: colors.darkSkyBlue, opacity: _.get(this.props, 'user.packageOrder') ? 1 : 0 }}
              onPress={this.handleAddCompany}
            />
          </Body>
        </Header>
        <View style={{ paddingLeft: 16, paddingRight: 16, marginTop: 8 }}>
          <Item
            regular
            style={{
              height: 42,
              backgroundColor: colors.white,
              borderRadius: 4
            }}
          >
            <Input
              focus={this.state.focusDescriptionInput}
              ref={(input) => { this.searchRef = input; }}
              paddingLeft={10}
              style={{ flex: 1 }}
              placeholder='Tìm kiếm dự án...'
              onChangeText={this.searchProjects}
            />
            <Icon active name='search' style={{ color: colors.black }} />
          </Item>

          {
            (this.props.user.packageOrder ?
              <FlatList
                style={{ marginBottom: 124 }}
                refreshing={this.props.isLoading}
                onRefresh={this.handleRefreshData}
                keyExtractor={this._keyExtractor}
                data={this.state.projectList}
                renderItem={this._renderItem}
                ref='projectRef'
              />
              : <Text
                style={{ fontSize: 15, fontFamily: 'Helvetica', marginTop: 16, textAlign: "center" }}>
                Bạn chưa sử dụng gói dịch vụ nào!
                </Text>
            )
          }
        </View>
        <ModalDialog
          ref='modal'
          title='Bạn muốn huỷ theo dõi dự án này?'
          textOk='Đồng ý'
          textCancel='Hủy'
          onOk={this.comfirmDeleteUserProjects}
        />
      </Container>
    )
  }
}


export default connectAutoDispatch(
  state => (
    {
      isLoading: state.project.isLoading,
      list: state.project.list,
      listBySystem: state.project.listBySystem,
      followProjects: state.project.followProjects,
      idParentProjects: state.project.idParentProjects,
      user: state.auth.user,
    }),
  {
    postFollowProject,
    deleteFollowProject,
    selectedProject,
    getFollowProjects
  }
)(ProListView)

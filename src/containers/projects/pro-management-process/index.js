import React from 'react'
import { Container, Content, Header, Body, Icon, Toast } from 'native-base'
import {
  OvalIconView,
  Row,
  Line,
  OvalTextView,
  DescriptionView,
  RowDes,
  DesFlex,
  RowBase,
  NumberView,
  styles
} from './oval-view'
import mypStyles from '../../../themes/myp-styles'
import styled from 'styled-components/native'
import { withNavigation } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import ModalDialog from 'components/elements/modal-dialog'
import connectAutoDispatch from '../../../@redux/connect';
import { updateFollowProject } from '@redux/actions/projectAction'
import { get, omit, slice, size, map, isNumber } from 'lodash'
import moment from 'moment'
import dataTask from '../data-task'

const UIBackView = withNavigation(props => (
  <Icon
    name='chevron-left'
    type='Feather'
    style={{ color: '#666b65' }}
    onPress={() => props.navigation.goBack()}
  />
))

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

const Title = styled.Text`
fontFamily: Helvetica
fontSize: 18
fontWeight: bold
color: #006dff
flex: 1
textAlign: center
`

const ActionView = styled.View`
marginTop: 70
justifyContent: center
alignItems: center
marginLeft: 30
marginRight: 30`

class ManagementProcessContainer extends React.Component {

  constructor(props) {
    super(props)
    const project = get(props, 'navigation.state.params', {})
    const statusCode = get(project, 'status_code')
    let taskList = []
    if (isNumber(statusCode)) {
      taskList = slice(dataTask, statusCode, statusCode + 2)
    }
    
    this.state = {
      project,
      taskList
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.projectSelected) {
      const project = get(nextProps, 'projectSelected', {})
      const statusCode = get(project, 'status_code')
      let taskList = []
      if (isNumber(statusCode)) {
        taskList = slice(dataTask, statusCode, statusCode + 2)
      }
      this.setState({
        project,
        taskList: taskList || []
      })
    }
  }

  handleStatusChange = () => {
    if (size(this.state.taskList) > 1) {
      this.refs.modal.open(this.state.project) 
    } else {
      Toast.show({
        type: 'warning',
        text: `Đã đến bước cuối cùng. Không thể chuyển tiếp.`,
        position: 'top'
      })
    }
  }

  comfirmChangeTask = async project => {
    let data = omit(project, ['idParentProjects', 'key'])
    data.last_modified = moment().format()
    const nextTask = get(dataTask, `[${project.status_code + 1}]`)
    if (nextTask) {
      data.status_code = nextTask.status_code;
      data.status = nextTask.name;
      const rs = await this.props.updateFollowProject(data, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(rs, "Chuyển trạng thái thành công.")
    }
  }

  toastNotification = (result, titleSuccess) => {
    if (result) {
      Toast.show({
        type: 'success',
        text: titleSuccess,
        position: 'top'
      })
    } else {
      Toast.show({
        type: 'warning',
        text: `Đã xảy ra lỗi vui lòng thử lại.`,
        position: 'top'
      })
    }
  }

  render () {
    return (
      <Container>
        <Header transparent style={mypStyles.styleHeader}>
          <Body
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <UIBackView />
            <Title>QUY TRÌNH QUẢN LÝ DỰ ÁN</Title>
          </Body>
        </Header>
        <Content padder>
          <Row>
            <OvalIconView name='checkmark' bgColor='#00bcd4' />
            <Line />
            <OvalTextView label='1' bgColor='#e8fb60' color='#4f4b4b' />
            <Line />
            <OvalTextView label='2' bgColor='#13f9d8' color='#4f4b4b' />
          </Row>
          <RowDes>
            <DesFlex style={{ paddingLeft: 16, textAlign: 'left' }}>
              Dự án
            </DesFlex>
            <DesFlex>Sàng lọc</DesFlex>
            <DesFlex textAlign='right'>Gọi điện</DesFlex>
          </RowDes>

          <Row>
            <OvalTextView label='3' bgColor='#9cf732' color='#4f4b4b' />
            <Line />
            <OvalTextView label='4' />
            <Line />
            <OvalTextView label='5' bgColor='#f91a06' />
          </Row>
          <RowDes>
            <DescriptionView textAlign='left'>
              Giới thiệu về công ty (USP)
            </DescriptionView>
            <DescriptionView>Thuyết trình giải pháp</DescriptionView>
            <DescriptionView textAlign='right'>Chào giá</DescriptionView>
          </RowDes>

          <Row>
            <OvalTextView label='6' bgColor='#fa9703' />
            <Line />
            <OvalTextView label='7' bgColor='#00bcd4' />
            <Line />
            <OvalIconView name='checkmark' bgColor='#00bcd4' />
          </Row>
          <RowDes>
            <DescriptionView>Thương thảo giá</DescriptionView>
            <DescriptionView>Thương thảo hợp đồng</DescriptionView>
            <DescriptionView textAlign='right'>CLOSE</DescriptionView>
          </RowDes>
          <RowBase>

            {
              map(this.state.taskList, item => (
                <ActionView key={`${item.status_code}`}>
                  <NumberView>{item.status_code}</NumberView>
                  <OvalTextView
                    label={item.name}
                    size={72}
                    color={item.colorText}
                    bgColor={item.color}
                    fontSize={10}
                  />
                </ActionView>
              ))
            }
          </RowBase>
          <RowBase style={{ marginTop: 32 }}>
            <Touchable onPress={this.handleStatusChange}>
              <LinearGradient
                colors={['#b92327', '#00acc1']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Title style={styles.buttonText}>Chuyển trạng thái</Title>
              </LinearGradient>
            </Touchable>
          </RowBase>
        </Content>
        <ModalDialog
          ref='modal'
          title='Xác nhận chuyển trạng thái?'
          textOk='Đồng ý'
          textCancel='Hủy'
          onOk={this.comfirmChangeTask}
        />
      </Container>
    )
  }
}

export default connectAutoDispatch(
  state => (
    { 
      listBySystem: state.project.listBySystem,
      followProjects: state.project.followProjects,
      projectSelected:  state.project.projectSelected
    }),
  {
    updateFollowProject
  }
)( ManagementProcessContainer )

import React from 'react'
import { FlatList } from 'react-native'
import { Container, Content } from 'native-base'
import NavHeader from 'components/elements/nav-header'
import PickerMonth from './search-salary';
import moment from 'moment'
import salaryApi from 'api/salaryApi'
import authApi from '../../api/authApi'
import RowSalary from './row-salary';
import * as _ from 'lodash'
import { NavigationEvents } from 'react-navigation'
import styled from 'styled-components/native'
import colors from '../../themes/colors'
import connectAutoDispatch from '../../@redux/connect';

const ContentView = styled(Content).attrs({scrollEnabled: false})`
borderTopColor: ${colors.pinkishGrey}
borderTopWidth: 0.5
`

class SalaryConfirmation extends React.Component {

  state = {
    monthCurrent: moment().format('MM/YYYY'),
    data: [],
    users: {}
  }

  onValueChange = monthCurrent => {
    this.setState({ monthCurrent }, () => this.findData())
  }

  // componentDidMount() {
  //   this.findData()
  // }

  async findData() {
    const arr = _.split(this.state.monthCurrent, '/')
    const filter = { where: { team_id: this.props.team_id, month: Number(arr[0]), year: Number(arr[1]) } }
    const data = await salaryApi.getAll(filter)
    const userRes = await authApi.getUsers({ where: { team_id: filter.where.team_id } })
    const users = _.keyBy(userRes, ({ id }) => `KEY_${id}`)
    this.setState({ users, data })
  }


  handleItem = data => {
    this.props.navigation.navigate('kpiDetail', { data })
  }

  _renderItem = ({ item }) => {
    return (
      <RowSalary item={item} user={_.get(this.state.users, [`KEY_${item.user_id}`], {})}
        onPress={this.handleItem}
      />
    )
  }

  handleDidFocus = () => {
    this.findData()
  }

  render() {
    return (
      <Container>
        <NavHeader navigation={this.props.navigation} isBack title='Danh sách xác nhận doanh thu' isRight />
        <PickerMonth onValueChange={this.onValueChange} monthCurrent={this.state.monthCurrent} />
        <ContentView>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={({ id }) => `${id}`}
          />
        </ContentView>
        <NavigationEvents
          onDidFocus={this.handleDidFocus}
        />
      </Container>
    )
  }
}

export default connectAutoDispatch(
  state => ({
    team_id: _.get(state, 'auth.user.team_id'),
  }),
  {}
)(SalaryConfirmation)
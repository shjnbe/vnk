import React from 'react'
import styled from 'styled-components/native'
import { Row, View, ListItem, Text, Body } from 'native-base'
import companyApi from 'api/companyApi';
import Touchable from 'components/base/Touchable';
import * as _ from 'lodash'

const TextBase = styled.Text`
  fontFamily: Helvetica
  fontStyle: normal
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

export default class CompanyLinkProject extends React.Component {
  state = {
    data: []
  }

  handleOpenProject = item => {
    console.log('press', item)
    if (this.props.onLinkProject)
      this.props.onLinkProject(item)
  }

  render () {
    return (
      <View>
        <Row>
          <LeftText>Dự án liên quan đến công ty:</LeftText>
        </Row>
        {
          _.map(this.state.data, item => 
            <ListItem key={`${item.id}`} onPress={() => this.handleOpenProject(item)}>
              <Body>
                <Text style={{fontSize: 11}}>{item.project_name}</Text>
                {/* <Text note>{item.full_name}</Text> */}
              </Body>
            </ListItem>
          )
        }
      </View>
    )
  }

  async componentDidMount () {
    try {
      const data = await companyApi.projectByCompanyId({company_id: _.get(this.props, 'id', 0), access_token: _.get(this.props, 'user.access_token', '')})
      this.setState({data})
    } catch (error) {
      
    }
  }
}
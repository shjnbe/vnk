import React from 'react'
import Modal from 'react-native-modalbox'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import { Container, Accordion, View, Content, ListItem, Left, Text, Right, Icon } from 'native-base';
import IntroContainer from './introduction';
import Help from './help-new'
import Note from './note-container'
import Roles from './roles-container'
import Contact from './contact-container'

const rows = [
  {
    key: 'intro',
    title: 'Giới thiệu',
    content: <IntroContainer />
  },
  {
    key: 'help',
    title: 'Hướng dẫn sử dụng phần mềm',
    content: <Help />
  },
  {
    key: 'note',
    title: 'Những lưu ý để trở thành người bán hàng hiệu quả',
    content: <Note />
  },
  {
    key: 'roles',
    title: 'Các quyền lợi của gói dịch vụ',
    content: <Roles />
  },
  {
    key: 'contact',
    title: 'Thông tin liên hệ',
    content: <Contact />
  }
]

export default class HelpContainer extends React.Component {
  

  _renderContent = ({ content }) => {
    if (content) {
      return content
    }
    return <View />
  }

  render () {
    return (
      <Container>
        <Content>
          <Accordion 
            dataArray={rows}
            // renderHeader={this._renderHeader}
            headerStyle={{ 
              backgroundColor: '#FAFAFA', 
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
              paddingBottom: 16,
              paddingTop: 16 }}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    )
  }
}

import React from 'react'
import { Modal } from 'react-native'
import { Container, Content, Text, Item, Textarea, Input, Icon, Header, Left } from 'native-base'
import { NavModalHeader } from 'components/elements/nav-header'
import * as _ from 'lodash'

export default class EditKpiComponent extends React.Component {

  state = {
    visible: false, month_salary: 0, note: ''
  }

  onOpen({ month_salary = 0, note = '' }) {
    this.setState({ visible: true, month_salary, note })
  }

  onClose = () => { this.setState({ visible: false }) }

  handleSave = () => {
    const { month_salary = 0, note = '' } = this.state
    this.props.onSave({ month_salary: Number(month_salary), note })
    this.onClose()
  }

  onChangeSalary = month_salary => {
    month_salary = `${month_salary}`.replace(RegExp(/,/g), '')
    this.setState({ month_salary: Number(month_salary) })
  }

  onChangeNote = note => {
    this.setState({ note })
  }

  render() {
    return (
      <Modal visible={this.state.visible} animationType='fade'>
        <Container>
          <NavModalHeader onBack={this.onClose} title='Điều chỉnh KPIs' onSave={this.handleSave} />
          <Content padder>
            <Item>
              <Input placeholder='Lương tháng'
                value={this.state.month_salary.toLocaleString()}
                onChangeText={this.onChangeSalary}
              />
            </Item>
            
            <Textarea rowSpan={5} bordered placeholder="Ghi chú" value={this.state.note} onChangeText={this.onChangeNote} />
          </Content>
        </Container>
      </Modal>
    )
  }
}
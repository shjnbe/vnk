// , Vị trí, Mobile, Email,Vai trò, Công ty, Địa chỉ

import React from 'react'
import { Item, Label, Form, Input, Content, Container, Button, Text, Toast } from 'native-base'
import * as _ from 'lodash'
import connectAutoDispatch from '../../@redux/connect';
import { onCompanyUpdate } from '@redux/actions/companyAction'

class ContactNewContainer extends React.Component {

  constructor (props) {
    super (props)
    const contact = _.get(props, 'navigation.state.params.contact', {})
    const index = _.get(props, 'navigation.state.params.index', -1)
    this.state = {
      index: -1,
      ...contact,
      index,
      disabled: true
    }
  }

  handleChangeText = (code, value) => {
    this.setState({ [code]: value })
  }

  handleSave = async () => {
    const company = _.get(this.props, 'companySelected', {})
    
    const contacts = _.get(company, 'contacts', [])
    if (this.state.index < contacts.length) {
      contacts[this.state.index] = _.pick(this.state, ['name', 'position', 'type', 'email', 'phone', 'address', 'company'])
    }
    company.contacts = contacts
    const rs = await this.props.onCompanyUpdate(company, this.props.user)
    if (rs) {
      Toast.show({
        type: 'success',
        text: 'Lưu thành công',
        position: 'top'
      })
      this.props.navigation.goBack()
    } else {
      Toast.show({
        type: 'warning',
        text: 'Lưu không thành công',
        position: 'top'
      })
    }
  }

  handleClick = () => {
    if (this.state.disabled) {
      this.setState({ disabled: false })
      this.props.navigation.setParams({
        onClick: this.handleClick,
        disabled: false
      })
    } else {
      this.handleSave()
      this.setState({ disabled: true })
      this.props.navigation.setParams({
        onClick: this.handleClick,
        disabled: true
      })
    }
    // const disabled = !this.state.disabled
    
  }

  componentDidMount () {
    this.props.navigation.setParams({
      onClick: this.handleClick,
      disabled: this.state.disabled
    })
  }

  render () {
    const disabled = this.state.disabled
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Tên đầy đủ</Label>
              <Input value={this.state.name || this.state.full_name} onChangeText={value => this.handleChangeText('name', value)} disabled={disabled}/>
            </Item>
            <Item floatingLabel>
              <Label>Vị trí</Label>
              <Input disabled={disabled} value={this.state.position} onChangeText={value => this.handleChangeText('position', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Mobile</Label>
              <Input disabled={disabled} value={this.state.phone} keyboardType='phone-pad' onChangeText={value => this.handleChangeText('phone', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email} autoCapitalize='none'
                disabled={disabled}
                keyboardType='email-address'
                onChangeText={value => this.handleChangeText('email', value)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Vai trò</Label>
              <Input 
                disabled={disabled}
                value={this.state.type}
                onChangeText={value => this.handleChangeText('type', value)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Công ty</Label>
              <Input disabled={disabled} value={this.state.company} onChangeText={value => this.handleChangeText('company', value)} />
            </Item>
            <Item floatingLabel>
              <Label>Địa chỉ</Label>
              <Input disabled={disabled} value={this.state.address} onChangeText={value => this.handleChangeText('address', value)}/>
            </Item>
            {
              // !disabled && (
              //   <Button full style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }} onPress={this.handleSave}>
              //     <Text>Lưu</Text>
              //   </Button>
              // )
            }
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: state.auth.user,
  companySelected: state.company.companySelected
}), {
  onCompanyUpdate
})(ContactNewContainer)
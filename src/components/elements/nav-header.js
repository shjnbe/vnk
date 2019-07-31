import React from 'react'
import { Header, Body, Icon, Title, Left, Right } from 'native-base'
import colors from '../../themes/colors'
import mypStyles from '../../themes/myp-styles';
import styled from 'styled-components/native'

const IconView = styled(Icon).attrs({
  type: 'Feather'
})`
  color: ${props => props.color || '#f61b1b'} fontSize: 22 paddingHorizontal: 4 paddingVertical: 4
`

export default class NavHeader1 extends React.Component {
  handleBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Header
        noShadow={this.props.isBack}
        transparent
        style={[mypStyles.styleHeader, { justifyContent: 'center', alignItems: 'center', paddingLeft: 0 }]}
      >
        {this.props.isBack && (
          <Icon
            name='chevron-left'
            type='Feather'
            onPress={this.handleBack}
          />
        )}
        <Title style={{ color: '#000', flex: 1, textAlign: 'center' }}>{this.props.title}</Title>
        {!this.props.isRight && (
          <Icon name='person' style={{ color: colors.rouge }} />
        )}
      </Header>
    )
  }
}


export class NavHeader extends React.Component {
  handleBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Header
        noShadow={this.props.isBack}
        transparent
        style={[mypStyles.styleHeader, { justifyContent: 'center', alignItems: 'center', paddingLeft: 0 }]}
      >
        {this.props.isBack && (
          <Icon
            name='chevron-left'
            type='Feather'
            onPress={this.handleBack}
          />
        )}
        <Title style={{ color: '#000', flex: 1, textAlign: 'center' }}>{this.props.title}</Title>
        <IconView onPress={this.props.onEdit} name='edit' color='#f61b1b' />
        <IconView onPress={this.props.onSave} name='check' color='#00ac00' />
      </Header>
    )
  }
}

export class NavModalHeader extends React.Component {
  handleBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Header
        transparent
        style={[mypStyles.styleHeader, { justifyContent: 'center', alignItems: 'center', paddingLeft: 0 }]}
      >
        <Icon
          name='chevron-left'
          type='Feather'
          onPress={this.props.onBack}
        />
        <Title style={{ color: '#000', flex: 1, textAlign: 'center' }}>{this.props.title}</Title>
        <IconView onPress={this.props.onSave} name='check' color='#00ac00' />
      </Header>
    )
  }
}

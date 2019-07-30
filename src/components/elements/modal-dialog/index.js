import React from 'react'
import Modal from 'react-native-modalbox'
import styled from 'styled-components/native'
import colors from 'themes/colors'

const Footer = styled.View`
  flexDirection: row
  marginBottom:12
`

const Content = styled.View`
  flex: 1
  justifyContent: center
  alignItems: center
`

const Touchable = styled.TouchableOpacity`
width: 109
height: 50
borderRadius: 8
backgroundColor: ${props => props.backgroundColor || ' #5c93f8'}
justifyContent: center
alignItems: center
marginLeft: 8
marginRight: 8
`

const Text = styled.Text`
fontFamily: Helvetica
fontSize: 18
fontWeight: bold
color: ${colors.white}
`

const Title = styled.Text`
  fontFamily: Helvetica
  fontSize: 18
  letterSpacing: 0
  paddingLeft: 8
  paddingRight: 8
`

export default class ModalDialog extends React.PureComponent {

  state = {
    data: null
  }

  open = data => {
    this.setState({data})
    this.refs.modal.open()
  }

  handleCancel = () => {
    this.refs.modal.close()
  }

  handleOk = () => {
    this.refs.modal.close()
    if (this.props.onOk) {
      this.props.onOk(this.state.data)
    }
  }

  render () {
    return (
      <Modal
        ref='modal'
        backdropPressToClose={false}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          height: 200,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#979797'
        }}
        position='center'
      >
        <Content>
          <Title>{(this.state.data && this.state.data.titleModal) || this.props.title}</Title>
        </Content>
        <Footer>
          <Touchable onPress={this.handleOk}>
            <Text>{this.props.textOk || 'OK'}</Text>
          </Touchable>
          <Touchable backgroundColor='#ba2a2d' onPress={this.handleCancel}>
            <Text>{this.props.textCancel || 'Hủy'}</Text>
          </Touchable>
        </Footer>
      </Modal>
    )
  }
}

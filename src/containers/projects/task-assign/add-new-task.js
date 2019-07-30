import React from 'react'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modalbox'
import { View, Text, DatePicker, Textarea, Button, Icon } from 'native-base'


export default class AddNewTaskComponent extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      content: '',
      project_id: null
    }
  }

  open = () => {
    this.refs.newTask.open()
  }

  handleClose = () => {
    this.refs.newTask.close()
    this.setState({ content: '' })
  }

  handleSave = () => {
    if (this.props.onAddTask) this.props.onAddTask(this.state.content)
    this.handleClose()
  }

  onValueChange = content => {
    this.setState({content})
  }

  render () {
    return (
      <Modal ref='newTask' style={{
        height: 270,
        borderRadius: 5,
        width: Dimensions.get('screen').width - 80
       }} position='center'
       swipeToClose={false}
       backdropPressToClose={false}
     >
       <View style={{borderRadius: 5}}>
         <View style={{justifyContent: 'center', alignItems: 'center', height: 50}}>
           <Text style={{fontWeight: 'bold'}}>Giao việc</Text>
         </View>
         <Textarea onChangeText={this.onValueChange} rowSpan={6} bordered placeholder='Nhập nội dung...' />
         {/* <DatePicker
           defaultDate={this.state.today}
           modalTransparent={false}
           animationType={"fade"}
           androidMode={"default"}
           placeHolderText={moment(this.state.today).format('DD/MM/YYYY')}
           onDateChange={this.handleDateChange}
          /> */}
         <View style={{justifyContent: 'flex-end', alignItems: 'center', marginTop: 12, paddingRight: 16, flexDirection: 'row'}}>
           <Button onPress={this.handleClose} bordered danger small style={{ marginRight: 16 }}><Text>Đóng</Text></Button>
           <Button iconRight disabled={this.state.content === ''} bordered danger small onPress={this.handleSave}>
            <Text>Giao việc</Text>
            <Icon name='send' />
          </Button>
         </View>
       </View>
     </Modal>
    )
  }
}
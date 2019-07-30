import React from 'react'
import { SwipeRow, ListItem, Text, Body, Icon, Button, Right } from 'native-base'
import moment from 'moment'

export default props => (
  // <SwipeRow
  //   // rightOpenValue={-75}
  //   // right={
  //   //   <Button danger onPress={() => alert('Trash')}>
  //   //     <Icon active name='edit' type='Feather' />
  //   //   </Button>
  //   // }
  //   body={
  //     <Body>
  //       <Text><Icon style={{ fontSize: 18 }} name='calendar' />{` `} { moment(props.date).format('HH:mm DD/MM/YYYY') } </Text>
  //       <Text note>{props.content} {` `}</Text>
  //     </Body>
  //   }
  // />
  <ListItem>
    
    <Body>
      <Text>{props.content} {` `}</Text>
    </Body>
    <Right>
      <Text note>{` `} { moment(props.date).format('HH:mm') } </Text>
    </Right>
  </ListItem>
)
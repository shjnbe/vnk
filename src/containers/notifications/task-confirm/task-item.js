import React from 'react'
import { SwipeRow, Text, Body, Icon, Button, Right, ListItem } from 'native-base'
import moment from 'moment'
import styled from 'styled-components/native'
import colors from 'themes/colors';

// const ListItem = styled.View`
//   borderRadius: 3
//   borderColor: ${colors.azure}
//   borderWidth: 1
//   marginTop: 16
//   paddingLeft: 16
//   paddingBottom: 12
//   paddingRight: 16
//   paddingTop: 12
// `

export default props => (
  <ListItem onPress={props.onPress}>
    <Body>
      <Text>{props.content} {` `}</Text>
      <Text style={{marginTop: 4}} note><Icon name='calendar' style={{color: 'gray', fontSize: 15}}/> {` `} { moment(props.created).format('DD/MM/YYYY HH:mm') }</Text>
    </Body>
    {
      props.project_id && <Right>
      <Icon name="chevron-right"  type='Feather'/>
    </Right>
    }
  </ListItem>
)
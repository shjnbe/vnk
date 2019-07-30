import React from 'react'
import { ListItem, List, Body, Text } from 'native-base';
import moment from 'moment'
import * as _ from 'lodash'

export default props => {
  const ls = _.orderBy(_.get(props, 'list', []), ['date'], ['desc'])
  return (
    <List>
    {
      ls.map(({key, date, content}) => 
        <ListItem key={`${key}`}>
          <Body>
            <Text>{content}</Text>
            <Text note>{moment(date).format('MMM DD YYYY HH:mm')}</Text>
          </Body>
        </ListItem>
      )
    }
  </List>)
}
import React from 'react'
import Placeholder from 'rn-placeholder';
import { Card, View } from 'native-base'
 const PlaceholderItem = props => (
  <Card style={{marginTop: 8, padding: 8}}>
    <Placeholder.ImageContent
      size={60}
      animate="fade"
      lineNumber={4}
      lineSpacing={5}
      lastLineWidth="30%"
    >
    </Placeholder.ImageContent>
  </Card>
)

export default  props => (
  <View>
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
  </View>
)
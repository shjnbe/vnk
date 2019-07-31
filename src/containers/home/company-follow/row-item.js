import React from 'react'
import { Card, View, Icon } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../../themes/colors';
import { CachedImage } from 'react-native-cached-image'
import { Touchable } from '../../../components/base';

const IconPlus = styled.Image.attrs({
  source: require('../../../images/globe/plus-button.png')
})`
  width: 30
  height: 30
  position: absolute
  top: 8
  right: 8
`

const Title = styled.Text.attrs({numberOfLines: 2})`
flex: 1
paddingTop: 4
paddingBottom: 2
paddingLeft: 4
paddingRight: 4
fontSize: 14
fontWeight: 500
color: #007aff
textAlign: center
fontFamily: Helvetica

`
const Text = styled.Text``
const SubText = styled.Text.attrs({numberOfLines: 1})`
fontFamily: Helvetica
fontSize: 12
textAlign: center
color: #e60521
paddingBottom: 4
`

const shadowStyle = {
  borderRadius: 3,
  shadowColor: "rgba(0, 0, 0, 0.4)",
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 1,
  shadowOpacity: 1
}

export default class RowItem extends React.Component {


  renderPhone = () => {
    return this.props.phone  ? <SubText>{this.props.phone}</SubText> : <Text />
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.size !== this.props.size
    || nextProps.style !== this.props.style
    || nextProps.image !== this.props.image
    || nextProps.title !== this.props.title

  }

  render () {
    const { style, image, title } = this.props
    return (
      <Touchable style={style} onPress={this.props.onPress}>
        <Card
          style={[
            shadowStyle,
            { width: this.props.size-4, height: (this.props.size * 3) / 2 }
          ]}
          onLayout={this.onLayout}
        >
          <CachedImage
            resizeMode='stretch'
            style={{
              width: this.props.size-5,
//              height: this.props.size*3/2
              height: this.props.size-5
            }}
            source={
              image ? { uri: image } : require('../../../images/logo.png')
            }
          />
          <View
            style={{
              position: 'absolute',
              bottom: 4,
              right: 8,
              left: 8,
              borderWidth: 1,
              borderColor: '#979797',
              backgroundColor: colors.white,
              borderRadius: 8,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowRadius: 4,
              shadowOpacity: 1
            }}
          >
            <Title>{title || `  `}</Title>
            {this.renderPhone()}
          </View>
          <IconPlus />
        </Card>
      </Touchable>
    )
  }
}

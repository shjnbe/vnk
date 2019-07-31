import React from 'react'
import styled from 'styled-components/native'

import FCM from 'react-native-fcm';
import connectAutoDispatch from '../@redux/connect';

const BadgeView = styled.View`
  position: absolute
  right: -4
  top: -4
  zIndex: 999
  backgroundColor: red
  borderRadius: 6
  paddingVertical: 2
  paddingHorizontal: 2
  minWidth: 16

`

const BadgeTitle = styled.Text.attrs({ numberOfLines: 1 })`
  fontSize: 9
  color: white fontWeight: bold
  textAlign: center
`

const View = styled.View``

const TabIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: ${props => props.size || 20}
  height: ${props => props.size || 20}
`

// export default View

class BadgeIcon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      badge: 5
    }
  }

  async componentDidMount() {
    const badge = await FCM.getBadgeNumber()
    this.setState({ badge })

  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.focused !== nextProps.focused || this.props.badge !== nextProps.badge) {
      // const badge = await FCM.getBadgeNumber()
      this.setState({ badge: nextProps.badge })
    }
  }

  render() {
    if (this.state.badge === 0) return <TabIcon source={this.props.focused ? require('../images/tabs/tab-notify-active.png') : require('../images/tabs/tab-notify.png')} />
    return (
      <View>
        <BadgeView><BadgeTitle>{this.state.badge < 100 ? this.state.badge : '99+'}</BadgeTitle></BadgeView>
        {
          <TabIcon source={this.props.focused ? require('../images/tabs/tab-notify-active.png') : require('../images/tabs/tab-notify.png')} />
        }
      </View>
    )
  }
}

export default connectAutoDispatch(state => ({ badge: state.notify.badge }))(BadgeIcon)

export class IconWithBadge extends React.Component {
  render() {
    const { badgeCount, focused } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        {/* <TabIcon source={focused ? require('../images/tabs/tab-home-active.png') : require('../images/tabs/tab-home.png')} /> */}
        {/* { badgeCount > 0 && (
          <View style={{
            // If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <BadgeTitle>{badgeCount}</BadgeTitle>
          </View>
        )} */}
      </View>
    );
  }
}
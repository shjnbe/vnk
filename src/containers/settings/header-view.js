import React from 'react'
import { Header } from 'native-base'
// import styled from 'styled-components/native'
// import { withNavigation } from 'react-navigation'
import NavigationBar from 'react-native-navbar'

// import colors from '../../themes/colors'
import mypStyles from '../../themes/myp-styles'

// const Wrapper = styled.View`
// flexDirection: row flex: 1
// justifyContent: space-between
// alignItems: center
// `

// const UIBackView = withNavigation(props => (
//   <Icon
//     name='chevron-left'
//     type='Feather'
//     onPress={() => props.navigation.goBack()}
//   />
// ))

export default props => (
  // <Header transparent style={mypStyles.styleHeader}>
  //   <Wrapper>
  //     <UIBackView />
  //     <Title style={{ color: colors.black, flex: 1 }}>{props.title}</Title>
  //     {props.rights ? (
  //       props.rights
  //     ) : (
  //       <Icon
  //         name='edit'
  //         type='Feather'
  //         style={{ color: colors.appleGreen }}
  //         onPress={props.onRight}
  //       />
  //     )}
  //   </Wrapper>
  // </Header>
  <Header transparent style={mypStyles.styleHeader}>
    <NavigationBar
      style={{ borderBottomColor: 'red' }}
      title={{
        title: props.title
      }}
    />
  </Header>
)

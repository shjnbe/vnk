import React from 'react'
import styled from 'styled-components/native'

const DividerView = styled.View``

const Divider = ({ style }) => (
  <DividerView style={[{ height: 1, backgroundColor: '#e1e8ee' }, style]} />
)

export default Divider

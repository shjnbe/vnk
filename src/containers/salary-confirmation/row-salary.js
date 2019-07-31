import React from 'react'
import { ListItem, Text, Row, View, Icon } from 'native-base'
import styled from 'styled-components/native'
import moment from 'moment'
import colors from '../../themes/colors'
import * as _ from 'lodash'
import { SALES } from 'constants/position-sale'

const TextView = styled(Text)`
  color: ${props => props.color || colors.greyishBrown} fontSize: 13
`

const RowView = styled(Row)`
  paddingVertical: 4 alignItems: center
`

const IconView = styled(Icon).attrs({
  name: 'check', type: 'Feather'
})`
  fontSize: 18 fontWeight: bold color: ${props => props.color || 'transparent'} marginRight: 2
`

export default ({ item, user, onPress }) => (
  <ListItem style={{ marginLeft: 0, paddingHorizontal: 16, paddingVertical: 8 }} onPress={() => {
    if (onPress) { onPress({ kpi: item, user }) }
  }}>
    <View style={{ flex: 1 }}>
      <RowView>
        <IconView />
        <TextView style={{ width: 90 }}><TextView color='#e00024'>{item.totalScore}</TextView> Điểm</TextView>
        <TextView style={{ flex: 1 }}>Chốt đơn hàng: {item.chot_don_hang}</TextView>
        <TextView color='#d0021b'>{item.month_salary.toLocaleString()}</TextView>
      </RowView>
      <RowView>
        <IconView />
        <TextView style={{ width: 90 }} color='#2998ff'>{moment().month(item.month).year(item.year).endOf('months').format('DD/MM/YYYY')}</TextView>
        <TextView style={{ flex: 1 }} color='#8e8e92'>{_.get(SALES, [user.saleteam_position, 'name'], '  ')}</TextView>
      </RowView>
      <RowView>
        <IconView color={item.status === 0 ? '#e00024' : '#3f7600'} />
        <TextView style={{ width: 90 }} color={item.status === 0 ? '#e00024' : '#3f7600'}>{item.status === 0 ? 'CHỜ DUYỆT' : 'ĐÃ DUYỆT'}</TextView>
        <TextView style={{ flex: 1 }} color='#2998ff'>{user.full_name}</TextView>
        <IconView name='chevron-right' color='#8e8e92' style={{ marginRight: 0 }} />
      </RowView>
    </View>
  </ListItem>
)
import React from 'react'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import { Card, H3 } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { TableRow, RowHeader } from './component-help';

const WrapperView = styled.View`paddingLeft: 16 paddingRight: 16 paddingTop: 8 paddingBottom: 8 flex: 1`

const item = {
  bold: true, title: 'Chức năng', basic: 'Gói Basic', standard: 'Gói Standard', enterprice: 'Gói Enterprice'
}

const tableTitle = [
  {title: 'Thêm Task', bold: true, basic: 'v', standard: 'v'},
  {title: 'Thêm thông tin dự án', bold: true, basic: 'v', standard: 'v'},
  {title: '- Thêm người liên hệ', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm ghi chú', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm theo dõi', bold: false, basic: 'v', standard: 'v'},
  {title: 'Thêm thông tin công ty', bold: true, basic: 'v', standard: 'v'},
  {title: '- Thêm giám đốc', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm địa chỉ', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm web site', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm điện thoại', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm Email', bold: false, basic: 'v', standard: 'v'},
  {title: '- Thêm các cập nhật, ghi chú', bold: false, basic: 'v', standard: 'v'},
  {title: 'Sử dụng Sale pipe line', bold: true, basic: 'v', standard: 'v'},
  {title: 'Thiết lập thời gian giữa các trạng thái', bold: true, basic: 'v', standard: 'v'},
  {title: 'Thiết lập KPI cá nhân', bold: true, basic: 'v', standard: 'v'},
  {title: 'Thông báo mẹo bán hàng, ưu đãi', bold: true, basic: 'v', standard: 'v'},
  {title: 'Thông báo dự án đang theo dõi', bold: true, basic: 'v', standard: 'v'},
  {title: 'Thông báo dự án từ hệ thống', bold: true, standard: 'v'},
  {title: 'Thiết lập nhóm bán hàng', bold: true},
  {title: 'Thông báo nội bộ nhóm', bold: true},
  {title: 'Phân chia dự án cho từng thành viên trong nhóm', bold: true},
  {title: 'Đo lường hiệu quả, doanh số từng thành viên', bold: true},
  {title: 'Xác nhận doanh thu cho từng thành viên', bold: true}
]

export default class HelpContainer extends React.PureComponent {
  render () {
    return (
      <WrapperView>
        <RowHeader />
        {
          tableTitle.map((item, index) => <TableRow {...item} key={`${index}`}/>)
        }
      </WrapperView>
    )
  }
}
const styles = {
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
}
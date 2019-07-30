import React from 'react'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import { Card, H3 } from 'native-base';
import { P, P1, Ar, ArImage } from './component-help'

const WrapperView = styled.View`paddingLeft: 16 paddingRight: 16 paddingTop: 8 paddingBottom: 8`

export default class IntroContainer extends React.PureComponent {
  render () {
    return (
      <WrapperView>
        <P>Phần mềm My Project “Dự án của tôi” được thiết kế trên kinh nghiệm hơn 10 năm làm kinh doanh và tích lũy kiến thức hàng tỷ đồng học tập từ các chuyên gia bán hàng lớn trên thế giới của tôi.</P>
        <P>Bạn sẻ thấy được doanh số tăng lên bất ngờ dựa trên một đường ống bán hàng tối ưu “Sale Pipe Line” mà tôi đã thiết kế trong phần mềm này.</P>
        <P1>1.	Phần mềm đặc biệt này sẽ giúp bạn gia tăng doanh số bằng việc cung cấp các thông tin dự án, giúp bạn tiết kiệm hàng 100 giờ tìm kiếm mỗi năm.</P1>
        <P1>2.	Phần mềm sẽ là người thư ký để ghi chép lại các nội dung bạn đã thảo luận với khách hàng, giúp bạn biết được các bên liên quan đến dự án mà bạn đang tiếp cận.</P1>
        <P1>3.	Phần mềm sẽ là người đôn đốc nhắc nhở bạn giúp bạn vượt qua được sức ỳ khi bán hàng.</P1>
        <P1>4.	Phần mềm sẽ giúp bạn quản lý đội nhóm, phân công công việc và tạo ra một đội nhóm bán hàng vô địch.</P1>
        <P1>5.	Phần mềm cũng giúp bạn tiến trình chi tiết để đi đến thành công của một đơn hàng và bạn chỉ cần xử lý đúng tiến trình đấy thì tỷ lệ thành công sẽ rất cao.</P1>
        <ArImage source={require('./imgs/pic-logo.png')}/>
        <P>Khẩu hiệu của chúng tôi là “Save time more projects” và với phần mềm tuyệt vời này các bạn sẽ tiết kiệm được nhiều thời gian nhưng vẫn có nhiều dự án thành công. Nào hãy tận hưởng nó ngay bây giờ bạn nhé!</P>
      </WrapperView>
    )
  }
}

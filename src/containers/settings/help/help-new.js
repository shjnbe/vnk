import React from 'react'
import {  } from 'native-base'
import styled from 'styled-components/native'
import { P, P1, ArImage, ArH } from './component-help'

const WrapperView = styled.View`paddingLeft: 16 paddingRight: 16 paddingTop: 8 paddingBottom: 8`
const ContentNote = styled.View`
  flexDirection: row
  flexWrap: wrap
`
// function createObj(title, type, { bold = false }) {
//   return {
//     title,
//     type,
//     bold
//   }
// }

const contents = [
  // createObj(``, 'p'),
  // createObj(``, 'p'),

]

export default class HelpContainer extends React.Component {
  render () {
    return (
      <WrapperView>
        <ArH>1. Trang chủ</ArH>
        <P>Giúp bạn nhanh chóng biết được các dự án nào bạn đang theo dõi, các công ty nào bạn đang theo dõi. Bằng việc này bạn không cần mất nhiều thời gian để lục lọi tìm lại thông tin mình đã lưu trữ nằm ở đâu.</P>
        <P>Bạn có thể thêm mới dự án và thêm mới công ty ngay tại trang chủ, việc này giúp bạn vô cùng thuận tiện khi muốn cập nhật một dự án mới hay công ty mới.</P>
        <P>Lưu ý: Bạn cần đặt một tên viết tắt cho dự án và công ty vì tên này sẽ được hiển thị cho bạn dễ nhìn thấy ở phần mô tả.</P>
        <P>Nếu phần dự án bạn quản lý quá nhiều và không thể lật dở hết được thì bạn có thể sử dụng chức năng tìm kiếm theo tên hoặc công ty ở thanh tìm kiếm.</P>
        <ArImage source={require('./imgs/pic-01.png')} height={300}/>
        <P>Phần góc trên bên phải có nút Task (nút nhiệm vụ).</P>
        <P>Bằng việc sử dụng nút này bạn có thể lên lịch làm việc hàng ngày hoặc hàng tuần cho mình. Thật là tuyệt với nếu mỗi ngày đến công ty bạn đã biết những việc bạn sẽ cần phải hoàn thành ngày hôm nay, và chỉ cần nỗ lực hoàn thành nó là bạn sẽ có được kết quả tốt!</P>
        <ArH>2. Trang Công ty</ArH>
        <P>Tại mục này các bạn có thể nhanh chóng tìm kiếm những công ty mình đã lưu hoặc lưu thêm những công ty mà bạn mới tiếp cận.</P>
        <ArImage source={require('./imgs/pic-02.png')} height={300}/>
        <P>Khi một công ty mới bạn có thể bổ sung thêm các trường thông tin như minh họa dưới đây:</P>
        <ArImage source={require('./imgs/pic-03.png')} height={300}/>
        <ArH>3. Trang dự án</ArH>
        <P>Tại trang này bạn có thể tìm thấy các thông tin dự án mới cập nhật (với gói standard trở lên) và bạn có thể chọn lựa xem dự án nào hợp với khẩu vị của bạn để nhấn vào nút họn theo dõi.</P>
        <ArImage source={require('./imgs/pic-04.png')} height={300}/>
        <P>Ngay khi dự án được tích chọn theo dõi, thông tin dự án sẽ được chuyển sang “Sale Pipe Line”, một chu trình bán hàng được tính toán sẵn cho bạn (và bạn có thể tối ưu nó tùy thuộc vào sản phẩm và dịch vụ mà bạn đang cung cấp).</P>
        <ArImage source={require('./imgs/pic-05.png')} height={300}/>
        <P>Tại tiến trình này mỗi dự án sẽ lần lượt được đi qua 7 bước trước khi đến bước chốt hợp đồng “Close”.</P>
        <P>Mỗi dự án đang ở trạng thái nào và bước tiếp theo cần phải làm gì sẽ là những chỉ dẫn vô cùng quan trọng giúp bạn không tốn nhiều công sức, thời gian và tiền bạc để xử lý nó nữa.</P>
        <P>Đặc biệt khi bạn quản lý nhiều dự án thì mỗi dự án khi đến hạn, nếu bạn không hoàn thành nó sẽ nhắc nhở bạn kịp thời.</P>
        <P>Phần lớn những người bán hàng dự án thường hay trì hoãn hành động, hoặc hành động không đúng các tiến trình, dẫn đến là kết quả thường rất thấp và tốn nhiều thời gian. Nhờ phần mềm này việc trì hoãn sẽ không còn và tiến trình của dự án sẽ được kiểm soát tốt.</P>
        <ArImage source={require('./imgs/pic-06.png')} height={300}/>
        <P>Thông tin và trình trạng của dự án được kiểm soát tốt, kịp thời đấy là mấu chốt thành công của những người bán hàng dự án.</P>
        <P>Nếu một dự án sau thời gian tìm hiểu thấy không phù hợp bạn có thể tích vào nút theo dõi để bỏ theo dõi dự án.</P>
        <P>Nếu bạn sử dụng gói Enterprice thì bạn có thể “Giao việc” cho các thành viên trong nhóm bán hàng của mình chỉ bằng một cú click chuột.</P>
        <P>Phần “Ghi Chú” là phần bạn ghi lại tất cả những thỏa thuận hoặc bước tiến mà bạn đã làm việc và đàm phán thành công với khách hàng để khi gặp lại khách hàng, bạn biết được mình đã đạt được những bước tiến hay thỏa thuận gì từ lần gặp mặt trước.</P>
        <ArH>4.	Trang thông báo</ArH>
        <P>a.	Thông báo hệ thống</P>
        <P>Tại trang này sẽ có các thông báo từ hệ thống cho các thông tin dự án mới được cập nhật (áp dụng từ gói Standard trở lên).</P>
        <P>b.	Dự án đang theo dõi</P>
        <P>Là những thông báo nhắc nhở bạn khi bạn trễ tiến độ thực hiện các dự án trong danh sách theo dõi. Bằng việc này bạn sẽ không bị bỏ xót việc mà mình đã lập kế hoạch triển khai.</P>
        <ArImage source={require('./imgs/pic-07.png')} height={300}/>
        <P>c.	Thông tin nội bộ nhóm (gói Enterprice)</P>
        <P>Khi bạn nhận được giao việc hoặc thông tin của các thành viên trong nhóm bán hàng, đấy là khi phần mềm sẽ thông báo với bạn. Việc này khiến thông tin luôn được thông suốt, không bị thất lạc hoặc phá loãng (nếu bạn sử dụng Messenger, Zalo, Email v..v.. bạn sẽ bị những thông tin quảng cáo, spam hoặc tin cá nhân gây mất tập trung).</P>
        <P>d.	Thông tin khác</P>
        <P>Những mẹo bán hàng, hữu ích hay những ưu đãi cho bạn cũng sẽ được thông báo tại đây</P>
        <ArH>5.	Cài đặt</ArH>
        <P>Đây là phần quan trọng, giúp bạn tùy chỉnh phần mềm phù hợp với các sản phẩm mà bạn đang bán.</P>
        <ArImage source={require('./imgs/pic-08.png')} height={300}/>
        <P>a.	Trợ giúp</P>
        <P>Cung cấp cho bạn thông tin về phần mềm, các tính năng, những lưu ý để tăng tính hiệu quả cho người bán hàng, quyền lợi các gói dịch vụ và thông tin liên hệ.</P>
        <P>b.	Thông tin cá nhân</P>
        <P>•	Giá trị dự án và số lượng dự án đang theo dõi.</P>
        {/* <ContentNote> */}
          <P>Trong mục thông tin cá nhân khi bạn nhấn vào biểu tượng</P>
          <ArImage source={require('./imgs/pic-chart.png')} height={40}/>
          <P>biểu đồ ở góc trên bên tay phải bạn sẽ nhận được bảng báo cáo về giá trị và số lượng các dự án bạn đang theo dõi ở từng giai đoạn của Sale Pipe Line.</P>
        {/* </ContentNote> */}
        <P>Bằng dữ liệu này bạn hoàn toàn dự đoàn được doanh số của cá nhân hoặc đội nhóm trong thời gian tương lai.</P>
        <ArImage source={require('./imgs/pic-statictict-01.png')} height={300} />
        <ArImage source={require('./imgs/pic-statictict-02.png')} height={200} />
        <P>Là thông tin của người sử dụng phần mềm, nó giúp người dùng khai báo với phần chăm sóc khách hàng của phần mềm, là cơ sở để cung cấp và xử lý các hỗ trợ từ khách hàng. Phần này cũng cung cấp cho người dùng theo gói Enterprice thông tin trao đổi nội bộ trong nhóm của mình. Các thông tin cần phải được khai báo chính xác để đảm bảo quyền lợi khi sử dụng dịch vụ.</P>
        <P>c.	Thời gian giữa các trạng thái.</P>
        <P>Phần mềm sẽ chuyển các dự án theo dõi vào “Sale Pipe Line” là một chu trình kiểm soát trạng thái bán hàng ưu việt đã được thiết lập sẵn. Tuy nhiên người dùng có thể tùy chỉnh thời gian giữa các trạng thái nhằm phù hợp nhất với sản phẩm, dịch vụ mà mình đang cung cấp.</P>
        <ArImage source={require('./imgs/pic-09.png')} height={300}/>
        <P>Tính năng này vừa tạo ra quy trình chung trong bán hàng dự án nhưng lại rất linh hoạt cho phép tùy chỉnh để phù hợp tốt nhất với đặc thù sản phẩm, dịch vụ mà bạn đang cung cấp.</P>
        <P>d.	Thiết lập KPI</P>
        <P>Điểm quan trọng trong quản lý là phải có mục tiêu để cá nhân và tổ chức phấn đấu, mục tiêu càng rõ ràng, càng thực tế thì càng có tính thuyết phục và hiệu quả cao. Bằng với việc tạo ra KPI trực tiếp đến từng ngày, người kinh doanh có thể biết ngày hôm đó mình đã tạo ra bao nhiêu giá trị và được hưởng bao nhiêu tiền. Hết sức dễ dàng và sinh động nhưng lại tạo ra một động lực vô cùng to lớn cho bạn cũng như nhân viên kinh doanh của bạn.</P>
        <ArImage source={require('./imgs/pic-10.png')} height={300}/>
        <P>e.	Tự đánh giá KPI</P>
        <P>Đó là lúc cuối ngày người nhân viên hoặc chính bạn sẽ là người cho điểm đánh giá kết quả công việc của bạn để nhìn thấy phần thưởng cho công sức của mình cuối ngày.</P>
        <P>Nó sẽ tạo phấn kích cho người hăng say lao động và là lời nhắc nhở đến những người chưa làm việc hiệu quả của ngày hôm đó.</P>
        <P>Các bạn hãy nhớ điều này: “Chúng ta không thể quản lý được cái chúng ta không thể đo lường”. Bằng việc đo lường hàng ngày kết quản làm việc của mình và đội nhóm chúng ta có thể quản lý hiệu quả về dễ dàng nhất mục tiêu mình đã đặt ra.</P>
        <ArImage source={require('./imgs/pic-11.png')} height={300}/>
        <P>f.	KPI ngày </P>
        <P>Là bảng nghi nhận lại các trái trị mà bạn đã tự chấm điểm cho mình trong từng ngày, rồi từ đó tổng hợp lên được kết quả hoạt động của bạn trong 1 tháng. Hệ thộng sẽ tự động tính toán ra số lương mà bạn sẽ nhận được của tháng đó. Thật hế sức hiệu quả trong việc theo dõi, đánh giá và trả lương cho các nhân viên kinh doanh dự án. Bạn sẽ chi tiêu hiệu quả cho từng đồng lương bạn chi ra.</P>
        <ArImage source={require('./imgs/pic-12.png')} height={300}/>
        <P>g.	Gói dịch vụ.</P>
        <P>Là nơi bạn biết mình đang sử dụng gói dịch vụ nào. Có 3 gói dịch vụ của sản phẩm là: Basic, Strandard và Enterprice. Quyền lợi chi tiết của từng gói bạn có thể xem trong phần IV – Các quyền lợi của gói dịch vụ.</P>
      </WrapperView>
    )
  }
}
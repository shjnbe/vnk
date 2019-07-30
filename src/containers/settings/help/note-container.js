import React from 'react'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import { Card, H3 } from 'native-base';
import { P, P1, P1B , ArImage, ArH } from './component-help'

const WrapperView = styled.View`paddingLeft: 16 paddingRight: 16 paddingTop: 8 paddingBottom: 8`

export default class HelpContainer extends React.PureComponent {
  render () {
    return (
      <WrapperView>
        <ArH>1.	Nguồn gốc của sự giàu có là gì?</ArH>
        <P>Bạn cần phải biết những quy luật cơ bản của tự nhiên và luật kinh tế để bắt đầu việc kinh doanh, bán hàng. Nguồn gốc của của cải và giàu có là khi bạn biết gia tăng giá trị (vì thế chúng ta có thuế giá trị gia tăng VAT). Bạn sẽ nhận được trả công xứng đáng khi đem đến giá trị thực sự cho khách hàng. Nếu sản phẩm và dịch vụ của bạn giá trị hơn số tiền mà khách hàng bỏ ra, đấy là lúc sản phẩm và dịch vụ đấy sẽ phát triển lâu bền. Bời kiểu bán hàng chộp giật và ngắn hạn sẽ chỉ được một lần và bạn sẽ phải trả giá cho kiểu làm ăn ngắn hạn đó.</P>
        <P>Hãy gia tăng giá trị và cung cấp giá trị đó nhiều nhất tới khách hàng của bạn.</P>
        <ArH>2.	Bán hàng là bán Niềm Tin.</ArH>
        <P>Khách hàng mua hàng từ bạn vì họ tin những điều bạn nói, những thứ bạn làm vì lợi ích và mong muốn của họ. Vì thế nếu bạn không Trung thực, không Giữ lời hứa thì chắc chắn đấy không phải bán hàng, đấy là sự lừa đảo, chuộc lợi.</P>
        <P>Hãy trung thực và giữ lời hứa với khách hàng của bạn.</P>
        <ArH>3.	Ai thấu hiểu con người, người đấy sẽ bán hàng giỏi.</ArH>
        <P>Khách hàng dù là doanh nghiệp đi nữa thì người ra quyết định sẽ vẫn là con người. Do đó nếu bạn không hiểu nhóm tính cách của họ (tham khảo mã BANK, DISC, COLOR CODE, MBTI v..v..) thì bạn sẽ không thể thu hút được sự quan tâm chú ý của họ.</P>
        <P>Ngoài thấu hiểu nhóm tính cách khách hàng thì cần tìm hiểu thêm động lực mua hàng, thời điểm mua hàng, nếu bạn biết điều này và đáp ứng được nhu cầu của họ, chắc chắn bạn sẽ là người chiến thắng.</P>
        <ArH>4.	Hãy là chuyên gia trong ngành của bạn.</ArH>
        <P>Bạn sẽ chỉ có được lòng tin bởi khi và chỉ khi bạn là một chuyên gia. Hãy dành nhiều thời gian hơn nữa để tìm hiểu về ngành kinh doanh bạn đang làm, về các đối thủ đang tham gia và về lợi thế mà bạn đang có. Hãy thu thập càng nhiều bằng chứng càng tốt và giúp cho khách hàng thấy được bạn là một chuyên gia hiểu biết về sản phẩm và dịch vụ bạn đang bán. Chỉ đến khi ấy những điều bạn nói mới có thể lọt vào tai của khách hàng.</P>
        <ArH>5.	Bán hàng cần năng lượng</ArH>
        <P>Đây là điều mà ông vua bán hàng Blair Singer đã dạy tôi từ những năm 2011. Nếu bạn không có năng lượng, hay năng lượng quá yếu bạn sẽ không thể bán được hàng. </P>
        <P>Vậy cần phải gia tăng năng lượng bằng cách nào?</P>
        <P1>-	Tập thể dục hàng ngày là cách tạo ra năng lượng rất hiệu quả. Bạn sẽ thấy khi cơ thể khỏe mạnh, bạn có thể khiến tâm trí sảng khoái và có thể đạt được những thành tựu bất ngờ.</P1>
        <P1>-	Xây dựng niềm tin chiến thắng từ trong tâm. Bạn cần phải tin vào lợi ích mà bạn màng lại cho khách hàng, tin vào sản phẩm, tin vào bản thân mình sẽ làm được. Sử dụng phương pháp VASK để lập trình lại ngôn ngữ tư duy NLP trong bạn, nó sẽ khiến bạn bồi đắp thêm năng lượng khi đối mặt với khách hàng.</P1>
        <P1>-	Vận động sẽ thay đổi trạng thái tâm lý. Ngay trước khi bước vào cửa phòng làm việc của khách hàng, nếu bạn cảm thấy thiếu tự tin và bình tĩnh, hãy kiếm một chỗ (toilet chẳng hạn) để vận động mạnh như nhảy lên, hoặc đấm tay vào không khí và kêu lên để gia tăng thêm năng lượng tinh thần cho mình.</P1>
        <ArH>6.	Bán hàng là kỹ năng chứ không phải kiến thức.</ArH>
        <P>Bạn có đọc 100 cuốn sách về bán hàng cũng không thể bán được hàng nếu bạn không bắt đầu bán hàng. Nó giống hệt phòng tập thể hình, bạn chỉ có thể có cơ bụng 6 múi khi bạn tập luyện chứ chỉ nghe huấn luyện viên và xem thầy tập thì bạn không bao giờ có được cái bụng 6 múi cả.</P>
        <P>Kỹ năng thì được đo lường bằng số giờ thực hành. Nhiều bạn trẻ bán hàng rất tốt không phải do họ may mắn đâu mà họ đã thực hành kỹ năng thuyết phục, kỹ năng giao tiếp, kỹ năng thuyết trình, kỹ năng làm chủ cảm xúc, kỹ năng xử lý từ chối, kỹ năng chốt sale từ rất lâu trong các công việc và hoạt động trước đây của họ rồi.</P>
        <P>Nếu bạn là người mới vào nghề thì không có lý do gì mà bạn không rèn luyện các kỹ năng trên. Hãy mài sắc lưỡi rìu của bạn để mỗi ngày vào rừng là một ngày bạn sẽ có củi mang về.</P>
        <ArH>7.	Bán hàng bằng 4T</ArH>
        <P>4T ở đây là gì? Đó là sự Tinh Tế và Trí Tuệ. </P>
        <P1B>-	2 chữ T đầu Tinh Tế</P1B>
        <P>Nếu bạn đánh mất đi sự tinh tế, bạn sẽ không nhận biết được Insight của khách hàng (cái nhu cầu ần của họ). Đôi khi khách hàng tung ra những thông tin đánh lạc hướng bạn hoặc chính họ không nhận thức được họ cần gì. Chỉ khi ban phát hiện ra được điều họ cần đấy là lúc bạn chiến thắng. Có một ví dụ rất dễ hiểu cho bạn như sau:</P>
        <P>VD1: Anh chàng bán bất động sản đã dẫn khách hàng đi thăm mấy căn nhà rồi mà vẫn chưa chốt được sale. Sau khi phân tích lại, anh thấy khách hàng thường hỏi câu đầu tiên là “căn hộ đấy có ban công không?”. Anh hỏi lại cô là có phải cô rất thích một căn nhà có ban công đẹp đúng không ạ? Người khách hàng thừa nhận và khen ngợi và nói: “Có rất nhiều người môi giới bất động sản làm việc với cô, nhưng cháu là người đầu tiên hỏi cô câu này. Chứng tỏ cháu rất quan tâm và hiểu tâm lý của cô”. Và thế là cậu ấy đã chốt được sale ngay khi dẫn khách hàng đến một căn hộ có ban công tuyệt nhất trong dữ liệu của anh ấy.</P>
        <P>Bạn thấy đấy nếu không tinh tế, không lắng nghe, bạn sẽ không thể nắm bắt được nhu cầu ẩn dấu của khách hàng và vì thế không thể làm họ hài lòng được. Hãy biết lắng nghe và đặt câu hỏi để có thể thấu hiểu họ hơn nữa. Và Tinh Tế là 2 chữ T đầu tiên tôi giới thiệu đến bạn.</P>
        <P1B>-	2 chữ T kế tiếp là Trí Tuệ.</P1B>
        <P>Chỉ có trí tuệ mới giúp bạn thoát khỏi cái bẫy chết người của cuộc cạnh tranh trên thương trường ngày hôm nay.</P>
        <P>Khi mà các đối thủ tìm mọi cách giảm giá, down giá, tặng thêm quà tặng thì bạn sẽ phải làm gì? Nếu bạn biết tiếp tục giảm giá là bạn đang hút máu của mình ra để tham gia cuộc chơi, để đến một ngày bạn sẽ gục ngã vì máu đã cạn khô.</P>
        <P>Một yêu cầu mà Blair đã yêu cầu học trò của ông là làm thế nào để bán sản phẩm với giá cao hơn nữa. Và kỷ lục là một cuốn sách của ông với giá 60.000đ đã được bán với giá tận 6.000.000đ. Bạn có biết làm sao một cuốn sách chỉ có giá bèo như thế lại có thể bán với giá gấp 100 lần số tiền họ in ở sau cuốn sách?</P>
        <P>Vâng đó là nhờ Trí Tuệ thưa các bạn.</P>
        <P>Nếu các bạn đọc lại nguyên tắc 1 ở phần này về nguồn gốc của của cải đó là khi bạn gia tăng thêm giá tri.</P>
        <P>Nếu cuốn sách giá bìa 60.000đ mà bạn bán với giá 6.000.000đ và không gia tăng thêm giá trị gì cho nó, đó là sự lừa đảo thưa các bạn.</P>
        <P>Nhưng nếu bạn biết gia tăng thêm giá trị cho nó, bạn có thể bán giá cao hơn giá niêm yết rất nhiều.</P>
        <P>Tôi đưa ra vài ví dụ để bạn có thể hiểu cách gia tăng giá trị cho cuốn sách, và hy vọng bạn có thể áp dụng cho sản phẩm và dịch vụ của bạn:</P>
        <P1>a.	Hãy biến cuốn sách trở thành một món quà. Bạn có thể bao gói nó lại thật đẹp và bán với nội dung là một món quá ý nghĩa cho ngày doanh nhân 13/10 – cuốn sách của ông vua bán hàng Blair Singer. Sách sẽ được bao gói đẹp gửi tới tận nhà các khách hàng của quý vị và miễn phí vận chuyển với giá chỉ 199K.</P1>
        <P1>b.	Hãy tạo ra sự khan hiếm và độc đáo. Bạn có thể xin chữ ký của Blair Singer và vì số lượng sách có chữ ký thật rất ít nên giá trị của cuốn sách này có thể bán với giá lên đến 499K hoặc nhiêu hơn.</P1>
        <P1>c.	Hãy bổ sung thêm giá trị hậu mãi kèm cuốn sách. Hãy mua cuốn sách “Nghệ thuật bán hàng này” của Blair và nhận thêm sự hỗ trợ của tôi trong vòng 3 tháng qua Email về các chiến lược và nội dung kinh điển tôi đã học trong khóa học trực tiếp với thầy với khoản học phí lên đến 16tr nay bạn chỉ phải trả 6tr để có nó. Quả thật là một món hời phải không nào?</P1>
        <P>Bạn thấy đấy, bán hàng không phải chỉ gào vào mặt khách hàng là sale sập sàn, xả kho không lợi nhuận, tháng bán hàng xxx. Nó đòi hỏi chúng ta có 4T và chúc mừng bạn, giờ bạn đã biết 4T là gì rồi!</P>
        <ArH>8.	Vui quá họ đã nói lời từ chối đến lần thứ 7.</ArH>
        <P>Vâng thưa bạn, bán hàng sẽ gặp phải lời từ chối là chắc chắn. Và một thông tin rất hữu ích cho bạn là thông thường tỷ lệ chốt sale ở lần từ chối thứ 3 chỉ 20% (trên tổng số đơn hàng mà bạn bán được) và tỷ lệ chốt sale ở lần từ chối thứ 4 đến lần thứ 8 sẽ chiếm 80% còn lại.</P>
        <P>Điều đó nói lên cái gì. Nó chỉ ra cho ta thấy rằng nếu bạn bỏ cuộc ở lần từ chối thứ 2 hay thứ 3 của khách hàng thì doanh số của bạn chỉ bằng ¼ doanh số của người bán hàng giỏi nhất trong công ty bạn mà thôi. Vậy cần lắm sự lạc quan và kiên trì với một người bán hàng thành công. Đừng bao giờ từ bỏ khách hàng tiềm năng cho đến khi nào họ trở thành khách hàng của chúng ta! </P>
        <P>Vì thế hôm nay nếu bạn gặp khách hàng lần thứ 7 và vẫn bị họ từ chối thì xin chúc mừng bạn, bạn sắp chốt được đơn hàng này vào lần thứ 8 sắp tới!</P>
        <ArH>9.	Vấn đề của khách hàng là cơ hội của chúng ta.</ArH>
        <P>Để tìm kiếm một khách hàng mới khó đến 5 lần so với phục vụ lại một khách hàng cũ. Vì thế nếu khách hàng của bạn đang gặp một vấn đề và họ cần đến sự hỗ trợ của chúng ta thì hãy nhanh chóng giúp đỡ họ. Rất nhiều người bán hàng dự án không quay lại tiếp xúc với khách hàng vì họ sợ bị khách hàng than phiền về chất lượng sản phẩm hay dịch vụ. Nếu bạn tuân thủ theo nguyên tắc số 1 là cung cấp các sản phẩm dịch vụ có giá trị thì đừng bao giờ ngại quay lại với khách hàng.</P>
        <P>Hãy gọi điện, ghé thăm khách hàng cũ của bạn. Hãy lắng nghe các vấn đề của họ, nếu họ hài lòng với sản phẩm và dịch vụ của chúng ta, đấy là lúc chúng ta có thể đề nghị họ giới thiệu thêm khách hàng cho chúng ta. Nếu họ không hài lòng hãy tìm hiểu vấn đề của họ là gì, đấy chính là cơ hội để chúng ta cải tiến sản phẩm, dịch vụ của mình nhằm ưu việt hơn các đối thủ trong cùng ngành. Và biết đâu đấy chúng ta có thể tung ra thêm các sản phẩm và dịch vụ mới từ những phàn nàn này của khách hàng.</P>
        <P>Vậy đừng bao giờ sợ phải nghe phàn nàn của khách hàng vì đó là cơ hội của bạn vươn lên!</P>
        <ArH>10.	Ứng dụng công nghệ để lưu trữ và giảm thiểu sức người.</ArH>
        <P>Hãy tập trung vào cái khó nhất còn các cái khác bạn hãy tự động hóa nó để không còn phải tốn nhiều thời gian công sức. Cách làm truyền thống trong việc bán hàng dự án là bạn phải tự đi tìm kiếm thông tin, xây dựng quan hệ, chăm sóc quan hệ và chờ đợi cơ hội. Chính điều này đã khiến mỗi người luôn bị giới hạn về mặt thời gian, sức lực và không thể nào bùng nổ được doanh số. Vậy người thông mình là chọn ra cái quan trọng nhất để làm còn các công việc khách hãy ủy quyền cho người khác làm. Chỉ đến khi đó bạn mới có thể bùng nổ doanh số. </P>
        <P>Nhóm bán hàng thế hệ mới sẽ chia thành tối thiểu 3 bộ phận. Bộ phận tìm kiếm thông tin (tìm kiếm những cơ hội bán hàng phù hợp với mục tiêu đề ra), bộ phận xử lý đơn hàng và chốt sale (báo giá, thương thảo hợp đồng và chốt), bộ phận chăm sóc khách hàng (duy trì quan hệ khách hàng và gia tăng cơ hội bán hàng lại cho khách hàng cũ).</P>
        <P>Có 2 thứ cần phải ứng dụng công nghệ ở đây giúp tiết kiệm thời gian và dễ dàng cho việc quản lý dữ liệu.</P>
        <P1>a.	Việc tìm kiếm sàng lọc thông tin. Đây là nhiệm vụ tốn nhiều thời gian, làm mất đi cơ hội bán hàng của bạn.</P1>
        <P1>b.	Việc lưu trữ tập trung thông tin khách hàng. Đây là tài sản của công ty, nếu bạn để nó lưu trữ tản mát đến một ngày bạn bị thất lạc, công ty bạn sẽ hoạt động ra sao.</P1>
        <P>Phần mềm My Project đã tạo ra một sức mạnh lớn trong việc kết hợp 2 công việc trên đây đồng thời quy trình hóa cả công việc của bộ phận xử lý đơn hàng khiến cho việc bán hàng trở nên vô cùng hiệu quả và tiết kiệm thời gian công sức của các bạn rất nhiều.</P>
        <P>Tôi ước gì mình tạo ra phần mềm này từ 10 năm trước đây để không còn phải căng thẳng, vất vả cho việc bán hàng ngày hôm nay.</P>
        <P>Các bạn hãy tận dụng nó hôm nay để thành công và thịnh vượng hơn sẽ đến với bạn ngày mai!</P>
      </WrapperView>
    )
  }
}

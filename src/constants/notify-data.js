import moment from 'moment'
const notify = {
  title: 'Hệ thống',
  desc: `Xin chào mừng bạn đến với phần mềm My Project. Đây là một phần mềm vô cùng tuyệt vời sẽ giúp bạn có bước nhảy vọt trong doanh số và thu nhập. Hãy vào phần trợ giúp ở mục cài đặt để xem hướng dẫn chi tiết bạn nhé.`,
  time: 'Cách 2 phút',
  type: 0,
  color: '#3b9ff9',
  descColor: '#d0021b'
}

export const notifyWelcome = {
  from: 0,
  body: notify.desc,
  title: notify.title,
  color: '#00ACD4',
  id: 'system_welcome'
}

  export default notify
export const  FIELD_TYPE = {
  DATE: 'DATE',
  PICK: 'PICK',
  CITY: 'CITY',
  AREA: 'AREA'
}

export default {
  last_modified: { title: 'Cập nhật mới', isDate: true, fieldType: FIELD_TYPE.DATE },
  owner: {
    title: 'Chủ sở hữu',
    isRequie: true
  },
  nha_thau_chinh: {
    title: 'Nhà thầu chính',
    fieldType: FIELD_TYPE.AREA
  },
  nha_thau_phu: {
    title: 'Nhà thầu phụ',
    fieldType: FIELD_TYPE.AREA
  },
  code: { title: 'Số hiệu dự án', isRequie: true },
  cost: { title: 'Giá trị' },
  floor_count: {
    title: 'Số sàn'
  },
  floor_area: {
    title: 'Diện tích'
  },
  status: { title: 'Chi tiết trạng thái', isPick: true, fieldType: FIELD_TYPE.PICK},
  start: { title: 'Khởi công', isDate: true, fieldType: FIELD_TYPE.DATE },
  finish: { title: 'Hoàn công', isDate: true, fieldType: FIELD_TYPE.DATE },
  country: { title: 'Quốc gia' },
  city: { title: 'Tỉnh thành', isCity: true, fieldType: FIELD_TYPE.CITY },
  district: { title: 'Quận huyện' },
  address: { title: 'Địa chỉ' },
  version: { title: 'Phiên bản' },
  version_description: { title: 'Mô tả phiên bản', fieldType: FIELD_TYPE.AREA },
  note: { title: 'Ghi chú', fieldType: FIELD_TYPE.AREA }
}

import { values } from 'lodash'

export const POSITION = {
  SALE_MANAGER: 'SALE_MANAGER',
  SALE_ADMIN: 'SALE_ADMIN',
  SALE_SUPPORT: 'SALE_SUPPORT',
  SALE_MAN: 'SALE_MAN'
}

export const SALES = {
  [POSITION.SALE_MANAGER]: {
    key: POSITION.SALE_MANAGER,
    name: 'Sale Manager',
  },
  [POSITION.SALE_ADMIN]: {
    key: POSITION.SALE_ADMIN,
    name: 'Sale Admin',
  },
  [POSITION.SALE_SUPPORT]: {
    key: POSITION.SALE_SUPPORT,
    name: 'Sale Support',
  },
  [POSITION.SALE_MAN]: {
    key: POSITION.SALE_MAN,
    name: 'Sale Man',
  }
}

export default values(SALES)
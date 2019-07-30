import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export function connectAutoDispatch (
  mapStateToProps = () => ({}),
  actions = {},
  ...args
) {
  return connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch),
    ...args
  )
}

export default connectAutoDispatch

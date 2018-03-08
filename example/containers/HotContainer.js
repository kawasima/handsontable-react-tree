import { connect } from 'react-redux'
import { toggleNode } from '../actions'
import Hot from '../components/Hot'

const mapStateToProps = state => {
  return {
    nodes: state.tree.nodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNodeClick: id => {
      dispatch(toggleNode(id))
    }
  }
}

const HotContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hot)

export default HotContainer

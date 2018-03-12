import { connect } from 'react-redux'
import { toggleNode, moveNodes } from '../actions'
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
    },
    onMoveNodes: (sources, targetBranch, insertPosition) => {
      dispatch(moveNodes(sources, targetBranch, insertPosition))
    }
  }
}

const HotContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hot)

export default HotContainer

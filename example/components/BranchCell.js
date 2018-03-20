import React from 'react'
import PropTypes from 'prop-types'


class BranchCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { node, onNodeClick } = this.props;
    const openClosed = () => {
      if (typeof node.opened === 'undefined') {
        return null
      }
      return node.opened ?
        <i className="fa fa-caret-down"></i>
        :
        <i className="fa fa-caret-right"></i>
    }

    return (
      <a style={{ cursor: 'pointer'}}
         onClick={() => {
           if (node.type == 'branch') onNodeClick(node.id)
          }
        }
        onDoubleClick={() => console.log('double click')}>
        {'　'.repeat(node.level)}
        {openClosed()}
        {node.name}
      </a>
    )
  }
}

BranchCell.propTypes = {
  node: PropTypes.object.isRequired,
  onNodeClick: PropTypes.func.isRequired
};

export default BranchCell

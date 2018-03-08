import React from 'react'
import PropTypes from 'prop-types'

class BranchCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onNodeClick } = this.props;
    return (
      <a onClick={() => onNodeClick(value) }
        onDoubleClick={() => console.log('double click')}>{value}</a>
    )
  }
}

BranchCell.propTypes = {
  value: PropTypes.number.isRequired,
  onNodeClick: PropTypes.func.isRequired
};

export default BranchCell

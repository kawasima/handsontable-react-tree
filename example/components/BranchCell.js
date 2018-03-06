import React from 'react'
import PropTypes from 'prop-types'

class BranchCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onCellClick } = this.props;
    return (
      <a onClick={() => console.log('click')}
        onDoubleClick={() => console.log('double click')}>{value}</a>
    )
  }
}

BranchCell.propTypes = {
  value: PropTypes.string.isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default BranchCell

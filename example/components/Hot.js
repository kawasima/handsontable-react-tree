import React from 'react'
import HotTable from 'react-handsontable'
import PropTypes from 'prop-types'
import BranchCell from './BranchCell'


const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

class Hot extends React.Component {
  constructor(props) {
    super(props);
  }

  treeRenderer(instance, td, row, col, prop, value) {
    const { onNodeClick } = this.props
    ReactDOM.render(<BranchCell value={value} onNodeClick={onNodeClick}/>, td);
    return td;
  }

  extract(nodes, level) {
    return nodes.map(node => {
      const m = Object.assign({level: level}, node);
      if (m.type === 'branch') {
        if(m.opened) {
          return [m, this.extract(m.children, level + 1)]
        } else {
          return m;
        }
      } else {
        return m;
      }
    });
  }

  render() {
    const { nodes } = this.props;
    return (
      <div id="example">
        <HotTable root="hot"
                  settings={{
                    data: flatten(this.extract(nodes)),
                    manualRowMove: true,
                    columns: [
                      {
                        data: 'id',
                        readOnly: true,
                        renderer: (instance, td, row, col, prop, value) => this.treeRenderer(instance, td, row, col, prop, value)
                      },
                      {
                        data: 'name',
                        renderer: 'text'
                      }
                    ]
          }}
          colHeaders={true}
          rowHeaders={true}
          onModifyRow={this.modifyRow}/>
      </div>);
  }
}

Hot.propTypes = {
  nodes: PropTypes.array.isRequired,
  onNodeClick: PropTypes.func.isRequired
}

export default Hot

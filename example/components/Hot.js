import React from 'react'
import HotTable from 'react-handsontable'
import PropTypes from 'prop-types'
import BranchCell from './BranchCell'


const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

const findParentNode = (nodes, id) => {
  let ret
  for (let [i, n] of nodes.entries()) {
    if (n.children) {
      const idx = n.children.findIndex(el => el.id === id)
      ret = (idx >=0) ? [n, idx + 1] : findParentNode(n.children, id)
      if (ret) break
    }
  }
  return ret
}

class Hot extends React.Component {
  constructor(props) {
    super(props);
  }

  treeRenderer(instance, td, row, col, prop, value) {
    const { onNodeClick } = this.props
    const node = instance.getSourceDataAtRow(row)
    ReactDOM.render(<BranchCell node={node} onNodeClick={onNodeClick}/>, td);
    return td;
  }

  extract(nodes, level) {
    return nodes.map(node => {
      const m = Object.assign({}, node, {level: level})
      if (m.type === 'branch') {
        if(m.opened) {
          return [m, this.extract(m.children, level + 1)]
        } else {
          return m
        }
      } else {
        return m
      }
    });
  }

  render() {
    const { nodes, onMoveNodes } = this.props;
    return (
      <div id="example">
        <HotTable root="hot"
                  settings={{
                    data: flatten(this.extract(nodes, 0)),
                    manualRowMove: true,
                    columns: [
                      {
                        data: 'id',
                        readOnly: true,
                        renderer: (instance, td, row, col, prop, value) => this.treeRenderer(instance, td, row, col, prop, value)
                      },
                      {
                        data: 'name',
                        readOnly: true,
                        renderer: 'text'
                      }
                    ],
                    colWidths: [150, 50],
                    beforeRowMove: function(rows, target) {
                      // Disable the default action
                      return false
                    },
                    afterRowMove: function(rows, target) {
                      if (target == 0
                          || !rows.every(r => this.getSourceDataAtRow(r).type == 'leaf')) {
                        return false
                      }
                      const targetNode = this.getSourceDataAtRow(target-1)
                      let targetBranch = targetNode
                      let insertPosition = 0
                      if (targetNode.type === 'leaf') {
                        [targetBranch, insertPosition] = (findParentNode(nodes, targetNode.id) || [null, 0])
                      }
                      onMoveNodes(rows.map(r => this.getSourceDataAtRow(r)),
                                  targetBranch.id, insertPosition)
                    }
          }}
          colHeaders={true}
          rowHeaders={true}
          onModifyRow={this.modifyRow}/>
      </div>);
  }
}

Hot.propTypes = {
  nodes: PropTypes.array.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  onMoveNodes: PropTypes.func.isRequired
}

export default Hot

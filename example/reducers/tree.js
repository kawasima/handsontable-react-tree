function walk(nodes, fn) {
  return nodes.map(n => {
    if (n.children) n.children = walk(n.children, fn)
    return fn.apply(n, [n]);
  })
}

function removeWalk(nodes, targets) {
  return nodes.filter(n => {
    if (n.children) n.children = removeWalk(n.children, targets)
    return !targets.includes(n.id)
  })
}

const tree = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_NODE':
    return { ...state,
             nodes: walk(state.nodes, node => {
               return (node.id === action.id) ? {...node, opened: !node.opened} : node
             })
           }
  case 'MOVE_NODES':
    const sourceIds = action.sources.map(s => s.id)
    const newNodes = walk(removeWalk(state.nodes, sourceIds), node => {
      if (node.id === action.targetBranch) {
        Array.prototype.splice.apply(node.children, [action.insertPosition, 0].concat(action.sources))
      }
      return node
    })
    return { ...state, nodes: newNodes }
  default:
    return state
  }
}

export default tree

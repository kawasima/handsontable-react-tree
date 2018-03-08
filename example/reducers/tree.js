function walk(nodes, fn) {
  return nodes.map(n => {
    if (n.children) n.children = walk(n.children, fn)
    return fn.apply(n, [n]);
  })
}

const tree = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_NODE':
    console.log(state)
    return Object.assign({}, state, {
      nodes: walk(state.nodes, (node) => {
        console.log(`node=${node}, action=${action}`)
        return (node.id === action.id) ? {...node, opened: !node.opened} : node}
                 )})

  default:
    return state
  }
}

export default tree

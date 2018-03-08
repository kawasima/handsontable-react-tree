const tree = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_NODE':
    console.log("TOGGLE_NODE")
    return state.map(node =>
                     (node.id === action.id) ? {...node, opened: !node.opened} : node)
  default:
    return state
  }
}

export default tree

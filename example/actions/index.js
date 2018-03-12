export const moveNodes = (sources, targetBranch, insertPosition) => {
  return {
    type: 'MOVE_NODES',
    sources: sources,
    targetBranch: targetBranch,
    insertPosition: insertPosition
  }
}

export const toggleNode = id => {
  return {
    type: 'TOGGLE_NODE',
    id
  }
}

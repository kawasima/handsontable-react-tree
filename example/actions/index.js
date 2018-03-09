export const moveNodes = (sources, target) => {
  return {
    type: 'MOVE_NODES',
    sources: sources,
    target: target
  }
}

export const toggleNode = id => {
  return {
    type: 'TOGGLE_NODE',
    id
  }
}

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import treeApp from './reducers'
import HotContainer from './containers/HotContainer'

const initialState = {
  tree: {
    nodes: [
      {id: 1, name: 'branch1', type: 'branch', opened: false, children: [
        {id: 2, name: 'leaf1', type: 'leaf'},
        {id: 3, name: 'leaf2', type: 'leaf'},
      ]
      },
      {id: 4, name: 'branch2', type: 'branch', opened: true, children: [
        {id: 5, name: 'branch3', type: 'branch', opened: false, children: [
          {id: 8, name: 'leaf3', type: 'leaf'}
        ]},
        {id: 6, name: 'leaf4', type: 'leaf'}
      ]},
      {id: 9, name: 'branch4', type: 'branch', opened: true, children: [
        {id: 11, name: 'leaf10', type: 'leaf'},
        {id: 12, name: 'leaf11', type: 'leaf'},
        {id: 13, name: 'leaf12', type: 'leaf'},
        {id: 14, name: 'leaf13', type: 'leaf'},
        {id: 15, name: 'leaf14', type: 'leaf'}
      ]}
    ]
  }
}

let store = createStore(treeApp, initialState)

ReactDOM.render(
  <Provider store={store}>
    <HotContainer />
  </Provider>,
  document.getElementById('app')
)

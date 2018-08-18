import React, { Component } from 'react'
import { Provider } from 'react-redux'
import reducers from './reducers'
import createStore from './store'

import Main from './pages/main'

const store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles/index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()


// Temp
// localStorage.accessToken = 'temp'
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()

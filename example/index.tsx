import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LazyIcon } from '../src'
import { IconType } from '../src/icons/types'

const App = () => {
  return (
    <div>
      <LazyIcon icon={IconType.RatingNotSatisfied} size={160} color="#234" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

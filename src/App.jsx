import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from './reducks/users/actions'

function App() {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  console.log(selector)
  return (
    <div className="App">
      <button onClick={() => dispatch(signInAction({ uid: '00001', username: 'trahack' }))}>Sign In</button>
    </div>
  )
}

export default App

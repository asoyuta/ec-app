import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../reducks/users/operations'

function App() {
  const dispatch = useDispatch()

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(signIn())}>ログインする</button>
    </div>
  )
}

export default App

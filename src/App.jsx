import { useState } from 'react'
import QuoteList  from './components/QuoteList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Quote App</h1>
      <QuoteList />
    </div>

  )
}

export default App
